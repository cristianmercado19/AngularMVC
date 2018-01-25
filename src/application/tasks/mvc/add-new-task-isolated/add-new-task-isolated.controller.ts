import { IAddNewTaskService } from '../../services/add-new-task-service';
import { IAddNewTaskIsolatedView } from './add-new-task-isolated.view';

import 'rxjs/add/operator/finally';

export class AddNewTaskIsolatedCotroller {

    private readonly MAX_LENGTH_TASK_NAME = 20;

    private view: IAddNewTaskIsolatedView;

    constructor(
        private taskService: IAddNewTaskService,
    ) {
    }

    init(view: IAddNewTaskIsolatedView) {
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
                            (taskId: string) => {
                                this.newTaskSuccessfulyAdded(taskId);
                            },
                            (error) => {
                                this.handleErrorOnAddNewTask(error);
                            }
                        );
    }

    private onAddNewTaskFinish() {
        this.view.unlock();
    }

    private newTaskSuccessfulyAdded(taskId: string) {
        this.view.showSuccessfulMessageOnAddNewTask(taskId);
    }

    private handleErrorOnAddNewTask(error: any) {
        this.view.showErrorMessageOnAddNewTask();
    }
}
