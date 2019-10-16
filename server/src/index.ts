
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as express from 'express';
import { INestApplicationContext } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { UserService } from './services/user.service';

const server = express();
let app: INestApplicationContext;

export const createNestServer = async (expressInstance) => {
  console.log('createNest')
  app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  return app.init();
};

createNestServer(server)

    // tslint:disable-next-line:no-console
    .then(v => console.log('Nest Ready'))
    // tslint:disable-next-line:no-console
    .catch(err => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);

export const testUserCreate = functions.auth.user().onCreate(async (user) => {
  
  console.log('user', user);
  const authorService = new AuthorService(new UserService());
  const authorRepo = await authorService.getRepo();
  console.log('Author Service', authorService, 'Author Repository', authorRepo);

});

