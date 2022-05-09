import { IResponse } from "./response.interface";

export interface IQuestions{
    title: string;
    seconds: number;
    score: number;
    listResponse: IResponse[];
}