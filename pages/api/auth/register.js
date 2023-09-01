import prisma from '../../../lib/prisma';

function generateRandomId() {
  return Math.floor(Math.random() * 1000);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://nextjs-period-app.vercel.app/')
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, password } = req.body;
  const newUserId = generateRandomId();

  try {
    const newUser = await prisma.user.create({
      data: {
        id: newUserId,
        name,
        password
      },
    });
    res.status(201).json({ message: 'User added successfully.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error adding user.', error: error.message });
  }
}