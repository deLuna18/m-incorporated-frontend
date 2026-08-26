import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-entry-page',
    template: `<p>Entry Page Component Works</p>`,
    styles: [],
    providers: [MessageService]
})
export abstract class EntryPageComponent extends BaseComponent {
    constructor(
        protected router: Router,
        protected activeRoute: ActivatedRoute,
        protected messageService: MessageService,
        protected dialogService: DialogService
    ) {
        super();
    }

    showMessage(summary: string) {
        this.messageService.add({
            severity: 'info',
            summary: summary,
            detail: 'Current feature not yet implemented...'
        });
    }

    onSubmit() {
        this.showMessage('Submit Action');
    }

    onReset() {
        this.showMessage('Reset Action');
    }

    onClose() {
        this.showMessage('Close Action');
    }

    onCancel() {
        this.showMessage('Cancel Action');
    }

    onParseFilters(form: FormGroup) {
        let param: { [n: string]: any } = {};

        Object.keys(form.controls).forEach((key) => {
            const val = form.controls[key].value;
            if (val) {
                param[key] = val.hasOwnProperty('id') ? val['id'] : val instanceof Array ? val.map((d) => d) : val;
            } else {
                if (typeof val === 'boolean') {
                    param[key] = val;
                }
            }
        });

        return param;
    }
}
