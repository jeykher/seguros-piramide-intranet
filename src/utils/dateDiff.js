import moment from 'moment';


export const DateDiff = (date, date2, diff) => {
    const dateVerified = moment(date, 'YYYY-MM-DD')
    const dateCompare = moment(date2, 'YYYY-MM-DD') 
    return dateCompare.diff(dateVerified, 'days') <= diff
}

