import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces/order';
import { Order, Product } from '../../../models';

type Data = 
  | { message: string }
  | IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder(req, res);
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }

}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { orderItems, total } = req.body as IOrder;

    const session: any = await getSession({ req });

    if(!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const productsIds = orderItems.map(product => product._id);

    await db.connect();
    const dbProducts = await Product.find({ _id: {$in: productsIds} });
    await db.disconnect();

    try {
        const subtotal = orderItems.reduce((prev, current) => {
            const currentPrice = dbProducts.find(prod =>prod.id === current._id)?.price;

            if(!currentPrice) {
                throw new Error('Verifique el carrito, producto inexistente');
            }

            return (current.price * current.quantity) + prev        
        }, 0);

        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const totalBackend = subtotal * (taxRate + 1);

        if(total !== totalBackend){
            throw new Error('El total no cuadra con el monto esperado');
        }

        // La informacion es correcta, grabo en BD
        const userId = session.user._id;
        const newOrder = new Order({...req.body, isPaid: false, user: userId});
        await newOrder.save();
        await db.disconnect();

        return res.status(201).json(newOrder);

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message,
        })
    }

}
