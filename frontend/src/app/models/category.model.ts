import { TaskSimplified } from "./task-simplified.model";

export interface Category{
    id: number;
    name: string;
    tasks: TaskSimplified[];
}