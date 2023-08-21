import { periodsData } from "../../../shared/periods";

function generateRandomId() {
    return Math.floor(Math.random() * 1000);
}

export default function handler(req, res) {
  const { startDate } = req.body;

  const newPeriodId = generateRandomId();

  const newPeriod = {
    id: newPeriodId,
    startDate,
  };

  periodsData.push(newPeriod);

  res.status(201).json({ message: "Period added successfully.", period: newPeriod });
}
