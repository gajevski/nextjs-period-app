import { periodsData } from "../../../shared/periods";

export default function handler(req, res) {
  const { id } = req.body;

  const periodIndex = periodsData.findIndex(period => period.id === id);

  if (periodIndex !== -1) {
    periodsData.splice(periodIndex, 1);
    res.status(200).json({ message: "Period removed successfully." });
  } else {
    res.status(404).json({ message: "Period not found." });
  }
}
