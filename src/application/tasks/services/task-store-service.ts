import { Task } from './../entities/task.model';
import { TaskState } from '../mvc/store/task.state';

export interface TaskStoreService {

    getState(): TaskState;

    subscribe(listener: () => void): Unsubscribe;

    addNewTask(newTask: Task): void;
}

export type Unsubscribe = () => void;
