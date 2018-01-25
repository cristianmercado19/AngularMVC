import { IAddNewTaskView } from './add-new-task.view';
import { IAddNewTaskService } from '../../services/add-new-task-service';
import { AddNewTaskViewModel } from './add-new-task.model';

import 'rxjs/add/operator/finally';

export class AddNewTaskController {
    private readonly MAX_LENGTH_TASK_NAME = 20;
    private view: IAddNewTaskView;
    private viewModel: AddNewTaskViewModel;

    constructor(
        private taskService: IAddNewTaskService,
    ) {
    }

    init(view: IAddNewTaskView) {
        this.initializeViewModel();

        this.view = view;
        this.view.setViewModel(this.viewModel);
        this.view.cleanMessages();
    }
    onAddTaskEvent() {
        this.viewModel.lock = true;
        this.view.cleanMessages();

        const taskName = this.viewModel.taskName;

        this.taskService.addNewTask(taskName)
                        .finally(
                            () => {
                                this.onAddNewTaskFinish();
                            }
                        )
                        .subscribe(
                            (taskId) => {
                                this.newTaskSuccessfulyAdded(taskId);
                            },
                            (error) => {
                                this.handleErrorOnAddNewTask(error);
                            }
                        );
    }

    private onAddNewTaskFinish() {
        this.viewModel.lock = false;
    }

    private initializeViewModel() {
        this.viewModel = new AddNewTaskViewModel();

        this.viewModel.lock = false;
        this.viewModel.taskName = '';
        this.viewModel.taskMaxLength = this.MAX_LENGTH_TASK_NAME;
        this.viewModel.errorMessageVisible = false;
        this.viewModel.successMessageVisible = false;
    }

    private newTaskSuccessfulyAdded(taskId: string) {
        this.view.cleanMessages();
        this.viewModel.taskName = '';
        this.viewModel.showSuccess();
        this.view.showTaskAddedSuccessfulyMessage(taskId);
    }

    private handleErrorOnAddNewTask(error: any) {
        this.viewModel.showError();
        this.view.showServiceIsUnavailableErrorMessage();
    }

}
