export interface Icontest {
    name: string;
    rooms: Iroom[];
    locks: Ilock[];
    journal: Ijournal;
    images: IcontentImages[];
}

export interface Iroom {
    id: number;
    name: string;
    contents: Icontent[];
    background: IdisplayImage;
    isVisible: boolean;
}

export interface Icontent {
    id: number;
    type: string;
    tooltip: string;
    isVisible: boolean;
    canBeOpened: boolean;
    lockId: number;  // if not provided ignore locked information
    name: string;
    background: IdisplayImage[];
    contents: IsubContents[];
    viewIndex: number;
    data: any;
}
export interface IsubContents {
    id: number;
    type: string;
    image: IdisplayImage;
    data: any;
}

export interface IdisplayImage {
    image: string;
    condition: string;
    text: string;
}

export interface Ilock  {
    id: number;
    tumblers: number;
    type: string;
    options: string;
    images: IdisplayImage[];
    currentValue: string;
    solution: string;
}

export interface Ijournal {
    pages: string[];
    currentPage: number;
}

export interface IcontentImages {
    type: string;
    images: IdisplayImage[];
}
