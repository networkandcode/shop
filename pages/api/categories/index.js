import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const categories = await db.collection('categories').orderBy('created').get();
    const categoriesData = categories.docs.map(category => ({
      id: category.id,
      ...category.data()
    }));    
    res.status(200).json({ categoriesData });
  } catch (e) {
    res.status(400).end();
  }
}