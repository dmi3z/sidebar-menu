import { Injectable } from '@angular/core';
import { Observable, delay, of, take } from 'rxjs';
import { MenuItem, MenuType } from '../components/card/menu-item.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
    private mainMenu: MenuItem[] = [
        {
            color: 'b-young-bamboo-color',
            code: '0',
            description: 'User',
            icon: 'accessibility',
            id: '0',
            link: 'fwfwef',
            type: MenuType.MENU,
            parentMenuCode: '1',
            sequence: 0,
            translation: 'First',
        },
        {
            color: 'b-ultramarine-color',
            code: '0',
            description: 'Alarm',
            icon: 'alarm',
            id: '1',
            link: 'fwfwef',
            type: MenuType.SESSION,
            parentMenuCode: '1',
            sequence: 0,
            translation: 'Second',
        },
    ];

    public loadMainMenu(): Observable<MenuItem[]> {
        return of(this.mainMenu).pipe(delay(1000), take(1));
    }

    public getSubmenu(submenuId: string): Observable<MenuItem[]> {
        const id1 = Math.round(Math.random() * 1000).toString();
        const id2 = Math.round(Math.random() * 1000).toString();
        return of([
            {
                color: 'b-young-bamboo-color',
                code: '0',
                description: 'User',
                icon: 'accessibility',
                id: id1,
                link: 'fwfwef',
                type: MenuType.MENU,
                parentMenuCode: '1',
                sequence: 0,
                translation: id1,
            },
            {
                color: 'b-ultramarine-color',
                code: '0',
                description: 'Alarm',
                icon: 'alarm',
                id: id2,
                link: 'fwfwef',
                type: MenuType.SESSION,
                parentMenuCode: '1',
                sequence: 0,
                translation: id2,
            },
        ]);
    }
}
