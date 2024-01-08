import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MenuType } from './menu-item.interface';
import { SidebarItemData } from '../sidebar/interfaces/sidebar.interface';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: true,
    imports: [RouterModule, CommonModule],
})
export class CardComponent {
    @Input() public applicationCard!: SidebarItemData;

    public menuTypes = MenuType;

    private stateService = inject(StateService);

    public expandMenu(): void {
        this.stateService.expandMenu(this.applicationCard.id);
    }
}
