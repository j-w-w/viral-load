import moment from "moment";

export function getCurrentUnixMs() {
    const now = moment();
    const formatted = now.format('x').toString();
    const numbered = parseFloat(formatted);

    return numbered;
}

export function getHoursBetweenDates(start, end){
    let startHours = moment(start, 'YYYY-MM-DD-HH')
    let endHours = moment(end, 'YYYY-MM-DD-HH')
    let duration = moment.duration(endHours.diff(startHours));

    return duration.asHours();
}

export function getDateKey(startDate, hoursAfter){
    let startTime = moment(startDate, 'YYYY-MM-HH');
    let dateKey = parseFloat(startTime.add(hoursAfter, 'hours').format('x'));

    return dateKey;
}