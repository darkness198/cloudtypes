import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AuthorService } from "../services/author.service";
import { Int, Ctx, Arg,  } from "type-graphql";
import { Author } from "../entity/Author";
import * as admin from 'firebase-admin';
import {  AddAuthorInput } from "../interfaces/author/createAuthor.args";
import { Context } from "apollo-server-core/dist/types";
import { UserService } from "../services/user.service";


@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    private userService: UserService,
  ) {}

  // @Query(returns => Author)
  // async author(@Args({ name: 'id', type: () => Int }) id: number) {
  //   return await this.authorService.findOneById(id);
  // }

  // @Query(returns => Author)
  // async author(@Args({ name: 'id', type: () => Int }) id: number) {
  //   return await this.authorService.findById(id);
  // }

  @Query(returns => [Author])
  async allAuthors() {
    return await this.authorService.findAll();
  }
  
  // @Mutation(returns => Author)
  // async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
  //   return await this.postsService.upvoteById({ id: postId });
  // }

  @Mutation(returns => Author)
  // async addAuthor(@Arg("data") input: AddAuthorInput): Promise<Author> {
  async addAuthor( 
    @Args({ name: 'displayName', type: () => String }) displayName: string,
    @Args({ name: 'email', type: () => String }) email: string,
    @Args({ name: 'password', type: () => String }) password: string
    ): Promise<Author> {
    // let { displayName, email, password } = input;
    // console.log('context', ctx);
    const newUser: admin.auth.UserRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
      disabled: false
    })
    return (await this.authorService.create(newUser))
    // return await this.authorService.create(firstName);
  }
 

  // @Mutation(returns => Post)
  // async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
  //   return await this.postsService.upvoteById({ id: postId });
  // }

  // const newUser = await admin.auth().createUser({
  //   email: 'user@example.com',
  //   emailVerified: false,
  //   phoneNumber: '+11234567890',
  //   password: 'secretPassword',
  //   displayName: 'John Doe',
  //   photoURL: 'http://www.example.com/12345678/photo.png',
  //   disabled: false
  // })

  // @ResolveProperty()
  // async posts(@Parent() author) {
  //   const { id } = author;
  //   return await this.postsService.findAll({ authorId: id });
  // }
}