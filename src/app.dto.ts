import { IsNumber, IsOptional } from 'class-validator';

export class OnlineSiteDto {
  @IsOptional()
  @IsNumber()
  priority?: number;
}
