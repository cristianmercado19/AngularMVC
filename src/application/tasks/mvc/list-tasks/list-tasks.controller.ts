import { ListTaskView } from './list-tasks.view';
import { TaskListService } from '../../services/task-list.service';

export class ListTasksController {

    private view: ListTaskView;

    constructor(
        private taskListService: TaskListService
    ) {
    }
    init(view: ListTaskView): void {
        this.view = view;

        this.taskListService.getListOfTasks();
    }



}

