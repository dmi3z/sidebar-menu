export interface MenuItem {
    id: string;
    code: string;
    description: string;
    color: string;
    icon: string;
    translation: string;
    sequence: number;
    link: string;
    type: MenuType;
    parentMenuCode: string;
}

export enum MenuType {
    SESSION = 'session',
    MENU = 'menu',
}
