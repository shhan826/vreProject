require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { conn } = require('./db');
const cors = require('cors');

const app = express();
// MODIFY HERE (1) <------
const port = 3001;
const preFix = '/api/v1';

app.use(cors({
    // MODIFY HERE (2) <------
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get(preFix + '/house', async (req, res) => {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        const isAll = req.query.all;
        const priceStart = req.query.pricestart;
        const priceEnd = req.query.priceend;
        const districtArray = req.query.district ? req.query.district.split('*') : [];
        const typeArray = req.query.type ? req.query.type.split('*') : [];
        const areaStart = req.query.areastart;
        const areaEnd = req.query.areaend;
        const roomStart = req.query.roomstart;
        const roomEnd = req.query.roomend;
        const searchTitle = req.query.searchtitle;

        const whereQuery = isAll === true ? ' WHERE deleted!=2' : ' WHERE deleted!=1';
        const priceStartQuery = priceStart ? ' AND price>=' + priceStart : '';
        const priceEndQuery = priceEnd ? ' AND price<=' + priceEnd : '';
        const areaStartQuery = areaStart ? ' AND area>=' + areaStart : '';
        const areaEndQuery = areaEnd ? ' AND area<=' + areaEnd : '';
        const roomStartQuery = roomStart ? ' AND room_count>=' + roomStart : '';
        const roomEndQuery = roomEnd ? ' AND room_count<=' + roomEnd : '';
        const searchTitleQuery = searchTitle ? " AND apartment_name LIKE '%" + searchTitle + "%'" : '';
        let districtQuery = '';
        if (districtArray.length === 1) {
            districtQuery = ' AND district=' + "'" + districtArray[0] + "'";
        } else {
            for (let i = 0; i < districtArray.length; i++) {
                if (i === 0) {
                    districtQuery += ' AND (district=' + "'" + districtArray[i] + "'";
                } else if (i === districtArray.length - 1) {
                    districtQuery += ' OR district=' + "'" + districtArray[i] + "'" + ')';
                } else {
                    districtQuery += ' OR district=' + "'" + districtArray[i] + "'";
                }
            }
        }
        let typeQuery = '';
        if (typeArray.length === 1) {
            typeQuery = ' AND property_type=' + "'" + typeArray[0] + "'";
        } else {
            for (let i = 0; i < typeArray.length; i++) {
                if (i === 0) {
                    typeQuery += ' AND (property_type=' + "'" + typeArray[i] + "'";
                } else if (i === typeArray.length - 1) {
                    typeQuery += ' OR property_type=' + "'" + typeArray[i] + "'" + ')';
                } else {
                    typeQuery += ' OR property_type=' + "'" + typeArray[i] + "'";
                }
            }
        }
        
        const selectQuery = 
            'SELECT * FROM property_info' + 
            whereQuery + 
            priceStartQuery + 
            priceEndQuery + 
            districtQuery + 
            typeQuery + 
            areaStartQuery + 
            areaEndQuery + 
            roomStartQuery + 
            roomEndQuery + 
            searchTitleQuery + 
            ' ORDER BY id DESC' + 
            ' LIMIT ' + limit + 
            ' OFFSET ' + offset;
        //console.log(selectQuery);

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

// TODO: 변경된 DB Column에 맞게 수정 필요
app.post(preFix + '/manager/add', async (req, res) => {
    try {
        const connection = await conn;
        const input = req.body;

        const countQuery = 'SELECT COUNT(*) FROM property_info';
        const result = await connection.query(countQuery);
        const count = Number(result[0]['COUNT(*)']);

        if (count !== Number.NaN && input) {
            const id = count + 1;
            const insertQuery = 'INSERT INTO property_info VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
                input.image_keys,
                input.details
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