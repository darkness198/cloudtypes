import { Injectable } from '@nestjs/common';
import { Author } from '../entity/Author'
import { Entity, Repository, getRepository, getConnectionManager, Connection } from 'typeorm';
// import { ConnectionService } from './connection.service';
import { connect } from '../config';
import { Message } from 'src/entity/Message';
import { Thread } from 'src/entity/Thread';
import { ifcFeedLine } from 'src/interfaces/FeedLine';

@Injectable()
export class ChannelService {
  // private readonly cats: Cat[] = [];
  private messageRepository: Repository<Message> = null;
  private threadRepository: Repository<Thread> = null;

  constructor() {

    
  }

  getRepo = async (): Promise<void> => {
    if(!this.messageRepository && !this.threadRepository) {
      const connection = await connect();
      this.messageRepository = connection.getRepository(Message)
      this.threadRepository = connection.getRepository(Thread);
    }
  }



  async findAll(): Promise<ifcFeedLine[]> {
    await this.getRepo();
    // const all = await this.messageRepository.createQueryBuilder('author').getMany()
    const allMessages = this.messageRepository.createQueryBuilder('message').getMany()
    const allThreads = this.messageRepository.createQueryBuilder('thread').getMany()
    
    
    return allMessages;
    // return this.authorRepository.createQueryBuilder();
  }

  // async create(firstName: string): Promise<Author> {
  //   await this.getRepo()
  //   const newAuthor = this.authorRepository.create({
  //     firstName: firstName
  //   });
  //   return this.authorRepository.save(newAuthor);
  // }


  
}
