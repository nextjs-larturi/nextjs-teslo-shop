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
        case 'DELETE':
            return deleteOrder(req, res);
    
        default:
            return res.status(400).json({ message: 'Bad request' });
    }

}

const deleteOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const session: any = await getSession({ req });
    const { id } = req.query;

    if(!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        await db.connect();
        const orderDelete = await Order.findById(id);

        if(orderDelete) {
            if (orderDelete?.user?.toString() === session.user._id) {
                orderDelete.delete();
            } else {
                await db.disconnect();
                return res.status(401).json({ message: 'Unauthorized' });
            }
        }
        
        await db.disconnect();
        return res.status(201).json({ message: 'ok'});

    } catch (error: any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message,
        })
    }

}
