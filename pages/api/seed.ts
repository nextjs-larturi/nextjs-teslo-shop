import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product, User } from '../../models';

type Data = {
  message: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  if(process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Forbidden' });
  }

  await db.connect();

  // Insert Users
  await User.deleteMany();
  await User.insertMany(seedDatabase.initialData.users);

  // Insert Products
  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);
  
  await db.disconnect();

  res.status(200).json({ 
    message: 'Proceso realizado correctamente',
  })
}
