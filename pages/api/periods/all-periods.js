import { periodsData } from "../../../shared/periods";

export default function handler(req, res) {
    let periods = periodsData;
    res.status(200).json({ periods });
  }