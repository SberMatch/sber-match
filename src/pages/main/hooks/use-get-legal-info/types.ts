export enum OkvedType {
    BAD = 'bad',
    COMMON = 'common',
    GOOD = 'good',
}

export interface Okved {
    code: string;
    name: string;
    main: boolean;
}

export type SortedOkvedLists = Record<OkvedType, Okved[]>;

export interface LegalInfo {
    name: string;
    okvedList: SortedOkvedLists;
}
