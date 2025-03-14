export interface HouseCode {
    code: string
};

export interface HouseInfo {
    code: string,
    city: string,
    district: string,
    ward: string,
    detail_address: string,
    property_type: string,
    apartment_name?: string,
    price?: number,
    area?: number,
    number_floors?: number,
    room_count?: number,
    bathroom_count?: number,
    option_info?: string,
    image_keys: string,
    details?: string,
};

export interface ScopePair {
    start: number | undefined,
    end: number | undefined
};