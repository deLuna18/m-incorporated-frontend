# Deployment — M Incorporated Frontend

| Item | Value |
| --- | --- |
| Host port | `4189` (container listens on `80`) |
| Docker Hub repo | `jmgboptimalengineering/m-incorporated-frontend` |
| Container name | `m-incorporated-frontend` |
| Docker network | `general_network` (external, shared) |
| Domain | `mincorprated.jmgboptimal.com` |

## Pipeline

`.github/workflows/deploy.yml` runs on every push to `main`:

1. **ci** — `npm ci` + `npm run build` (production).
2. **docker** — builds the image and pushes `:<short-sha>` and `:main` to Docker Hub.
3. **deploy** — SSHes into the server, pulls `:main`, recreates the container, and waits
   for the Docker `HEALTHCHECK` to report `healthy` (fails the job and dumps logs otherwise).

### Required GitHub secrets

| Secret | Purpose |
| --- | --- |
| `DOCKERHUB_USERNAME` | must be `jmgboptimalengineering` |
| `DOCKERHUB_TOKEN` | Docker Hub access token |
| `SSH_HOST` | deployment server host/IP |
| `SSH_USERNAME` | deployment SSH user |
| `SSH_KEY` | private key for that user |

### Optional GitHub variables

| Variable | Default |
| --- | --- |
| `SSH_PORT` | `22` |
| `DEPLOY_ENV` | `production` |
| `MINCORPORATED_FRONTEND_DEPLOY_DIR` | `deployment-scripts/m-incorporated/m-incorporated-frontend` |

## One-time server setup

```bash
# Shared network (skip if it already exists)
docker network create general_network || true

mkdir -p ~/deployment-scripts/m-incorporated/m-incorporated-frontend
cd ~/deployment-scripts/m-incorporated/m-incorporated-frontend
# copy docker-compose.yml from this repo into that directory
docker compose up -d
```

## Reverse proxy — Nginx (alternative to Apache)

```nginx
server {
    listen 80;
    server_name mincorprated.jmgboptimal.com;

    location / {
        proxy_pass http://127.0.0.1:4189;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then issue the certificate:

```bash
sudo certbot --nginx -d mincorprated.jmgboptimal.com
```

Point an `A` record for `mincorprated.jmgboptimal.com` at the server IP before running certbot.

## Reverse proxy — Apache (mincorprated.jmgboptimal.com)

Enable the required modules once:

```bash
sudo a2enmod proxy proxy_http headers rewrite ssl
sudo systemctl restart apache2
```

Create `/etc/apache2/sites-available/mincorprated.jmgboptimal.com.conf`:

```apache
<VirtualHost *:80>
    ServerName mincorprated.jmgboptimal.com

    ProxyPreserveHost On
    ProxyRequests Off

    ProxyPass        / http://127.0.0.1:4189/
    ProxyPassReverse / http://127.0.0.1:4189/

    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-Port  "80"

    ErrorLog  ${APACHE_LOG_DIR}/mincorprated-error.log
    CustomLog ${APACHE_LOG_DIR}/mincorprated-access.log combined
</VirtualHost>
```

Enable it and issue the certificate:

```bash
sudo a2ensite mincorprated.jmgboptimal.com.conf
sudo apache2ctl configtest
sudo systemctl reload apache2

sudo certbot --apache -d mincorprated.jmgboptimal.com
```

`certbot --apache` writes the `*:443` vhost and the HTTP→HTTPS redirect itself. Point the
`A` record for `mincorprated.jmgboptimal.com` at the server IP before running it.

If you prefer to manage TLS by hand instead of letting certbot rewrite the file, the
`*:443` vhost looks like this (certificate paths as certbot creates them):

```apache
<VirtualHost *:443>
    ServerName mincorprated.jmgboptimal.com

    SSLEngine on
    SSLCertificateFile    /etc/letsencrypt/live/mincorprated.jmgboptimal.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/mincorprated.jmgboptimal.com/privkey.pem

    ProxyPreserveHost On
    ProxyRequests Off

    ProxyPass        / http://127.0.0.1:4189/
    ProxyPassReverse / http://127.0.0.1:4189/

    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port  "443"

    ErrorLog  ${APACHE_LOG_DIR}/mincorprated-error.log
    CustomLog ${APACHE_LOG_DIR}/mincorprated-access.log combined
</VirtualHost>
```

No rewrite rules are needed for Angular's client-side routing — the container's own Nginx
already resolves unknown paths to `index.html`.

## Local checks

```bash
docker build -t m-incorporated-frontend:local .
docker run --rm -p 4189:80 m-incorporated-frontend:local
# http://localhost:4189
```
