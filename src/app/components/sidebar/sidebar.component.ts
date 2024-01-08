import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SidebarItemData } from './interfaces/sidebar.interface';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';

@Component({
    selector: 'app-lib-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, RouterModule, SidebarItemComponent],
})
export class SidebarComponent {
    @Input() navItems: SidebarItemData[] = [];
    @Input() public parameters = {
        sidebar: true,
        cards: true,
    };

    @Output() public itemSelected = new EventEmitter<string[]>();

    @ViewChild('resizer')
    public resizer!: ElementRef;

    @ViewChild('navRef')
    public navRef!: ElementRef;

    @ViewChild('contentRef')
    public contentRef!: ElementRef;

    private resizingEvent = {
        isResizing: false,
        startingCursorX: 0,
        startingWidth: 0,
    };

    public activeUrl: string = '';

    constructor() {}

    public loadItemChild(itemIds: string[]): void {
        this.itemSelected.emit(itemIds);
    }

    public startResizing(event: MouseEvent): void {
        this.resizingEvent = {
            isResizing: true,
            startingCursorX: event.clientX,
            startingWidth: this.navRef.nativeElement.getBoundingClientRect().width,
        };
    }

    @HostListener('window:mousemove', ['$event'])
    updateSidenavWidth(event: MouseEvent) {
        if (!this.resizingEvent.isResizing) {
            return;
        }

        const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;
        const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;
        this.navRef.nativeElement.style.width = newWidth + 'px';
        this.contentRef.nativeElement.style.width = window.innerWidth - newWidth + 'px';
    }

    @HostListener('window:mouseup')
    stopResizing() {
        this.resizingEvent.isResizing = false;
    }
}
