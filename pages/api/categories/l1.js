import db from '../../../utils/db';
const admin = require('firebase-admin');

export default async (req, res) => {
  try {
    const { name, parentCategoryId } = req.body;
    console.log(req.body);
    if (req.method === 'PUT') {
      await db.collection("categories").doc(parentCategoryId).update({
        categoriesl1: admin.firestore.FieldValue.arrayUnion({ name: name }),
        updated: new Date().toISOString()
      });
      res.status(200).end();
    } 
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}