import { AddNewTaskService } from './add-new-task-service';

import { IAddNewTaskApi } from '../api/add-new-task.api';
import { TaskListService } from './task-list.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';


import { Task } from '../entities/task.model';

export class InMemoryTaskService implements AddNewTaskService, TaskListService {
    private tasks: Array<Task> = [];
    getListOfTasks(): Observable<Array<Task>> {

        return Observable.of(this.tasks);
    }

    constructor () {
    }

    addNewTask(taskName: string): Observable<number> {

        const randomId =  new Date().getTime();

        const task = new Task();
        task.id = randomId;
        task.name = taskName;

        this.tasks.push(task);

        return Observable.of(randomId).delay(2000);
    }

}
