import { Injectable } from '@nestjs/common';
import { Author } from '../entity/Author'
import { Repository } from 'typeorm';
import { connect } from '../config';
import * as admin from 'firebase-admin';
import { UserService } from '../services/user.service';


@Injectable()
export class AuthorService {
  private authorRepository: Repository<Author> = null;

  constructor(private userService: UserService) {
  }
  
  public getRepo = async (): Promise<void> => {
    if(!this.authorRepository) {
      const connection = await connect();
      this.authorRepository = connection.getRepository(Author);
    }
  }

  async findAll(): Promise<Author[]> {
    await this.getRepo();
    const all = await this.authorRepository.createQueryBuilder('author').getMany()
    console.log(all)
    return all;
  }

  async create(newUser: admin.auth.UserRecord): Promise<Author> {
    await this.getRepo()
    const customToken = await this.userService.adminInstance.auth().createCustomToken(newUser.uid)

    const newAuthor = this.authorRepository.create({
      email: newUser.email,
      displayName: newUser.displayName,
      password: newUser.passwordHash,
      refreshToken: customToken
    });
    return this.authorRepository.save(newAuthor);
  }

}
