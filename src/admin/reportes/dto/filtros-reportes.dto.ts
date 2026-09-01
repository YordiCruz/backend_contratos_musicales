import { IsOptional, IsDateString } from 'class-validator';

export class FiltrosReportesDto {

  @IsOptional()
  @IsDateString()
  inicio?: string;

  @IsOptional()
  @IsDateString()
  fin?: string;
}