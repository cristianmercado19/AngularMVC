import { IAddNewTaskApi } from './add-new-task.api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';



export class TaskApi implements IAddNewTaskApi {

    post(name: string): Observable<string> {

        if (name === 'error') {
            return Observable.throw('error forced in the API');
        } else {
            const random =  new Date().getTime();
            return Observable.of(random + '').delay(5000);
        }
    }
}
