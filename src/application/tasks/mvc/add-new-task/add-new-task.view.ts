import { AddNewTaskViewModel } from './add-new-task.model';
export interface AddNewTaskView {
    setViewModel(viewModel: AddNewTaskViewModel);
    showServiceIsUnavailableErrorMessage();
    cleanMessages();
    showTaskAddedSuccessfulyMessage(taskId: number);
}
