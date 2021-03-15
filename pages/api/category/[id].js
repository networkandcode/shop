import dashify from 'dashify';
import db from '../../../utils/db';
const admin = require('firebase-admin');

export default async (req, res) => {
  const { id } = req.query;
  try {        
    if (req.method === 'PUT') {       
      req.body = { ...req.body, ['slug']: dashify(req.body.name)};  
      console.log(req.body);
      await db.collection("categories").doc(id).update({
        categories: admin.firestore.FieldValue.arrayUnion(req.body),
        updated: new Date().toISOString()
      });
      res.status(200).end();
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}