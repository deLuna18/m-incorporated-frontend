import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiMainEndpointService {
    private urlBase = environment.apiUrl;

    constructor(public http: HttpClient) {}

    urlAuthLogin: string = `${this.urlBase}${'auth/login'}`;

    urlProcurementTypes: string = `${this.urlBase}${'procurement-types'}`;

    urlSuppliesTypes: string = `${this.urlBase}${'supplies-types'}`;

    urlSoureOfFund: string = `${this.urlBase}${'source-of-fund'}`;

    urlProcurementMode: string = `${this.urlBase}${'procurement-mode'}`;
}
