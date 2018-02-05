import { Task } from '../../entities/task.model';

export interface ListView {

    updateList(taks: Array<Task>);
}
