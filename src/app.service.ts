import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { OnlineSiteDto } from './app.dto';
import axios from 'axios';
import { DataLayerService } from './dataLayer.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => DataLayerService))
    private readonly dataLayerService: DataLayerService,
  ) {}

  /**
   * Get url of online sites
   *
   * @param priority Filter by priority
   * @returns List of online site urls as an array of string
   */
  async getOnlineSites({ priority }: OnlineSiteDto) {
    const urls = await Promise.all(
      this.dataLayerService.getSites({ priority }).map(async ({ url }) => {
        try {
          await axios.get(url);
          return url;
        } catch (error) {
          return null;
        }
      }),
    );

    return urls.filter(Boolean);
  }
}
