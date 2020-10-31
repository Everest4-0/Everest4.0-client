import { Observable } from 'rxjs';
export interface IService<T> {

    one(id: string): Observable<any>

    all(f: any): Observable<Array<any>>
    
    update(o: T): Observable<any>

    create(o: T): Observable<any>
}
