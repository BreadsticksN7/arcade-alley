// Helper file for creating a Unix Timestamp
// Converts from miliseconds to seconds for API

// Creates timestamp based on day or prior to current date
// Enter 0 for current date();

// function createTimestamp(date, days) {
//   date.setDate(date.getDate() - days);
//     let res = Date.parse(date);
//     return Math.floor(res / 1000);
// };

// function createNextTimestamp(date, days) {
//   date.setDate(date.getDate() + days);
//     let res = Date.parse(date);
//     return Math.floor(res / 1000);
// };

// createTimeStamp(new Date(), 'add'/'sub', days)
// Creates a new date time stamp, passes a string to determine
// how it should operate plus the number of days to add or remove
function createTimeStamp(date, add, days) {
  const addSubs = add;
  try {
    if (addSubs === 'add') {
      date.setDate(date.getDate() + days);
      let res = Date.parse(date);
      return Math.floor(res / 1000);
    } 
    else {
      date.setDate(date.getDate() - days);
      let res = Date.parse(date);
      return Math.floor(res / 1000);
    }
  } catch (err) {
    return err;
  }
};

module.exports = { createTimeStamp };