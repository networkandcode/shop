import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const categories = await db.collection('categories').get();
    const categoriesData = categories.docs.map(category => category.data());

    if (categoriesData.some(category => category.slug === slug)) {      
      res.status(409).end();
    } else {
      const { id } = await db.collection('categories').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}