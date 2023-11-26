import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsNotZero } from '../../../../decorators/IsNotZero';
import { ApiProperty } from '@nestjs/swagger';
class Word {
  @IsArray()
  @IsNotEmpty()
  readonly start: number[];
  @IsNumber()
  @IsInt()
  @IsNotZero()
  @ApiProperty()
  length: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  type: string;
  @IsArray()
  @IsNotEmpty()
  occupied_by: string[];
}

export class CreateLevelDto {
  @IsNumber()
  @IsInt()
  @IsNotZero()
  @ApiProperty()
  readonly width: number;
  @IsNumber()
  @IsInt()
  @IsNotZero()
  @ApiProperty()
  readonly height: number;
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [Word] })
  readonly words: Word[];
}

export class CreateLevelsDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [CreateLevelDto] })
  structures: CreateLevelDto[];
}
