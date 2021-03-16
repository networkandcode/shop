import db from '../../../../utils/db';
const admin = require('firebase-admin');
import dashify from 'dashify';

export default async (req, res) => {
  console.log(req.query);
  const { id, c } = req.query;  
  try {
    if (req.method === 'PUT') {
      req.body = { ...req.body, ['slug']: dashify(req.body.name) };
      const data = await db.collection("categories").doc(id).get().then(doc => {
          if(doc && doc.exists){
            var docData = doc.data()            
            docData.categories.map( i => {
              if(i.name === c){               
                if('categories' in i){
                  i.categories = [...i.categories, req.body];
                } else {
                  i.categories = [ req.body ];
                }     
              }
            })                          
            return docData;
          }
        })        
        data['updated'] = new Date().toISOString();      
        await db.collection("categories").doc(id).set(data);
    } else if (req.method === 'GET') {  
      const doc = await db.collection('categories').doc(id).get();      
      var x = {};
      doc.data().categories.map( i => {
        if (i.name === c) {          
          x = i;
        }
      });     
      console.log(x);       
      res.status(200).json(x);
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
          res.status(200).json(docData);
        }           
      } else {        
        await db.collection('categories').doc(id).delete();
      }
    }
    res.status(200).end();
  } catch (e) {    
    console.log(e);
    res.status(400).end();
  }
}