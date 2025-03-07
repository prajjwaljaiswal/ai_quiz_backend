import { Injectable } from '@nestjs/common';
import { Cat } from './cat.interface';
import { CreateCatDto } from './create-cat.dto';

@Injectable()
export class CatsService {
    private readonly cats: CreateCatDto[] = [];

    create(cat: CreateCatDto) {
        this.cats.push(cat);
    }

    findAll(): CreateCatDto[] {
        return this.cats;
    }
}