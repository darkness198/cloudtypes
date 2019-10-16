import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { prod } from '../config'

@Injectable()
export class UserService {

  public adminInstance: admin.app.App;

  constructor() {
    if(prod && admin.apps.length > 0){
    } else {
      this.adminInstance = admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
  }
  
}
