export interface AddNewTaskIsolatedView {

    lock(): void;
    getTaskName(): string;
    unlock(): void;
    showSuccessfulMessageOnAddNewTask(taskId: number);
    showErrorMessageOnAddNewTask();
    setMaxLenghTaskName(maxLength: number);
}
