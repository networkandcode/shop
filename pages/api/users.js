import db from '../../utils/db';

export default async (req, res) => {
  if(req.method === 'POST'){
    try {
      const user = req.body;
      return await db
        .collection('users')
        .doc(user.uid)
        .set(user)
        .then(() => {
          res.status(200).end();
        })
        .catch((error) => {
          res.status(400).end();
      });
    } catch (error) {
      res.status(400).end();
    }
  }
}