import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import Product from '../../../models/Product';

type Data = 
 | { message: string }
 | IProduct[]
 | IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res);

        case 'PUT':
            return updateProduct(req, res);

        case 'POST':
            return createProduct(req, res);
    
        default:
            res.status(400).json({ message: 'Bad Request' });
    }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();

    await db.disconnect();

    res.status(200).json(products);
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id = '', images = [] } = req.body as IProduct;

    if(!isValidObjectId(_id)) {
        return res.status(400).json({ message: 'El id del producto no es valido' })
    }

    if(images.length < 2) {
        return res.status(400).json({ message: 'Es necesario al menos dos imagenes' })
    }

    try {
        await db.connect();

        const product = await Product.findById(_id);

        if(!product) {
            await db.disconnect();
            return res.status(400).json({ message: `No existe un producto con el id ${_id}` })
        }

        await product.update(req.body);
        await db.disconnect();

        return res.status(200).json(product);
    } catch (error) {
        await db.disconnect();
        return res.status(500).json({ message: 'Revisar logs' })
    }
    
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images = [] } = req.body as IProduct;

    if(images.length < 2) {
        return res.status(400).json({ message: 'Es necesario al menos dos imagenes' })
    }

    try {
        await db.connect();

        const chechProductExists = await Product.findOne({ slug: req.body.slug });

        if(chechProductExists) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya esxiste un producto con ese slug' })
        }

        const product = new Product(req.body);
        await product.save();
        await db.disconnect();

        return res.status(201).json(product);
    } catch (error) {
        await db.disconnect();
        return res.status(500).json({ message: 'Revisar logs' })
    }

}

