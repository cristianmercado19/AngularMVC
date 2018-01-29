import { ListTaskView } from './list-tasks.view';
import { TaskListService } from '../../services/task-list.service';

import { Observable } from 'rxjs/Observable';

export class ListTasksController {

    private view: ListTaskView;

    constructor(
        private taskListService: TaskListService
    ) {
    }
    init(view: ListTaskView): void {
        this.view = view;

        this.taskListService
            .getListOfTasks()
            .subscribe(
                (result) => {
                    this.view.setTasks(result);
                },
                (error) => {
                }
            );
    }

}

