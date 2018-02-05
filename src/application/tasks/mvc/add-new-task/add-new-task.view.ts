import { AddNewTaskViewModel } from './add-new-task.model';
export interface AddNewTaskView {
    setViewModel(viewModel: AddNewTaskViewModel): void;
    showServiceIsUnavailableErrorMessage(): void;
    cleanMessages(): void;
    showTaskAddedSuccessfulyMessage(taskId: number): void;
}
