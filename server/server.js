require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { conn } = require('./db');
const cors = require('cors');

const app = express();
const port = 3001;
const preFix = '/api/v1';

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get(preFix + '/house', async (req, res) => {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const selectQuery = 'SELECT * FROM property_info ORDER BY id*1 DESC' + ' LIMIT ' + limit + ' OFFSET ' + offset;
        
        const connection = await conn;
        const result = await connection.query(selectQuery);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);
    }
});

app.get(preFix + '/houseitem', async (req, res) => {
    try {
        const houseCode = req.query.code;
        const selectQuery = 'SELECT * FROM property_info WHERE code="' + houseCode +'"';

        const connection = await conn;
        const result = await connection.query(selectQuery);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);   
    }
});

app.post(preFix + '/manager/add', async (req, res) => {
    try {
        const connection = await conn;
        const input = req.body;

        const countQuery = 'SELECT COUNT(*) FROM property_info';
        const result = await connection.query(countQuery);
        const count = Number(result[0]['COUNT(*)']);

        if (count !== Number.NaN && input) {
            const id = count + 1;
            const insertQuery = 'INSERT INTO property_info VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const params = [
                id, 
                input.code, 
                input.city, 
                input.district, 
                input.ward, 
                input.detail_address, 
                input.property_type, 
                input.apartment_name, 
                input.price, 
                input.area, 
                input.room_count, 
                input.bathroom_count, 
                input.option_info,
                input.image_keys
            ];
            await connection.query(insertQuery, params);
            res.status(200).send({code: input.code});
        } else {
            res.status(500).send(`Input value is not correct.`);
        }
    } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});