export interface SidebarItemData {
    id: string;
    icon: string;
    name: string;
    url: string;
    children?: SidebarItemData[];
    opened: boolean;
    color: string;
}
