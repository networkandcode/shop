import axios from 'axios';

const db = async(req, res) => {
    const username = process.env.HDB_USERNAME;
    const password = process.env.HDB_PASSWORD;

    const url = process.env.NEXT_PUBLIC_HDB_URL;
    const schema = process.env.NEXT_PUBLIC_HDB_SCHEMA;

    const { operation, record, table } = req.body;
    const headers = { 'Content-Type': 'application/json' };

    var dataObject = {
        operation,
        schema,
        table
    };

    if(operation === 'delete'){
        dataObject = { ...dataObject, hash_values: [ record.id ] }
    } else{
        dataObject = { ...dataObject, records: [ record ] }
    }

    const data = JSON.stringify(dataObject);

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
            }
        })
        .catch(error => {
            res.status(409).json({ error });
        });
}

export default db;
