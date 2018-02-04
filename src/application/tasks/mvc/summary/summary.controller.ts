import { SummaryView } from './summary.view';
import { TaskStoreService } from '../../services/task-store-service';

export class SummaryController {

    private view: SummaryView;


    constructor(
        private taskStoreService: TaskStoreService
    ) {
        this.taskStoreService.subscribe(() => this.updateTotalInView());
    }

    init(view: SummaryView) {
        this.view = view;

        this.updateTotalInView();
    }

    private updateTotalInView() {
        const taskState = this.taskStoreService.getState();

        const total = taskState.tasks.length;

        this.view.setTotalCount(total);
    }
}
