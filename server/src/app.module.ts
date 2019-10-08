import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphQLModule} from '@nestjs/graphql';
import { AuthorService } from './services/author.service';
// import { ConnectionService } from './services/connection.service';
import { AuthorResolver } from './resolvers/author.resolver';
import { UserService } from './services/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot(process.env.NODE_ENV === 'production' ? {
      autoSchemaFile: '/tmp/schema.gql.log',
    } : {
      autoSchemaFile: './dist/schema.gql.log',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthorService, AuthorResolver, UserService],
})
export class AppModule {}
