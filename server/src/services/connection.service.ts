// import { Injectable } from '@nestjs/common';
// import { Connection, getConnectionManager, ConnectionOptions, getConnection, createConnection } from 'typeorm';
// import 'reflect-metadata';




// @Injectable()
// export class ConnectionService {

//   private mySqlManager: Promise<Connection>;
//   private prod: boolean = process.env.NODE_ENV === 'production';
//   public isConnected: boolean = false;
//   private config: ConnectionOptions;
//   constructor() {
//     console.log('MADE IT')
//     console.log(this.prod)

//     // this.mySqlManager = this.connect();
//   }

//   get getSqlManagerInstance() {
//     return this.connect();
//   }

//   connect = async (): Promise<Connection> => {

//     return new Promise((resolve, reject) => {
//       let connection: Connection = null;


//       try {
//         createConnection(this.config).then((succ) => {
//           this.isConnected = true;
//           console.log('CREATING', succ)
//           resolve(connection)
//         }).catch((err) => {
//           console.log('ERRORNG', err)
//         })
//       } catch (err) {
//         try {
//           connection = getConnection(this.config.name)
//           // resolve(connection)
//           console.log(connection)
//         } catch (err) {
//           console.log('CATCHING', err)
//           createConnection(this.config).then((succ) => {
//             this.isConnected = true;
//             console.log('CREATING', succ)
//             resolve(connection)
//           }).catch((err) => {
//             console.log('ERRORNG', err)
//           })
//         }
//         console.log(err)
//       }
//     })
//   }
// }

