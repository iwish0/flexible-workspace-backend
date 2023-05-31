import { Body, Controller, Get, Post } from '@nestjs/common';
import { Desk } from 'src/shared/schemas/desk.schema';
import { DesksService } from './desks.service';

@Controller('desks')
export class DesksController {

    constructor(private readonly desksService: DesksService) { }

    @Get()
    public findAll(): Promise<Desk[]> {
        return this.desksService.findAll().catch((error) => error);
    }

    @Post()
    public create(@Body() desk: Desk): Promise<Desk> {
        return this.desksService.create(desk).catch((error) => error);
    }
} 
