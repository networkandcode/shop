import db from '../../../../utils/db';
const admin = require('firebase-admin');
import dashify from 'dashify';
import { ContactlessTwoTone } from '@material-ui/icons';

export default async (req, res) => {
  const { id, c } = req.query;  
  try {
    if (req.method === 'PUT') {
      if (req.query.o === 'edit') {
        const data = await db.collection("categories").doc(id).get().then(doc => {
          if(doc && doc.exists){
            var docData = doc.data()            
            docData.categories.map(l1 => {
              if(l1.name === c){
                l1.categories.map(l2 => {
                  if(l2.slug === req.body.slug){
                    l2.name = req.body.name;
                    l2.slug = dashify(req.body.name);
                  }
                })
              }
            })
            return docData;
          }          
        });
        data['updated'] = new Date().toISOString();   
        await db.collection("categories").doc(id).set(data); 
      } else {
        // add        
        var { categories } = req.body;
        categories.map(i => {
          i.slug = dashify(i.name);
        });
        const data = await db.collection("categories").doc(id).get().then(doc => {
            if(doc && doc.exists){
              var docData = doc.data()            
              docData.categories.map( l1 => {
                if(l1.name === c){                    
                    console.log(l1.categories);
                    l1.categories = categories;                    
                }
              })                          
              return docData;
            }
          })        
          data['updated'] = new Date().toISOString();      
          await db.collection("categories").doc(id).set(data);
      }      
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
          docData.categories.map((l1, l1Idx) => {
            if(l1.name == c){
              l1.categories.map((l2, l2Idx) => {
                if (l2.name === req.body.name) {
                  docData.categories[l1Idx].categories.splice(l2Idx, 1)              
                }
              })
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