import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNotIn,
  IsNumber,
  IsString,
} from 'class-validator';
import { IsNotZero } from '../../../decorators/IsNotZero';
import { ApiProperty } from '@nestjs/swagger';

class Letter {
  @IsNumber()
  @IsInt()
  @ApiProperty()
  readonly x: number;
  @IsNumber()
  @IsInt()
  @ApiProperty()
  readonly y: number;
  @IsString()
  @IsNotEmpty()
  @IsNotIn([' ', '\n'])
  @ApiProperty()
  readonly letter: string;
}

class Word {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly word: string;
  @IsArray()
  @ApiProperty({ type: [Letter] })
  readonly letters: Letter[];
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
