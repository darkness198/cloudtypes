import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Hippo } from './entity/Hippo';
import { connect } from './config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hippoTest')
  async getHippos(): Promise<Array<Hippo>> {
    const connection = await connect();
    const hippoRepo = connection.getRepository(Hippo);


    // Count records
    // const count = await hippoRepo.count();

    // // Get all 
    const allHippos = await hippoRepo.find();
    return allHippos;
  }
  
  @Post('addHippo')
  async createHippos(@Body() createHippo: Partial<Hippo>): Promise<any>/*Promise<Partial<Hippo>>*/ {
    try {

    
      console.log(createHippo)
      const connection = await connect();

      const repo = connection.getRepository(Hippo);

      const newHippo = new Hippo();
      newHippo.name = createHippo.name;
      newHippo.weight = createHippo.weight;


      const savedHippo = await repo.save(newHippo);

      return(savedHippo)
    }
    catch(err) {
      return err
    }
  }
}
