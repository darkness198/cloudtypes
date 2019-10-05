import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { Author } from './Author';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Post extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ 
      type: 'varchar',
      nullable: true,
      length: 200
    })
    @Field({ nullable: true })
    title: string;

    @ManyToOne(type => Author, author => author.posts)
    @Field(type => Author)
    owner: Author;
}