import { TaskState } from './../mvc/store/task.state';
import { TaskStoreService, Unsubscribe } from './task-store-service';
import { Task } from '../entities/task.model';

export class TaskSimpleStoreService implements TaskStoreService {
    private state = new TaskState();
    private listeners: Array<()=> void> = [];

    constructor() {
    }

    getState(): TaskState {

        const copyOfState = Object.assign({}, this.state);

        return copyOfState;
    }

    subscribe(listener: () => void): Unsubscribe {

        this.listeners.push(listener);

        return () => {
            const index = this.listeners.indexOf(listener);

            this.listeners.splice(index, 1);
         };
    }

    addNewTask(newTask: Task) {
        this.state.tasks.push(newTask);

        this.notifyListeners();
    }

    private notifyListeners() {
        for (let i = 0; i < this.listeners.length; i++) {
          const listener = this.listeners[i];
          listener();
        }
    }

}
