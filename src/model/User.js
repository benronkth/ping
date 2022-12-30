import { atom } from "recoil";


export const playerIdAtom = atom({
    key: 'playerIdAtom',
    default: 0,
});

export const playerEmailAtom = atom({
    key: 'playerEmailAtom',
    default: "",
});

export const playerPasswordAtom = atom({
    key: 'playerPasswordAtom',
    default: "",
});

export const playerNameAtom = atom({
    key: 'playerNameAtom',
    default: "",
});

export const isPlayerLoggedInAtom = atom({
    key: 'isPlayerLoggedInAtom',
    default: false,
});

