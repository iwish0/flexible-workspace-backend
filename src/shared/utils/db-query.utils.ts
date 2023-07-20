export class DBQueryUtils {

    /**  this method returns an object containing conditions to check overlapped date */
    public static getSearchBookingQuery(
        checkInDateTime: Date,
        checkOutDateTime: Date
    ): Object {
        const query: Object = {};
        const datePipeArray: Object[] = [];
        datePipeArray.push({
            $and: [
                { checkInDateTime: { $gte: checkInDateTime } },
                { checkOutDateTime: { $lte: checkOutDateTime } }
            ]
        });
        datePipeArray.push({
            $and: [
                { checkOutDateTime: { $gte: checkInDateTime } },
                { checkOutDateTime: { $lte: checkOutDateTime } }
            ]
        });
        datePipeArray.push({
            $and: [
                { checkInDateTime: { $gte: checkInDateTime } },
                { checkInDateTime: { $lte: checkOutDateTime } }
            ]
        });
        datePipeArray.push({
            $and: [
                { checkInDateTime: { $lte: checkInDateTime } },
                { checkOutDateTime: { $gte: checkOutDateTime } }
            ]
        });
        query['$or'] = datePipeArray;
        return query;
    }
}