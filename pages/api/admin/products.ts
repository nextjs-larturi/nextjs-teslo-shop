import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidObjectId } from 'mongoose';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

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

    const updatedProducts = products.map( product => {
        product.images = product.images.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}/products/${ image }`
        });

        return product;
    })

    res.status(200).json(updatedProducts);
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

        product.images.forEach( async(image) => {
            if ( !images.includes(image) ){
                // Borrar de cloudinary
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
                await cloudinary.uploader.destroy( fileId );
            }
        });

        await product.update( req.body );
        await db.disconnect();
        
        return res.status(200).json( product );
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

