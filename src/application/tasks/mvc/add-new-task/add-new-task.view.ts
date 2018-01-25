import { AddNewTaskViewModel } from './add-new-task.model';
export interface IAddNewTaskView {
    setViewModel(viewModel: AddNewTaskViewModel);
    showServiceIsUnavailableErrorMessage();
    cleanMessages();
    showTaskAddedSuccessfulyMessage(taskId: string);
}
