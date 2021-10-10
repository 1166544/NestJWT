import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/DecoratorRoles';
import { RolesGuard } from '../../common/guards/GuardRoles';
import { ParseIntPipe } from '../../common/pipes/PipeParseInt';
import { CatsService } from './CatsService';
import { CreateCatDto } from './dto/DtoCreateCat';
import { Cat } from './interfaces/ICat';

@UseGuards(RolesGuard)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createCatDto: CreateCatDto): Promise<any> {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe())
    id: number,
  ): any {
    // get by ID logic
  }
}
