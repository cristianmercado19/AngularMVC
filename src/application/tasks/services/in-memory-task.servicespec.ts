import { InMemoryTaskService } from './in-memory-task.service';


describe('InMemoryTaskService', () => {

    it('should be created without dependencies', () => {
        const service = new InMemoryTaskService();
    });

    it('list of Tasks should be empty after initializatioin', () => {
        const service = new InMemoryTaskService();

        // assert
        service.getListOfTasks()
                .subscribe(
                    (tasks) => {
                        expect(tasks.length).toBe(0);
                    }
                );
    });

});
