export class AddNewTaskViewModel {
    lock = false;
    taskName: string;
    taskMaxLength = 100000;
    errorMessageVisible = false;
    successMessageVisible = false;

    showError() {
        this.errorMessageVisible = true;
        this.successMessageVisible = false;
    }

    showSuccess() {
        this.successMessageVisible = true;
        this.errorMessageVisible = false;
    }
}
