import { Component, Input, OnInit, inject, signal } from '@angular/core';

import { WRAPPER_DEPS } from './wrapper.dependencies';
import { SidebarItemData } from '../sidebar/interfaces/sidebar.interface';
import { MenuItem, MenuType } from '../card/menu-item.interface';
import { DataService } from '../../services/data.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'wrapper',
    templateUrl: './wrapper.component.html',
    styleUrls: ['./wrapper.component.scss'],
    standalone: true,
    imports: WRAPPER_DEPS,
})
export class WrapperComponent implements OnInit {
    @Input() public parameters = {
        sidebar: true,
        cards: true,
    };

    public sidebarItems = signal<SidebarItemData[]>([]);

    private dataService = inject(DataService);
    private stateService = inject(StateService);

    ngOnInit(): void {
        this.dataService.loadMainMenu().subscribe((data) => {
            const sidebarItems = this.getSidebarData(data);
            this.sidebarItems.set(sidebarItems);
            this.stateService.saveCurrentMenuList(sidebarItems, []);
        });

        this.stateService.expandMenu$.subscribe((ids) => this.loadItemChild(ids));
    }

    public loadItemChild(itemIds: string[]): void {
        const submenuId = itemIds[itemIds.length - 1];
        this.dataService.getSubmenu(submenuId).subscribe((data) => {
            this.sidebarItems.update((items) => {
                const targetItem = this.getTargetItem(items, itemIds);
                targetItem.opened = true;
                targetItem.children = this.getSidebarData(data);
                return items;
            });

            this.stateService.saveCurrentMenuList(this.sidebarItems(), itemIds);
        });
    }

    private getSidebarData(menuItems: MenuItem[]): SidebarItemData[] {
        return menuItems.map((item) => ({
            id: item.id,
            name: item.translation,
            url: item.link,
            icon: item.icon,
            children: item.type === MenuType.MENU ? [] : undefined,
            opened: false,
            color: item.color,
        }));
    }

    private getTargetItem(items: SidebarItemData[], ids: string[]): SidebarItemData {
        const idsCopy = [...ids];
        const id = idsCopy.shift();
        const item = items.find((el) => el.id === id) as SidebarItemData;
        if (id && idsCopy.length && item.children) {
            return this.getTargetItem(item.children, idsCopy);
        }
        return item;
    }
}
