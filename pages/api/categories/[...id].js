import db from '../../../utils/db';
const admin = require('firebase-admin');
import dashify from 'dashify';

export default async (req, res) => {
  const id = req.query.id[0];
  
  var c1 = '';
  try {
    c1 = req.query.id[1];
  } catch {

  }
  console.log(c1);
  try {
    if (req.method === 'PUT') {
      if('level' in req.body){   
        if(c1){

        } else {
            const data = await db.collection("categories").doc(id).get().then(doc => {
              if(doc && doc.exists){
                var docData = doc.data()            
                for (var i in docData.categories){
                  if(docData.categories[i].slug === req.body.slug){
                    console.log(docData.categories[i]);
                    docData.categories[i].name = req.body.name;
                    docData.categories[i].slug = dashify(req.body.name);
                    console.log(docData.categories[i]);
                  }
                }
                console.log(docData);
                console.log('..');
                return docData;
              }
            })
            console.log(data);
            data['updated'] = new Date().toISOString();      
            await db.collection("categories").doc(id).set(data);          
        }    
        
      } else{
        const data = await db.collection("categories").doc(id).get().then(doc => {
          if (doc && doc.exists ) {                                   
            return { ...doc.data(), ...req.body };                  
          }
        })
        data['updated'] = new Date().toISOString();      
        await db.collection("categories").doc(id).set(data);          
      }      
    } else if (req.method === 'GET') {
        console.log(id);
        const doc = await db.collection('categories').doc(id).get();
        if (!doc.exists) {
          console.log(`${id} doesn't exist`);
          res.status(404).end();
        } else {
          if(c1){
            const x = doc.data().categories.map( c => {
              if (c.slug === c1.slug) {
                return c;
              }
            })
            console.log(x);
            res.status(200).json(x);
          } else{
            res.status(200).json(doc.data());
          }          
        }
    } else if (req.method === 'DELETE') {
      if(req.body){        
        const doc = await db.collection('categories').doc(id).get();
        if (!doc.exists) {
          res.status(404).end();
        } else {
          var docData = doc.data();
          docData.categories.map((category, idx) => {
            if (category.name === req.body.name) {
              docData.categories.splice(idx, 1)              
            }
          });
          docData['updated'] = new Date().toISOString();      
          await db.collection("categories").doc(id).set(docData)
          console.log(docData)              
          res.status(200).json(docData);
        }           
      } else {
        console.log('Deleting category');
        await db.collection('categories').doc(id).delete();
      }
    }
    res.status(200).end();
  } catch (e) {    
    console.log(e);
    res.status(400).end();
  }
}