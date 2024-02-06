import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { SiteAvailabilityDto } from './app.dto';
import axios from 'axios';
import { DataLayerService } from './dataLayer.service';

@Injectable()
export class AppService {
  constructor(
    @Inject(forwardRef(() => DataLayerService))
    private readonly dataLayerService: DataLayerService,
  ) {}

  /**
   * Get the availability (online/offline) of sites
   *
   * @param priority Filter by priority
   * @returns List of online site urls as an array of string
   */
  async getSitesAvailability({ priority }: SiteAvailabilityDto) {
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
