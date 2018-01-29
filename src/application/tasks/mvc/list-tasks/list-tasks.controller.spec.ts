import { ListTaskView } from '../../../../application/tasks/mvc/list-tasks/list-tasks.view';
import { ListTasksController } from '../../../../application/tasks/mvc/list-tasks/list-tasks.controller';
import { TaskListService } from '../../../../application/tasks/services/task-list.service';
import { Task } from '../../../../application/tasks/entities/task.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { InMemoryTaskService } from '../../../../application/tasks/services/in-memory-task.service';

describe('ListTasksController', () => {

    let taskListServiceSpy: TaskListService;
    let viewSpy: ListTaskView;

    function createTaskListServiceSpy () {
        const spy = jasmine.createSpyObj('TaskListService', ['getListOfTasks']);

        spy.getListOfTasks = jasmine.createSpy('getListOfTasks').and.callFake(function () {
            return Observable.of([]);
        });

        return spy;
    }

    function createTaskListViewSpy() {
        const spy = jasmine.createSpyObj('TaskListView', ['setTasks']);

        return spy;
    }

    beforeEach(function(){
        taskListServiceSpy = createTaskListServiceSpy();
        viewSpy = createTaskListViewSpy();
    });

    it('depends on a TaskService', () => {
        // act
        const controller = new ListTasksController(taskListServiceSpy);
    });

    it('initialize a view', () => {

        // arrange
        const controller = new ListTasksController(taskListServiceSpy);

        // act
        controller.init(viewSpy);
    });

    describe('during the "init" process', () => {

        it('getListOfTasks from TaskListService should be called', () => {
            // act
            const controller = new ListTasksController(taskListServiceSpy);

            controller.init(viewSpy);

            // assert
            expect(taskListServiceSpy.getListOfTasks).toHaveBeenCalled();
        });

        it('setTasks from TaskListView should be called', () => {

            // arrange
            const tasks = new MockTasks().getListOfTasks();

            taskListServiceSpy.getListOfTasks = jasmine.createSpy('getListOfTasks').and.callFake(function () {
                return Observable.of(tasks);
            });

            const controller = new ListTasksController(taskListServiceSpy);

            // act
            controller.init(viewSpy);

            // assert
            expect(viewSpy.setTasks).toHaveBeenCalled();
            expect(viewSpy.setTasks).toHaveBeenCalledWith(tasks);
        });
    });

});

class MockTasks {
    getListOfTasks(): Array<Task> {
        const tasks: Array<Task> = [];

        const taskA = new Task();
        taskA.id = 1;
        taskA.name = 'taskA';

        tasks.push(taskA);

        const taskB = new Task();
        taskB.id = 1;
        taskB.name = 'taskB';

        tasks.push(taskB);

        return tasks;
    }
}
