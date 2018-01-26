import { ListTaskView } from '../../../../application/tasks/mvc/list-tasks/list-tasks.view';
import { ListTasksController } from '../../../../application/tasks/mvc/list-tasks/list-tasks.controller';
import { TaskListService } from '../../../../application/tasks/services/task-list.service';
import { Task } from '../../../../application/tasks/entities/task.model';

describe('list-tasks.controller', () => {

    function createFakeController(): ListTasksController {
        const taskListService: TaskListService = new FakeTaskListService();
        const controller = new ListTasksController(taskListService);

        return controller;
    }

    it('should create', () => {
    });

    it('controller has a view', () => {

        const view: ListTaskView = null;

        // arrange
        const controller = createFakeController();

        // act

        controller.init(view);
    });

    it('controller depends on a TaskService', () => {
        // arrange
        const taskListService: TaskListService = new FakeTaskListService();

        // act
        const controller = new ListTasksController(taskListService);

        // assert
    });

    it('controller get tasks from TaskService during the init', () => {
        // arrange
        const taskListService: TaskListService = new FakeTaskListService();
        const view: ListTaskView = null;

        // act
        const controller = new ListTasksController(taskListService);

        spyOn(taskListService, 'getListOfTasks').and.callThrough();

        controller.init(view);

        // assert
        expect(taskListService.getListOfTasks).toHaveBeenCalled();
    });

    it('controller pass tasks to the view', () => {

    });
});

class FakeTaskListService implements TaskListService {
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

