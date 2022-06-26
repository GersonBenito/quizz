import { IQuestions } from "./questions.interface";
import { IUser } from "./user.interface";

export interface IQuestionnaire{
    _id?: string;
    user: string | IUser | undefined;
    title: string;
    description: string;
    code: string;
    numberQuestion: number;
    creationDate: Date;
    listQuestion: IQuestions[];
}