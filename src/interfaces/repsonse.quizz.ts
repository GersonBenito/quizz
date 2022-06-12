import { IQuestionnaire } from "./questionnaire.interface";

export interface IQuizzResponse {
    status: number;
    data?: IQuestionnaire[];
    message: string;
}