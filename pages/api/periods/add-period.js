const periods = [
    { id: 0, startDate: "2023-06-10", description: "Period one" },
    { id: 1, startDate: "2023-07-15", description: "Period two" },
    { id: 2, startDate: "2023-08-21", description: "Period three" },
];

function generateRandomId() {
    return Math.floor(Math.random() * 1000);
}

export default function handler(req, res) {
    if (req.method === 'POST') {
        const periodData = req.body;
        periodData.id = generateRandomId();
        periods.push(periodData);
        res.status(200).json({ periods });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
