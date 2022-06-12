import { IQuestions } from "./questions.interface";
import { IUser } from "./user.interface";

export interface IQuestionnaire{
    user: string | IUser | undefined;
    title: string;
    description: string;
    code: string;
    numberQuestion: number;
    creationDate: Date;
    listQuestion: IQuestions[];
}