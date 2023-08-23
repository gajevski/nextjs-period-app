import prisma from '../../../lib/prisma';

function generateRandomId() {
  return Math.floor(Math.random() * 1000);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { startDate } = req.body;
  const newPeriodId = generateRandomId();

  try {
    const newPeriod = await prisma.period.create({
      data: {
        id: newPeriodId,
        startDate,
      },
    });
    res.status(201).json({ message: 'Period added successfully.', period: newPeriod });
  } catch (error) {
    res.status(500).json({ message: 'Error adding period.', error: error.message });
  }
}