import { IResponse } from "./responses.interface";

export interface IQuestions{
    title: string;
    seconds: number;
    score: number;
    listResponse: IResponse[];
}