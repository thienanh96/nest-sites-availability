import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DataLayerService } from './dataLayer.service';

describe('AppService', () => {
  let dataLayerService: DataLayerService;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, DataLayerService],
    }).compile();

    appService = app.get<AppService>(AppService);
    dataLayerService = app.get<DataLayerService>(DataLayerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSites = [
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

  it('Should return online sites', async () => {
    const mockGetSites = jest
      .spyOn(dataLayerService, 'getSites')
      .mockImplementation(() => mockSites);

    expect(await appService.getOnlineSites({ priority: undefined })).toEqual([
      'https://gitlab.com',
      'https://github.com',
      'http://app.scnt.me',
    ]);

    expect(mockGetSites).toHaveBeenCalledWith({ priority: undefined });
  });

  it('Should return online sites and filtered by priority', async () => {
    const mockGetSites = jest
      .spyOn(dataLayerService, 'getSites')
      .mockImplementation(() => mockSites);

    expect(await appService.getOnlineSites({ priority: 3 })).toEqual([
      'https://gitlab.com',
      'https://github.com',
      'http://app.scnt.me',
    ]);

    expect(mockGetSites).toHaveBeenCalledWith({ priority: 3 });
  });
});
