import { AddNewTaskIsolatedCotroller } from '../../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';
import { AddNewTaskService } from '../../../../application/tasks/services/add-new-task-service';
import { AddNewTaskIsolatedView } from '../../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.view';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AddNewTaskView } from '../../../../application/tasks/mvc/add-new-task/add-new-task.view';

describe('add-new-task-isolated.controller', () => {

    let serviceSpy: AddNewTaskService;
    let viewSpy: AddNewTaskIsolatedView;

    function createAddNewTaskServiceSpy () {
        const spy = jasmine.createSpyObj('AddNewTaskService', ['addNewTask']);

        spy.addNewTask = jasmine.createSpy('addNewTask').and.callFake(function () {
            const observable = Observable.of(1);
            return observable;
        });

        return spy;
    }

    function createAddNewTaskViewSpy(): AddNewTaskIsolatedView {
        const spy = jasmine.createSpyObj('AddNewTaskIsolatedView'
                                        , [
                                            'lock'
                                            , 'getTaskName'
                                            , 'unlock'
                                            , 'showSuccessfulMessageOnAddNewTask'
                                            , 'showErrorMessageOnAddNewTask'
                                            , 'setMaxLenghTaskName'
                                        ]);

        return spy;
    }

    beforeEach(function(){
        serviceSpy = createAddNewTaskServiceSpy();
        viewSpy = createAddNewTaskViewSpy();
    });

    it('should create', () => {
        const controller = new AddNewTaskIsolatedCotroller(serviceSpy);
    });

    it('setMaxLenghTaskName should be call in the init', () => {

        // arrange

        const controller = new AddNewTaskIsolatedCotroller(serviceSpy);
        viewSpy.setMaxLenghTaskName = (length) => {};

        spyOn(viewSpy, 'setMaxLenghTaskName').and.callThrough();

        // act
        controller.init(viewSpy);

        // assert
        expect(viewSpy.setMaxLenghTaskName).toHaveBeenCalled();
    });

    it('lock the view when OnAddTaskEvent is called', () => {

        // arrange
        const controller = new AddNewTaskIsolatedCotroller(serviceSpy);

        controller.init(viewSpy);

        // act
        controller.onAddTaskEvent();

        // assert
        expect(viewSpy.lock).toHaveBeenCalled();
    });

});
