export interface IAddNewTaskIsolatedView {

    lock(): void;
    getTaskName(): string;
    unlock(): void;
    showSuccessfulMessageOnAddNewTask(taskId: string);
    showErrorMessageOnAddNewTask();
    setMaxLenghTaskName(maxLength: number);
}
