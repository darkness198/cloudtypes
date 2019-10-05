import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { AuthorService } from "../services/author.service";
import { Int,  } from "type-graphql";
import { Author } from "../entity/Author";


@Resolver(of => Author)
export class AuthorResolver {
  constructor(
    private readonly authorService: AuthorService,
    // private readonly postsService: PostsService,
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
  async addAuthor(@Args({ name: 'firstName', type: () => String }) firstName: string) {
    return await this.authorService.create(firstName);
  }

  // @Mutation(returns => Post)
  // async upvotePost(@Args({ name: 'postId', type: () => Int }) postId: number) {
  //   return await this.postsService.upvoteById({ id: postId });
  // }


  // @ResolveProperty()
  // async posts(@Parent() author) {
  //   const { id } = author;
  //   return await this.postsService.findAll({ authorId: id });
  // }
}