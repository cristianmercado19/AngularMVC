import { IAddNewTaskApi } from './add-new-task.api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import { Task } from '../entities/task.model';



export class TaskApiMock implements IAddNewTaskApi {

    post(name: string): Observable<number> {

        if (name.toLowerCase() === 'error') {
            return Observable.throw('forced errorin the API');
        } else {
            const randomId = new Date().getTime();

            return Observable.of(randomId).delay(2000);
        }
    }



}
