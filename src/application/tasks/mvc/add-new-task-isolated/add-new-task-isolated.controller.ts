import { TaskStoreService } from './../../services/task-store-service';
import { AddNewTaskService } from '../../services/add-new-task-service';
import { AddNewTaskIsolatedView } from './add-new-task-isolated.view';

import 'rxjs/add/operator/finally';
import { Task } from '../../entities/task.model';

export class AddNewTaskIsolatedCotroller {

    private readonly MAX_LENGTH_TASK_NAME = 20;

    private view: AddNewTaskIsolatedView;

    constructor(
        private taskService: AddNewTaskService,
        private taskSimpleStoreService: TaskStoreService,
    ) {
    }

    init(view: AddNewTaskIsolatedView) {
        this.view = view;
        this.view.setMaxLenghTaskName(this.MAX_LENGTH_TASK_NAME);
    }

    onAddTaskEvent() {
        this.view.lock();

        const taskName = this.view.getTaskName();

        this.taskService.addNewTask(taskName)
                        .finally(
                            () => {
                                this.onAddNewTaskFinish();
                            }
                        )
                        .subscribe(
                            (task) => {
                                this.newTaskSuccessfulyAdded(task);
                            },
                            (error) => {
                                this.handleErrorOnAddNewTask(error);
                            }
                        );
    }

    private onAddNewTaskFinish() {
        this.view.unlock();
    }

    private newTaskSuccessfulyAdded(task: Task) {
        this.taskSimpleStoreService.addNewTask(task);
        this.view.showSuccessfulMessageOnAddNewTask(task.id);
    }

    private handleErrorOnAddNewTask(error: any) {
        this.view.showErrorMessageOnAddNewTask();
    }
}
