import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class UserService {

  public adminInstance: admin.app.App;

  constructor() {

    this.adminInstance = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    });


  }

  // async createUser (): Promise<admin.auth.UserRecord> {

  //   //Create user for admin
  //   const newUser = await admin.auth().createUser({
  //     email: 'user@example.com',
  //     emailVerified: false,
  //     phoneNumber: '+11234567890',
  //     password: 'secretPassword',
  //     displayName: 'John Doe',
  //     photoURL: 'http://www.example.com/12345678/photo.png',
  //     disabled: false
  //   })
  //   return newUser;
    


  //     // .then(function(userRecord) {
  //     //   // See the UserRecord reference doc for the contents of userRecord.
  //     //   console.log('Successfully created new user:', userRecord.uid);
  //     // })
  //     // .catch(function(error) {
  //     //   console.log('Error creating new user:', error);
  //     // });
  // }


}
