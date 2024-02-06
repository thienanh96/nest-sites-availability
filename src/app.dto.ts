import { IsNumber, IsOptional } from 'class-validator';

export class SiteAvailabilityDto {
  @IsOptional()
  @IsNumber()
  priority?: number;
}
