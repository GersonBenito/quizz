import { IQuestions } from "./questions.interface";

export interface IQuestionnaire{
    _id?: string;
    title: string;
    description: string;
    code: string;
    numberQuestion: number;
    creationDate: Date;
    listQuestion: IQuestions[];
}