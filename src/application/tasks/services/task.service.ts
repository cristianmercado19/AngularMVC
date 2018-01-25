import { IAddNewTaskService } from './add-new-task-service';
import { Observable } from 'rxjs/Observable';
import { IAddNewTaskApi } from '../api/add-new-task.api';

export class TaskService implements IAddNewTaskService {

    constructor (
        private addNewTaskApi: IAddNewTaskApi
    ) {
    }

    addNewTask(taskName: string): Observable<string> {

        return this.addNewTaskApi.post(taskName);
    }

}
