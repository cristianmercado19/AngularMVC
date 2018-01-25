import { IAddNewTaskApi } from './add-new-task.api';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';



export class TaskApi implements IAddNewTaskApi {

    post(name: string): Observable<string> {

        console.log('TaskApi: ' + name);

        if (name === 'error') {
            return Observable.throw('error forced in the API').delay(1000);
        } else {
            return Observable.of('abc12358').delay(5000);
        }
    }
}
