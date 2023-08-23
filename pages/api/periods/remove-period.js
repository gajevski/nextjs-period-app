import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.body;

  try {
    const deletedPeriod = await prisma.period.delete({
      where: {
        id: id,
      },
    });

    if (deletedPeriod) {
      res.status(200).json({ message: 'Period removed successfully.' });
    } else {
      res.status(404).json({ message: 'Period not found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error removing period.', error: error.message });
  }
}
