import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const periods = await prisma.period.findMany();

    res.status(200).json({ periods });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching periods.', error: error.message });
  }
}
