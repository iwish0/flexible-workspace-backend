import { DeskBooking } from '../schemas/desk-booking.schema';

const mockBooking: DeskBooking = {
    user: {
        email: 'test@gmail.com',
        id: "1a82-454vc",
        name: 'John'
    },
    checkInDateTime: new Date(2023, 4, 30, 8),
    checkOutDateTime: new Date(2023, 4, 30, 18, 30),
    comment: 'no comment',
    deskId: '64706d7553aa76f4e68f47a8',
    dateCreated: null
}