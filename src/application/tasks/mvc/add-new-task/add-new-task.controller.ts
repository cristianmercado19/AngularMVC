import { AddNewTaskView } from './add-new-task.view';
import { AddNewTaskService } from '../../services/add-new-task-service';
import { AddNewTaskViewModel } from './add-new-task.model';

import 'rxjs/add/operator/finally';

export class AddNewTaskController {
    private readonly MAX_LENGTH_TASK_NAME = 20;
    private view: AddNewTaskView;
    private viewModel: AddNewTaskViewModel;

    constructor(
        private taskService: AddNewTaskService,
    ) {
    }

    init(view: AddNewTaskView) {
        this.view = view;
        this.initializeViewModel();
        this.initializeView();
    }
    private initializeView() {
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
                            (task) => {
                                this.newTaskSuccessfulyAdded(task.id);
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

    private newTaskSuccessfulyAdded(taskId: number) {
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
