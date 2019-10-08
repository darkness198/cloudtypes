import { Field, Int, ObjectType} from 'type-graphql';
import { Post } from './Post';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from 'typeorm';
import { Message } from './Message';


@ObjectType()
@Entity()
export class Author extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column({ 
    type: 'varchar',
    nullable: true,
    length: 200
  })
  @Field({ nullable: true })
  firstName?: string;
  
  @Column({ 
    type: 'varchar',
    nullable: true,
    length: 200
  })
  @Field({ nullable: true })
  lastName?: string;

  @Column({ 
    type: 'varchar',
    nullable: true,
    length: 200
  })
  @Field({ nullable: true })
  displayName?: string;

  @Column({ 
    type: 'varchar',
    nullable: true,
    length: 200
  })
  @Field({ nullable: true })
  email?: string;

  @Column({ 
    type: 'varchar',
    nullable: true,
    length: 200
  })
  @Field({ nullable: true })
  password?: string;

  @Column({ 
    type: 'varchar',
    nullable: true,
    length: 1000
  })
  @Field({ nullable: true })
  refreshToken?: string;

  @OneToMany(type => Post, post => post.owner)  
  @Field(type => [Post])
  posts: Post[];

  @OneToMany(type => Message, message => message.author)  
  @Field(type => [Message])
  messages: Message[];
}