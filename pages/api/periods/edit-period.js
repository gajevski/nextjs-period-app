import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id, startDate } = req.body;

  try {
    const updatedPeriod = await prisma.period.update({
      where: {
        id: id,
      },
      data: {
        startDate: startDate,
      },
    });

    if (updatedPeriod) {
      res.status(200).json({ message: 'Period updated successfully.' });
    } else {
      res.status(404).json({ message: 'Period not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating period.', error: error.message });
  }
}
