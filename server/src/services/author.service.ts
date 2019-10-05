import { Injectable } from '@nestjs/common';
import { Author } from '../entity/Author'
import { Entity, Repository, getRepository, getConnectionManager, Connection } from 'typeorm';
import { ConnectionService } from './connection.service';
import { connect } from '../config';

@Injectable()
export class AuthorService {
  // private readonly cats: Cat[] = [];
  private authorRepository: Repository<Author> = null;

  constructor(private connectionService: ConnectionService) {
    // console.log('SINT',this.connectionService.getSqlManagerInstance)
    

    
  }

  public setRepo = async () => {

    return new Promise((resolve, reject) => {
      // while(!this.connectionService.isConnected) {
        this.connectionService.getSqlManagerInstance.then(async (connection: Connection) => {
          this.connectionService.isConnected = true;
          this.authorRepository = connection.getRepository(Author)
        }).catch(err => {
          console.log('connectionErr', err)
        }) 
      // }
    })
    
    
  }
  
  getRepo = async (): Promise<void> => {
    if(!this.authorRepository) {
      const connection = await connect();
      this.authorRepository = connection.getRepository(Author);
    }
  }

  // create(cat: Cat) {
  //   this.cats.push(cat);
  // }

  // findAll(): Cat[] {
  //   return this.cats;
  // }

  async findAll(): Promise<Author[]> {
    await this.getRepo();
    const all = await this.authorRepository.createQueryBuilder('author').getMany()
    console.log(all)
    return all;
    // return this.authorRepository.createQueryBuilder();
  }

  async create(firstName: string): Promise<Author> {
    await this.getRepo()
    const newAuthor = this.authorRepository.create({
      firstName: firstName
    });
    return this.authorRepository.save(newAuthor);
  }

  // getRepository = ()

  // findById(id: number): Promise<Author> {
  //   return this.authorRepository.createQueryBuilder()
  //     .where("user.name = :name", { name: "Timber" })
  //     .getOne();
  //   // return this.authorRepository.createQueryBuilder();
  // }
  
}

// import {getRepository, Repository} from "typeorm";

// const user = await getRepository(User)
//     .createQueryBuilder("user")
//     .where("user.id = :id", { id: 1 })
//     .getOne();