
import { db } from './';
import Product from '../models/Product';
import { IProduct } from '../interfaces';

export const getProductBySlug = async (slug: string): Promise<IProduct | null>  => {

    await db.connect();
    const product = await Product.findOne({slug}).lean()
    await db.disconnect();

    if(!product) {
        return null;
    }

    return JSON.parse(JSON.stringify(product));

}