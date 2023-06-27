import { DesksService } from '../shared/services/desk/desks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Desk } from 'src/shared/schemas/desk.schema';

@Controller('desks')
export class DesksController {

    constructor(private readonly desksService: DesksService) { }

    @Get()
    public findAll(): Promise<Desk[]> {
        return this.desksService.findAll();
    }

    @Post()
    public create(@Body() desk: Desk): Promise<Desk> {
        return this.desksService.create(desk);
    }
} 
