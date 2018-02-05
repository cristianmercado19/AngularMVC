import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import {
    AddNewTaskPassiveCotroller,
} from '../../../../application/tasks/mvc/add-new-task-passive/add-new-task-passive.controller';
import { AddNewTaskPassiveView } from '../../../../application/tasks/mvc/add-new-task-passive/add-new-task-passive.view';
import { AddNewTaskService } from '../../../../application/tasks/services/add-new-task-service';

describe('AddNewTaskPassiveCotroller: ', () => {

    const serviceSpy: AddNewTaskService = createAddNewTaskServiceSpy();
    const viewSpy: AddNewTaskPassiveView = createAddNewTaskViewSpy();

    let controller: AddNewTaskPassiveCotroller;

    it('should be created', () => {
        const taskController = new AddNewTaskPassiveCotroller(serviceSpy);
        expect(taskController).not.toBeNull();
    });

    describe('during the "init" method called', () => {

        beforeEach(function () {
            // arrange
            controller = new AddNewTaskPassiveCotroller(serviceSpy);

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
            controller = new AddNewTaskPassiveCotroller(serviceSpy);
            controller.init(viewSpy);

            // act
            controller.onAddTaskEvent();
        });

        it('view."lock" should be called', () => {
            // assert
            expect(viewSpy.lock).toHaveBeenCalled();
        });

        it('view."getTaskName" should be called', () => {
            // assert
            expect(viewSpy.getTaskName).toHaveBeenCalled();
        });

        it('service."addNewTask" should be called', () => {
            // assert
            expect(serviceSpy.addNewTask).toHaveBeenCalled();
        });

        describe('during service."addNewTask"', () => {

            describe('when it is successful', () => {

                it('view."unlock" should be called', () => {
                    // arrange
                    controller = new AddNewTaskPassiveCotroller(serviceSpy);
                    controller.init(viewSpy);

                    // act
                    controller.onAddTaskEvent();

                    // assert
                    expect(viewSpy.unlock).toHaveBeenCalled();
                });

                it('view."showSuccessfulMessageOnAddNewTask" should be called', () => {
                    const taskId = 1234;

                    // arrange
                    serviceSpy.addNewTask = jasmine.createSpy('addNewTask').and.callFake(function () {
                        const observable = Observable.of(taskId);
                        return observable;
                    });

                    controller = new AddNewTaskPassiveCotroller(serviceSpy);
                    controller.init(viewSpy);

                    // act
                    controller.onAddTaskEvent();

                    expect(viewSpy.showSuccessfulMessageOnAddNewTask).toHaveBeenCalled();
                    expect(viewSpy.showSuccessfulMessageOnAddNewTask).toHaveBeenCalledWith(taskId);
                });
            });

            describe('when it is failed', () => {
                // arrange
                serviceSpy.addNewTask = jasmine.createSpy('addNewTask').and.callFake(function () {
                    return Observable.throw('forced error in the API');
                });

                controller = new AddNewTaskPassiveCotroller(serviceSpy);
                controller.init(viewSpy);

                // act
                controller.onAddTaskEvent();

                it('view."unlock" should be called', () => {
                    // assert
                    expect(viewSpy.unlock).toHaveBeenCalled();
                });

                it('view."showErrorMessageOnAddNewTask" should be called', () => {
                    // assert
                    expect(viewSpy.showErrorMessageOnAddNewTask).toHaveBeenCalled();
                });
            });
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

function createAddNewTaskViewSpy(): AddNewTaskPassiveView {
    const spy = jasmine.createSpyObj('AddNewTaskPassiveView'
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
