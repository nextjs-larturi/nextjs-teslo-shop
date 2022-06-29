
import { db } from './';
import Product from '../models/Product';
import { IProduct } from '../interfaces';

interface ProductSlug {
    slug: string;
}

export const getProductBySlug = async (slug: string): Promise<IProduct | null>  => {

    await db.connect();
    const product = await Product.findOne({slug}).lean()
    await db.disconnect();

    if(!product) {
        return null;
    }

    return JSON.parse(JSON.stringify(product));
}

export const getAllProductSlugs = async (): Promise<ProductSlug[]> => {
    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();

    console.log(slugs);
    await db.disconnect();

    return slugs;
}

export const getProductsByTerms = async (term: string): Promise<IProduct[]> => {
    term = term.toString().toLocaleLowerCase();

    await db.connect();

    const products = await Product.find({
        $text: { $search: term }
    }).select('title images price inStock slug -_id').lean();

    await db.disconnect();

    return products;

}