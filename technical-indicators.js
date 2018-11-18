function twoHundredDayMovingAverage(rows) {
  let twoHundredDaysAgo = moment().subtract(200,'days').unix();

  return rows.reduce((acc, curr) => {
    return acc + (Number(curr['time_unix'] >= twoHundredDaysAgo)) ? Number(curr['close']) : 0
  } , 0) / 200;
}
