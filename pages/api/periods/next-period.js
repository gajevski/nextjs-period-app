import prisma from '../../../lib/prisma';
import moment from 'moment';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const periods = await prisma.period.findMany();
    const lastPeriod = periods[periods.length - 1];

    const lastStartDate = moment(lastPeriod.startDate);
    const nextStartDate = lastStartDate.clone().add(26, 'days').format('YYYY-MM-DD');

    const nextPeriod = {
      id: 0,
      startDate: nextStartDate,
    };

    res.status(200).json({ nextPeriod, lastPeriod });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching periods.', error: error.message });
  }
}
