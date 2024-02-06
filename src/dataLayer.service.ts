import { Injectable } from '@nestjs/common';

@Injectable()
export class DataLayerService {
  readonly sites = [
    {
      url: 'https://does-not-work.perfume.new',
      priority: 1,
    },
    {
      url: 'https://gitlab.com',
      priority: 4,
    },
    {
      url: 'https://github.com',
      priority: 4,
    },
    {
      url: 'https://doesnt-work.github.com',
      priority: 4,
    },
    {
      url: 'http://app.scnt.me',
      priority: 3,
    },
    {
      url: 'https://offline.scentronix.com',
      priority: 2,
    },
  ];

  getSites({ priority }: { priority: number }) {
    return this.sites
      .sort((a, b) => a.priority - b.priority)
      .filter((site) => (priority ? site.priority === priority : true));
  }
}
