import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from './common/decorators';
import { OnlineSiteDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('online-sites')
  async getOnlineSites(
    @Request() request,
    @Query() onlineSiteDto: OnlineSiteDto,
  ): Promise<any> {
    request.setTimeout(300000); // 5 min
    return this.appService.getOnlineSites(onlineSiteDto);
  }
}
