import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cat.interface';
import { CreateCatDto } from './create-cat.dto';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<CreateCatDto[]> {
        return this.catsService.findAll();
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string): Promise<Cat> {
    //     return this.catsService.findOne(id);
    // }
}