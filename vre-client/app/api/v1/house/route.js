import { conn } from'../db';
 
export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset')
    const isAll = searchParams.get('all')
    const priceStart = searchParams.get('pricestart')
    const priceEnd = searchParams.get('priceend')
    const districtArray = searchParams.get('district') ? searchParams.get('district').split('*') : [];
    const typeArray = searchParams.get('type') ? searchParams.get('type').split('*') : [];
    const areaStart = searchParams.get('areastart')
    const areaEnd = searchParams.get('areaend')
    const roomStart = searchParams.get('roomstart')
    const roomEnd = searchParams.get('roomend')
    const searchTitle = searchParams.get('searchtitle')

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
    // console.log(selectQuery);

    const connection = await conn;
    const result = await connection.query(selectQuery);
    
    return new Response(JSON.stringify(result));
}