import { TaskStoreService } from './../../services/task-store-service';
import { AddNewTaskService } from '../../services/add-new-task-service';
import { AddNewTaskPassiveView } from './add-new-task-passive.view';

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/take';

import { Task } from '../../entities/task.model';

export class AddNewTaskPassiveCotroller {

    private readonly MAX_LENGTH_TASK_NAME = 20;

    private view: AddNewTaskPassiveView;

    constructor(
        private taskService: AddNewTaskService,
    ) {
    }

    init(view: AddNewTaskPassiveView) {
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
                        .take(1)
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
        this.view.showSuccessfulMessageOnAddNewTask(task.id);
    }

    private handleErrorOnAddNewTask(error: any) {
        this.view.showErrorMessageOnAddNewTask();
    }
}
