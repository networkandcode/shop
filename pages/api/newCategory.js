import db from '../../utils/db';
import dashify from 'dashify';

export default async(req, res) => {
    try {
        const { name, products, services } = req.body;
        const slug = dashify(name);
        const categories = await db.collection('categories').where("slug", "==", slug).get();
        const categoriesData = categories.docs.map( category => category.data());
        if (categoriesData.some(category => category.slug === slug)){
            res.status(409).end();
        } else {
            const { id } = await db.collection('categories').add({
                name: name,
                products: products.split(','),
                services: services.split(','),
                slug: slug,
                created: new Date().toISOString()
            });
            res.status(200).json({id});
        }
    } catch(e) {
        console.log(e);
        res.status(400).end;
    }
}