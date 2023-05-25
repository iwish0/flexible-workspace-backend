import { Controller, Get, Post, Body } from '@nestjs/common';
import { Booking } from 'src/shared/schemas/booking.schema';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {

    constructor(private readonly booksService: BookingsService) { }

    @Get()
    public findAll(): Promise<Booking[]> {
        return this.booksService.findAll();
    }

    @Post('/criteria')
    public findByCriteria(@Body() criteria: { startDate: string, endDate: string }) {
        return this.booksService.findByCriteria(criteria.startDate, criteria.endDate)
    }

    @Post()
    public create(@Body() booking: Booking): Promise<Booking> {
        return this.booksService.create(booking);
    }
}
