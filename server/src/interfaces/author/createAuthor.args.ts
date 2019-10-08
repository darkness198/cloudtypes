import { ArgsType, Field, InputType } from "type-graphql";
import { Author } from "src/entity/Author";

// @ArgsType()
// export class AddAuthorArgs {
//   @Field({ nullable: false })
//   displayName: string;

//   @Field({ nullable: false })
//   email: string;

//   @Field({ nullable: false })
//   password: string;
// }

@InputType({ description: "New recipe data" })
export class AddAuthorInput implements Partial<Author> {
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;
}