import { Injectable } from '@angular/core';
import { Observable, Subject, delay, map, tap } from 'rxjs';
import { MenuItem } from '../components/card/menu-item.interface';
import { SidebarItemData } from '../components/sidebar/interfaces/sidebar.interface';

@Injectable({ providedIn: 'root' })
export class StateService {
    public expandMenu$ = new Subject<string[]>();
    private currentMenu$ = new Subject<SidebarItemData[]>();
    private levels: string[] = [];

    public saveCurrentMenuList(menu: SidebarItemData[], levels: string[]): void {
        this.currentMenu$.next(menu);
        this.levels = levels;
    }

    public get currentMenu(): Observable<SidebarItemData[]> {
        return this.currentMenu$.pipe(
            delay(0),
            map((res) => this.getTargetItem(res, this.levels))
        );
    }

    public expandMenu(id: string): void {
        this.levels.push(id);
        this.expandMenu$.next(this.levels);
    }

    private getTargetItem(items: SidebarItemData[], ids: string[]): SidebarItemData[] {
        const idsCopy = [...ids];
        const id = idsCopy.shift();
        const item = items.find((el) => el.id === id) as SidebarItemData;
        if (id && item.children) {
            return this.getTargetItem(item.children, idsCopy);
        }

        return item?.children || items;
    }
}
