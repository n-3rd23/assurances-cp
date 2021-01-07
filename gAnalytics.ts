const { google } = require("googleapis");


  const client_email = process.env.NEXT_PUBLIC_G_CLIENT_EMAIL;
  const private_key = process.env.NEXT_PUBLIC_G_PRIVATE_KEY.replace(
    new RegExp("\\\\n"),
    "\n"
  );
  const private_key_id = process.env.NEXT_PUBLIC_G_PRIVATE_KEY_ID;
  const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];

  const analytics = google.analytics("v3");
  //   view id here
  const jwt = new google.auth.JWT({
    email: client_email,
    key: private_key,
    scopes,
  });

  async function getMatric(metric, startDate, endDate) {
    await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
      Math.trunc(1000 * Math.random())
    ); // 3sec
    const result = await analytics.data.ga.get({
      auth: jwt,
      ids: `ga:${private_key_id}`,
      "start-date": startDate,
      "end-date": endDate,
      metrics: metric,
    });
    const res = {};
    res[metric] = {
      value: parseInt(result.data.totalsForAllResults[metric], 10),
      start: startDate,
      end: endDate,
    };
    return res;
  }

  function parseMetric(metric) {
    let cleanMetric = metric;
    if (!cleanMetric.startsWith("ga:")) {
      cleanMetric = `ga:${cleanMetric}`;
    }
    return cleanMetric;
  }

  function getData(
    metrics = ["ga:users"],
    startDate = "30daysAgo",
    endDate = "today"
  ) {
    const results = [];
    for (let i = 0; i < metrics.length; i += i) {
      const metric = parseMetric(metrics[i]);
      results.push(getMatric(metric, startDate, endDate));
    }
  } 
  module.exports = {getData}
  // return results;


export default getData;
