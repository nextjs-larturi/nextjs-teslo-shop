import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';
import { db } from '../../../database';

type Data = 
 | { message: string }
 | IProduct


export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProductBySlug(req, res);

        default:
            return res.status(405).json({ message: 'Method not allowed' });
    }
}

const getProductBySlug = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { slug } = req.query;

    await db.connect();
    const product = await Product.findOne({slug})
                                  .select('title images price inStock slug -_id')
                                  .lean();

    await db.disconnect();

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
}
