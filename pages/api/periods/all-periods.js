export default function handler(req, res) {
    let periods = [
        { id: 0, startDate: "2023-06-10", description: "Period one" },
        { id: 1, startDate: "2023-07-15", description: "Period two" },
        { id: 2, startDate: "2023-08-21", description: "Period three" },
      ];
    res.status(200).json({ periods });
  }