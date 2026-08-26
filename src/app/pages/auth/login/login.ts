import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../../layout/component/app.floatingconfigurator';
import { LoginApiService } from '../../../api/login/login.api.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ReactiveFormsModule, ProgressBarModule, CommonModule],
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class Login implements OnInit {
    username = new FormControl('');
    password = new FormControl('');
    checked = new FormControl(false);

    form: FormGroup = <FormGroup>{};

    logging: boolean = false;

    username1: string = localStorage.getItem('username') || '';

    @ViewChild('rememberme') chkRememberMe!: CheckboxModule;

    constructor(
        private loginApiService: LoginApiService,
        private cdr: ChangeDetectorRef,
        public router: Router
        // private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.username.setValue(this.username1);
    }

    ngAfterViewInit(): void {
        if (this.username && this.chkRememberMe) {
            this.cdr.detectChanges();
        }
    }

    onCreateForm(builder: FormBuilder) {
        this.form = builder.group({
            username: builder.control('', { validators: [Validators.required] }),
            password: builder.control('', { validators: [Validators.required] }),
            checked: builder.control(false)
        });
    }

    onBlurUsername() {
        const userControl = this.username.value;

        if (userControl) {
            localStorage.setItem('username', userControl);
        }
    }

    isRememberMe(event: any) {
        if (event.checked) {
            const userControl = this.username.value;

            if (userControl) {
                localStorage.setItem('username', userControl);
            }
        } else {
            if (this.username) {
                localStorage.removeItem('username');
            }
        }
    }

    async onLogin() {
        this.logging = true;

        const _payload = {
            username: this.username.value,
            password: this.password.value
        };

        setTimeout(() => {
            this.loginApiService.onLogin(_payload).then(
                (res) => {
                    this.router.navigate(['']);
                    this.logging = false;
                },
                (rej) => {
                    // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!' });
                    this.logging = false;
                }
            );
        }, 1000);
    }
}
