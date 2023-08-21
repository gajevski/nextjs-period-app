import { periodsData } from "../../../shared/periods";

export default function handler(req, res) {
  const { id, startDate } = req.body;
  const periodIndex = periodsData.findIndex(period => period.id === id);

  if (periodIndex !== -1) {
    periodsData[periodIndex] = {
      id,
      startDate,
    };
    res.status(200).json({ message: "Period updated successfully." });
  } else {
    res.status(404).json({ message: "Period not found." });
  }
}