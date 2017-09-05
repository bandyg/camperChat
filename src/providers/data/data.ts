import { Injectable, NgZone } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class DataProvider {

  fbid: number;
  username: string;
  picture: string;
  db: any;
  data: any;
  cloudantUsername: string;
  cloudantPassword: string;
  remote: string;

  constructor(public zone: NgZone){



  }

  addDocument(message) {

  }

  getDocuments(){

    return new Promise( resolve => {

    });
  }

  handleChange(change) {

  }

}
