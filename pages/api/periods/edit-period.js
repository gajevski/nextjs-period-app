const periods = [
    { id: 0, startDate: "2023-06-10", description: "Period one" },
    { id: 1, startDate: "2023-07-15", description: "Period two" },
    { id: 2, startDate: "2023-08-21", description: "Period three" },
];

export default function handler(req, res) {
    if (req.method === 'PUT') {
      const periodId = req.body.id;
      const periodIndex = periods.findIndex((period) => period.id === periodId);
  
      if (periodIndex === -1) {
        return res.status(404).json({ message: 'Period not found' });
      }
  
      periods[periodIndex] = req.body;
      res.status(200).json({ periods });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
