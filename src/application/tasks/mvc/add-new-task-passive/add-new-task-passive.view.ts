export interface AddNewTaskPassiveView {

    lock(): void;
    getTaskName(): string;
    unlock(): void;
    showSuccessfulMessageOnAddNewTask(taskId: number): void;
    showErrorMessageOnAddNewTask(): void;
    setMaxLenghTaskName(maxLength: number): void;
}
