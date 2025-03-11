import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenerativeService } from './generative.service';

@Controller('generative')
export class GenerativeController {
    constructor(private readonly generativeService: GenerativeService) {}
    @Post('generate')
    generate(@Body() body: any) {
        console.log(body)
        return this.generativeService.generateQuestions(body);
    }
}
