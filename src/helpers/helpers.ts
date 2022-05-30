import { nanoid } from 'nanoid';
import { IUser } from 'src/interfaces/user.interface';

export const generateCode = (): string =>{
    return nanoid(6).toUpperCase();
}

export const setLocalStorage = ( key: string, user: IUser | undefined): boolean =>{
    let save: boolean = false;
    if(user){
        localStorage.setItem(key, JSON.stringify(user));
        save = true;
    }
    return save;
}

export const getLocalStorage = (key: string): IUser =>{
    return JSON.parse(localStorage.getItem(key) || '{}');
}