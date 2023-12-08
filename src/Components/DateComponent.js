import React from 'react';

// Today's date
const today = new Date();
const todayDate = today.toISOString().slice(0, 10);

// Last week date
const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);
const lastWeekDate = lastWeek.toISOString().slice(0, 10);

// Last month date
const lastMonthDay = new Date();
lastMonthDay.setDate(today.getDate() - 30);
const lastMonthDate = lastMonthDay.toISOString().slice(0, 10);

class DateComponent extends React.Component {
  render() {
    return (
      <div>
        <p>Today's date is: {todayDate}</p>
        <p>Last week's date for the same day is: {lastWeekDate}</p>
        <p>Last Month's date for the same day is: {lastMonthDate}</p>
      </div>
    );
  }
}

export { DateComponent, todayDate, lastWeekDate, lastMonthDate};
