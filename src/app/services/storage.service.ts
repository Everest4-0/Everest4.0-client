import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
// key that is used to access the data in local storage

const STORAGE_KEY = 'local_everest_key';

@Injectable({
  providedIn: 'root'
})
export class StorageServices {

  anotherTodolist = [];
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
  public save(key: string, o: any): void {

    // get array of tasks from local storage
    const storage = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    storage.push({
      key: key,
      data: o,
      isChecked: false
    });
    // insert updated array to local storage
    this.remove(key);
    this.storage.set(STORAGE_KEY, storage);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }
  public get(key: string): any {
    // get array of tasks from local storage
    const storage = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    const final = storage.filter(k => k.key == key)[0];

    return final || {};
  }

  public remove(key: string): any {

    // get array of tasks from local storage
    const storage = this.storage.get(STORAGE_KEY) || [];
    // push new task to array
    const index = storage.indexOf(key, 0);
    storage.forEach((s, index) => {
      if (s.key === key) {
        storage.splice(index, 1);
        this.storage.set(STORAGE_KEY, storage);
      }
    });
  }
}