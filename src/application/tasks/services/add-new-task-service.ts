import { Observable } from 'rxjs/Observable';
export interface AddNewTaskService {
    addNewTask(taskName: string): Observable<number>;
}
