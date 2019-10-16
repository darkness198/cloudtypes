import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AuthorService } from "../services/author.service";
import { Author } from "../entity/Author";
import * as admin from 'firebase-admin';
import { UserService } from "../services/user.service";


@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private userService: UserService,
  ) {}

  @Query(returns => [Author])
  async allAuthors() {
    return await this.authorService.findAll();
  }
  
  @Mutation(returns => Author)
  async addAuthor( 
    @Args({ name: 'displayName', type: () => String }) displayName: string,
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string
    ): Promise<Author> {

    const newUser: admin.auth.UserRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
      disabled: false
    })
    return (await this.authorService.create(newUser));
  }
}