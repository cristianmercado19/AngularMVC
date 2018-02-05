import { Observable } from 'rxjs/Observable';
import { Task } from '../entities/task.model';
export interface AddNewTaskService {
    addNewTask(taskName: string): Observable<Task>;
}
