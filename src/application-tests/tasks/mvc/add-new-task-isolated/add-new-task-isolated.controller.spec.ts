import { AddNewTaskIsolatedCotroller } from '../../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';
import { IAddNewTaskService } from '../../../../application/tasks/services/add-new-task-service';
import { IAddNewTaskIsolatedView } from '../../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.view';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('add-new-task-isolated.controller', () => {

    it('should create', () => {
        const  taskService: IAddNewTaskService = null;

        const controller = new AddNewTaskIsolatedCotroller(taskService);
    });

    it('setMaxLenghTaskName should be call in the init', () => {

        // arrange
        const  taskService = new FakeService();
        const view = new FakeView();

        const controller = new AddNewTaskIsolatedCotroller(taskService);
        view.setMaxLenghTaskName = (length) => {};

        spyOn(view, 'setMaxLenghTaskName').and.callThrough();

        // act
        controller.init(view);

        // assert
        expect(view.setMaxLenghTaskName).toHaveBeenCalled();
    });

    it('lock the view when OnAddTaskEvent is called', () => {

        // arrange
        const taskService = new FakeService();
        const view = new FakeView();

        const controller = new AddNewTaskIsolatedCotroller(taskService);

        spyOn(view, 'lock').and.callThrough();

        controller.init(view);

        // act
        controller.onAddTaskEvent();

        // assert
        expect(view.lock).toHaveBeenCalled();
    });

});

class MockController {
    createController() {

    }
}

class FakeView implements IAddNewTaskIsolatedView {
    lock(): void {
    }
    getTaskName(): string {
        return 'fakeTask';
    }
    unlock(): void {
    }
    showSuccessfulMessageOnAddNewTask(taskId: string) {
    }
    showErrorMessageOnAddNewTask() {
    }
    setMaxLenghTaskName(maxLength: number) {
    }

}

class FakeService implements IAddNewTaskService {
    addNewTask(taskName: string): Observable<string> {
        const random = new Date().getMilliseconds() + '';

        return Observable.of(random);
    }

}
