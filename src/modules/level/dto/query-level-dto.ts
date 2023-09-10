import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { PaginatedResponseSortEnum } from '../../../helpers/utils';
import { Level } from '../level.entity';

export class QueryLevelDto extends PartialType(Level) {
  @ApiProperty({
    default: 20,
    description: `Number of users to return`,
    required: false,
  })
  limit = 20;

  @ApiProperty({
    default: 1,
    description: `Current page of Levels`,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page = 1;

  @ApiProperty({
    default: PaginatedResponseSortEnum.DESC,
    description: `Sort order. Desc/Newest = -1, Asc/Oldest = 1`,
    enum: PaginatedResponseSortEnum,
    required: false,
  })
  @IsEnum(PaginatedResponseSortEnum)
  @IsOptional()
  @Type(() => Number)
  sort: PaginatedResponseSortEnum = PaginatedResponseSortEnum.DESC;

  @ApiProperty({
    default: 'createdAt',
    description: `Level field to sort by`,
    required: false,
  })
  sortBy = 'createdAt';

  constructor(args?: Partial<QueryLevelDto>) {
    super();
    Object.assign(this, args);
  }
}
