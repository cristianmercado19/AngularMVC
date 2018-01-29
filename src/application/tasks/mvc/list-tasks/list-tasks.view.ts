import { Task } from '../../entities/task.model';

export interface ListTaskView {

    setTasks(tasks: Array<Task>);
}
