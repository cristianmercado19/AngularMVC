import { Task } from '../entities/task.model';
import { Observable } from 'rxjs/Observable';

export interface TaskListService {

    getListOfTasks(): Observable<Array<Task>>;
}

