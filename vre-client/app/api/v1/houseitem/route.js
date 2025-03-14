import { conn } from'../db';
 
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const houseCode = searchParams.get('code')

  const selectQuery = 'SELECT * FROM property_info WHERE code="' + houseCode +'"';

  const connection = await conn;
  const result = await connection.query(selectQuery);
 
  return new Response(JSON.stringify(result[0]));
}