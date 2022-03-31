import { IUser } from "./user.interface";

export interface IResponse {
    status: number;
    data?: IUser;
    message: string;
}