import db from '../../../utils/db';
const admin = require('firebase-admin');

export default async (req, res) => {
  const { id } = req.query;

  try {
    
    if (req.method === 'PUT') {
      await db.collection("categories").doc(id).update({
        categories: admin.firestore.FieldValue.arrayUnion(req.body),
        updated: new Date().toISOString()
      });
    } else if (req.method === 'GET') {      
      const doc = await db.collection('categories').doc(id).get();      
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json({ categoriesData });

        res.status(200).json(doc.data());
      }
    } else if (req.method === 'DELETE') {
      await db.collection("categories").doc(id).update({
        categories: admin.firestore.FieldValue.arrayRemove(req.body),
        updated: new Date().toISOString()
      });      
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}