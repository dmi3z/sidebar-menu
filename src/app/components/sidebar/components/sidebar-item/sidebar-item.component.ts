import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SidebarItemData } from '../../interfaces/sidebar.interface';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf],
})
export class SidebarItemComponent {
    @Input() public item!: SidebarItemData;
    @Input() public level!: number;
    @Input() public activeUrl!: string;

    @Output() public itemSelected = new EventEmitter<string[]>();

    constructor(private router: Router) {}

    public goTo(): void {
        if (this.item.children) {
            this.itemSelected.emit([this.item.id]);
        } else {
            this.router.navigateByUrl(this.item.url);
        }
    }

    public toggle(event: MouseEvent): void {
        event.preventDefault();
        event.stopPropagation();
        this.item.opened = !this.item.opened;
    }

    public selectItem(itemIds: string[]): void {
        this.itemSelected.emit([this.item.id, ...itemIds]);
    }

    get levelPadding(): string {
        if (this.level && this.level > 0) {
            return 24 * this.level + 'px';
        }
        return '12px';
    }
}
