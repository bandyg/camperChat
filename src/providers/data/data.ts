import {Injectable, NgZone} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Observable} from 'rxjs/Observable';
import PouchDB from 'pouchdb';
import {isBlank} from "ionic-angular/util/util";



@Injectable()
export class DataProvider {

  userid:string;
  username:string;
  picture:string = "assets/images/msgAvatar.png";
  db:any;
  data:any;
  cloudantUsername:string;
  cloudantPassword:string;
  remote:string;
  chatDataObserver:any;

  constructor(public zone:NgZone,
              public storage:Storage) {

    this.db = new PouchDB('camper_chat');
    this.cloudantUsername = '255afb8f-fb2f-4d44-98bd-0c9d6d493cff-bluemix';
    this.cloudantPassword = '7fc0cb963de3a2f028239d1daa8b54ea047e83f4d12b6dc084ae5db4c69216f2';
    this.remote = 'https://255afb8f-fb2f-4d44-98bd-0c9d6d493cff-bluemix:7fc0cb963de3a2f028239d1daa8b54ea047e83f4d12b6dc084ae5db4c69216f2@255afb8f-fb2f-4d44-98bd-0c9d6d493cff-bluemix.cloudant.com/camper_chat';

    //Set up PouchDB
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.cloudantUsername,
        password: this.cloudantPassword
      }
    };

    this.db.sync(this.remote, options);

  }

  addDocument(message) {

    this.db.put(message);
  }

  getDocuments() {

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true,
        limit: 30,
        descending: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        this.data.reverse();

        resolve(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }

  getDocumentsRX() {

    return Observable.create(Observer=> {

      this.db.allDocs({

        include_docs: true,
        limit: 30,
        descending: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });

        this.data.reverse();

        this.chatDataObserver = Observer;
        Observer.next(this.data);

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });
    /*    return new Promise(resolve => {

     this.db.allDocs({

     include_docs: true,
     limit: 30,
     descending: true

     }).then((result) => {

     this.data = [];

     let docs = result.rows.map((row) => {
     this.data.push(row.doc);
     });

     this.data.reverse();

     resolve(this.data);

     this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
     this.handleChange(change);
     });

     }).catch((error) => {

     console.log(error);

     });

     });
     */
  }

  handleChange(change) {

    this.zone.run(() => {

      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {

        if (doc._id === change.id) {
          changedDoc = doc;
          changedIndex = index;
        }

      });

      //A document was deleted
      if (change.deleted) {
        this.data.splice(changedIndex, 1);
      }
      else {

        //A document was updated
        if (changedDoc) {
          this.data[changedIndex] = change.doc;
        }

        //A document was added
        else {
          this.data.push(change.doc);
        }

      }

      if (change.deleted || isBlank(changedDoc))
        this.chatDataObserver.next(this.data);

    });


  }

  getLoginFlag():Promise<any> {

    return this.storage.get('LoginFlag');
  }

  setLoginFlag(flag):void {

    this.storage.set('LoginFlag', flag);
  }

}
