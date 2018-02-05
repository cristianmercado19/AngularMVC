import { AddNewTaskService } from './add-new-task-service';

import { IAddNewTaskApi } from '../api/add-new-task.api';
import { TaskListService } from './task-list.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Task } from '../entities/task.model';
import { TaskStoreService } from './task-store-service';

export class InMemoryTaskService implements AddNewTaskService, TaskListService {
    getListOfTasks(): Observable<Array<Task>> {

        const tasks: Array<Task> = [];

        return Observable.of(tasks);
    }

    constructor (
        private taskApi: IAddNewTaskApi,
        private taskStorage: TaskStoreService,
    ) {
    }

    private createNewTask(id: number, name: string): Task {
        const task = new Task();
        task.id = id;
        task.name = name;

        return task;
    }

    addNewTask(taskName: string): Observable<Task> {

        return this.taskApi.post(taskName)
                    .switchMap(
                        (taskId) => {
                            const newTask = this.createNewTask(taskId, taskName);

                            this.taskStorage.addNewTask(newTask);

                            return Observable.of(newTask);
                        }
                    )
                    .take(1)
                    .finally(
                        () => {}
                    );
    }

}
