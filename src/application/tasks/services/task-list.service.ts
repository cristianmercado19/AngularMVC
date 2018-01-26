import { Task } from '../entities/task.model';

export interface TaskListService {
    getListOfTasks(): Array<Task>;
}