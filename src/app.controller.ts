import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from './common/decorators';
import { SiteAvailabilityDto } from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sites-availability')
  async getSitesAvailability(
    @Request() request,
    @Query() siteAvailabilityDto: SiteAvailabilityDto,
  ): Promise<any> {
    request.setTimeout(300000); // 5 min
    return this.appService.getSitesAvailability(siteAvailabilityDto);
  }
}
