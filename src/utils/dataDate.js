const handleDates = {
    formatDayMonthYear: (date) => {
        let FormateddDate = new Date(date)
        let currentDay = FormateddDate.getDate().toString();
        if(currentDay.length === 1) {
            currentDay = '0' + currentDay;
        }
        let currentMonth = (FormateddDate.getMonth() + 1).toString();
        if(currentMonth.length === 1) {
            currentMonth = '0' + currentMonth;
        }
        let currentYear = FormateddDate.getFullYear().toString();
        return `${currentDay}/${currentMonth}/${currentYear}`;
    },
    formatInitialDayMonthYear: (date) => {
        let currentDay = 1;
        currentDay = currentDay.toString();
        if(currentDay.length === 1) {
            currentDay = '0' + currentDay;
        }
        let currentMonth = (date.getMonth() + 1).toString();
        if(currentMonth.length === 1) {
            currentMonth = '0' + currentMonth;
        }
        let currentYear = date.getFullYear().toString();
        return `${currentDay}/${currentMonth}/${currentYear}`;
    }
};
export default handleDates;