export interface HouseCode {
    code: string
}

export interface HouseInfo {
    code: string,
    city: string,
    district: string,
    ward: string,
    detail_address: string,
    property_type: string,
    apartment_name?: string,
    price: string,
    area: string,
    room_count?: string,
    bathroom_count?: string,
    option_info?: string,
    image_keys: string,
    details?: string,
    deleted: boolean
}