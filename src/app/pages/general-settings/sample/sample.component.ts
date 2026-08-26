import { Component } from '@angular/core';
import { EntryPageComponent } from '../../../layout/base/entry-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-sample',
    imports: [TableModule],
    templateUrl: './sample.component.html',
    styleUrl: './sample.component.scss',
    providers: [MessageService, DialogService]
})
export class SampleComponent extends EntryPageComponent {
    customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Alice Brown', email: 'alice@example.com' },
        { id: 4, name: 'Bob Johnson', email: 'bob@example.com' }
    ];

    constructor(router: Router, activeRoute: ActivatedRoute, messageService: MessageService, dialogService: DialogService) {
        super(router, activeRoute, messageService, dialogService);
    }
}
