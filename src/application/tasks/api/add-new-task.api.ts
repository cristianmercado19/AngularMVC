import { Observable } from 'rxjs/Observable';

export interface IAddNewTaskApi {

    post(taskName: string): Observable<string>;
}
