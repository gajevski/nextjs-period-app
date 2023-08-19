const moment = require("moment");

export default function handler(req, res) {
    let lastPeriod = { id: 0, startDate: "2023-06-10", description: "Period one" };

    const lastStartDate = moment(lastPeriod.startDate);
    const nextStartDate = lastStartDate.clone().add(26, "days").format("YYYY-MM-DD");

    const nextPeriod = {
        id: 1,
        startDate: nextStartDate,
        description: "Test",
    };

    res.status(200).json({ nextPeriod, lastPeriod });
  }