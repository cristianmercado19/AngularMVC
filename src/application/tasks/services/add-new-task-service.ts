import { Observable } from 'rxjs/Observable';
export interface IAddNewTaskService {
    addNewTask(taskName: string): Observable<string>;
}
