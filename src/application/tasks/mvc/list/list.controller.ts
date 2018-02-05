import { TaskStoreService } from '../../services/task-store-service';
import { ListView } from './list.view';

export class ListController {

    private view: ListView;

    constructor(
        private taskStoreService: TaskStoreService
    ) {
        this.taskStoreService.subscribe(() => this.updateListInView());
    }

    public init(view: ListView) {
        this.view = view;
        this.updateListInView();
    }

    private updateListInView() {
        const taskState = this.taskStoreService.getState();

        this.view.updateList(taskState.tasks);
    }

}
