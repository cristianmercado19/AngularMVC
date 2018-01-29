import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';

import {
    AddNewTaskIsolatedCotroller,
} from '../../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.controller';
import { AddNewTaskIsolatedView } from '../../../../application/tasks/mvc/add-new-task-isolated/add-new-task-isolated.view';
import { AddNewTaskService } from '../../../../application/tasks/services/add-new-task-service';

describe('AddNewTaskIsolatedCotroller: ', () => {

    const serviceSpy: AddNewTaskService = createAddNewTaskServiceSpy();
    const viewSpy: AddNewTaskIsolatedView = createAddNewTaskViewSpy();

    let controller: AddNewTaskIsolatedCotroller;

    it('should be created', () => {
        const taskController = new AddNewTaskIsolatedCotroller(serviceSpy);
        expect(taskController).not.toBeNull();
    });

    describe('during the "init" method called', () => {

        beforeEach(function () {
            // arrange
            controller = new AddNewTaskIsolatedCotroller(serviceSpy);

            // act
            controller.init(viewSpy);
        });

        it('setMaxLenghTaskName from the view should be called', () => {
            // act
            controller.init(viewSpy);

            // assert
            expect(viewSpy.setMaxLenghTaskName).toHaveBeenCalled();
        });
    });

    describe('during the "onAddTaskEvent" method called', () => {

        beforeEach(function () {
            // arrange
            controller = new AddNewTaskIsolatedCotroller(serviceSpy);
            controller.init(viewSpy);

            // act
            controller.onAddTaskEvent();
        });

        it('"lock" from the view should be called', () => {
            // assert
            expect(viewSpy.lock).toHaveBeenCalled();
        });

        it('"getTaskName" from the view should be called', () => {
            // assert
            expect(viewSpy.getTaskName).toHaveBeenCalled();
        });

        it('"addNewTask" from the service should be called', () => {
            // assert
            expect(serviceSpy.addNewTask).toHaveBeenCalled();
        });
    });

});


function createAddNewTaskServiceSpy() {
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