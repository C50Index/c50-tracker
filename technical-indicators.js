// {name: "Two Hundred Day Moving Average", value: number, signal: "buy" | "sell" | "hold"}

// Sum up all the close prices divide by 200
function twoHundredDayMovingAverage(rows) {
  let twoHundredDaysAgo = moment().subtract(200,'days').unix();
  let lastPrice = null;

  let twoHundredDaySum = rows.reduce((acc, curr) => {
    if (!!curr['close'] && curr['time_unix'] && Number(curr['time_unix']) >  twoHundredDaysAgo) {
      lastPrice = Number(curr['close']);
      return acc + Number(curr['close']);
    } else {
      return acc;
    }
  });

  let result = twoHundredDaySum / 200;
  return {name: "Two Hundred Day Moving Average",
          value: result,
          signal:  result > lastPrice ? "buy" : "sell"}
}
