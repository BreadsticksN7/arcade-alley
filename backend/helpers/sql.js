const { BadRequestError } = require('../middleware/expressError');

//Helper for making selective update queries
// dataToUpdate {Object} {field1: newVal1, field2: newVal}
// jsToSql {Object} maps data fields to database column names
// returns {Object} {sqlSetCols, dataToUpdate}
// Code provided by Colt Steele

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");
  // { firstname: "Test", age: "50" } => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) => 
    `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
};

module.exports = {
  sqlForPartialUpdate
};