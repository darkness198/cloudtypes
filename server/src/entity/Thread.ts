import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Field, Int, ObjectType } from 'type-graphql';
import { Message } from './Message';


@ObjectType()
@Entity()
export class Thread extends BaseEntity {

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

    @OneToMany(type => Message, message => message.parentThread)
    @Field(type => [Message])
    messages: Message[];
}