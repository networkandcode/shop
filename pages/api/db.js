import { password, schema, url, username } from '../../utils/dbCredentials';
import axios from 'axios';

const db = async(req, res) => {

    const { operation, record, table } = req.body;
    const headers = { 'Content-Type': 'application/json' };
    const data = JSON.stringify({
        operation,
        schema,
        table,
        "records": [ record ]
    });

    const config = {
        auth: {
            username,
            password
        },
        headers,
        method: 'post',
        url,
        data
    };

    await axios(config)
        .then(response => {
            if(response.status === 200){
                res.status(200).json({ message: response.data.message });
            /*} else{
                res.status(response.status).json({ error: response.data.message });*/
            }
        })
        .catch(error => {
            res.status(409).json({ error });
        });
}

export default db;
