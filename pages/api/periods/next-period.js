import { periodsData } from "../../../shared/periods";

const moment = require("moment");

export default function handler(req, res) {
    const periods = periodsData;
    let lastPeriod = periods[periods.length - 1];

    const lastStartDate = moment(lastPeriod.startDate);
    const nextStartDate = lastStartDate.clone().add(26, "days").format("YYYY-MM-DD");

    const nextPeriod = {
        id: 1,
        startDate: nextStartDate,
        description: "Test",
    };

    res.status(200).json({ nextPeriod, lastPeriod });
  }