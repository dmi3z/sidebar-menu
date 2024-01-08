import { Component, OnInit, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { StateService } from './../../services/state.service';
import { CARD_LIST_DEPS } from './card-list.dependencies';
import { SidebarItemData } from '../sidebar/interfaces/sidebar.interface';

@Component({
    selector: 'app-card-list',
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.scss',
    standalone: true,
    imports: CARD_LIST_DEPS,
})
export class CardListComponent implements OnInit {
    public cards$!: Observable<SidebarItemData[]>;

    private stateService = inject(StateService);

    ngOnInit(): void {
        this.cards$ = this.stateService.currentMenu;
    }
}
