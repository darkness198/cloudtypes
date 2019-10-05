import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Thread } from './Thread';
import { Author } from './Author';

@ObjectType()
@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column({ 
      type: 'varchar',
      nullable: true,
      length: 200
    })
    @Field({ nullable: true })
    content: string;

    @ManyToOne(type => Thread, thread => thread.messages)
    @Field(type => Thread)
    parentThread: Thread;

    @ManyToOne(type => Author, author => author.messages)
    @Field(type => Author)
    author: Author;
}