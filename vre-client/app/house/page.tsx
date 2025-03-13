'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link'

import BottomFooter from "@/component/bottomFooter";
import TopHeaderSub from "@/component/topHeaderSub";
import HouseInfoRow from "@/component/houseInfoRow";
import { getHouseItemAPI, makeImageUrls } from "@/util/api";
import { HouseInfo } from "@/util/type";

export default function Home() {
    const [imageUrls, setImageURls] = useState<string[]>();
    const [houseItem, setHouseItem] = useState<HouseInfo>({
        code: '',
        city: '',
        district: '',
        ward: '',
        detail_address: '',
        property_type: '',
        apartment_name: '',
        price: -1,
        area: -1,
        room_count: -1,
        bathroom_count: -1,
        option_info: '',
        image_keys: '',
        details: ''
    });
    
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const fullAddress = 
        (houseItem.detail_address ? houseItem.detail_address + ', ' : '') + 
        (houseItem.ward ? houseItem.ward + ', ' : '') +
        (houseItem.district ? houseItem.district + ', ' : '') +
        houseItem.city;

    const handleHouseItemResult = (result: HouseInfo[] | undefined) => {
        if (result === undefined || result.length === 0) return;
        const item = result[0];
        const urls = makeImageUrls(item.image_keys);
        setHouseItem(item);
        setImageURls(urls);
    }
    const copyPhoneNumber = () => {
        navigator.clipboard.writeText('02-1234-567');
        alert('Inquiry number is copied. (02-1234-567)');
    }

    useEffect(() => {
        if (!code) return;
        getHouseItemAPI(code)
        .then((result) => handleHouseItemResult(result))
    }, [code]);

    return (
        <div>
            <TopHeaderSub/>
            <main className="mt-13 mb-19 mx-auto xl:max-w-6xl lg:max-w-4xl">
                <div className="pt-8 px-4">
                    <div className="pb-4">
                        <span className="text-[22px] font-bold">{houseItem.apartment_name}</span>
                    </div>
                    
                    <div className="pt-3 pb-6 border-gray-100 border-t-1">
                        <span className="text-lg font-bold">
                            Thông tin chi tiết
                        </span>
                        <HouseInfoRow subject={'Price'} content={houseItem.price + 'đ'}/>
                        <HouseInfoRow subject={'Property type'} content={houseItem.property_type}/>
                        <HouseInfoRow subject={'Area'} content={houseItem.area + '㎡'}/>
                        <HouseInfoRow subject={'Room count'} content={houseItem.room_count}/>
                        <HouseInfoRow subject={'Bathroom count'} content={houseItem.bathroom_count}/>
                        <HouseInfoRow subject={'Option Info'} content={houseItem.option_info}/>
                        <HouseInfoRow subject={'Details'} content={houseItem.details}/>
                    </div>

                    <div className="pt-3 pb-6 border-gray-100 border-t-1">
                        <span className="text-lg font-bold">
                            Địa chỉ
                        </span>
                        <Link href={"https://www.google.com/maps/search/" + fullAddress} target="_blank">
                            <div className="flex flex-row mt-3">
                                <div className="flex items-center min-w-[40px]">
                                    <Image
                                        src="/googlemap.png"
                                        alt="map"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="inline-block w-[35px] h-[35px]"
                                    />
                                </div>
                                <div className="flex items-center">
                                        <span className="text-sm">
                                            {fullAddress}
                                        </span>
                                </div>
                            </div>
                        </Link>  
                    </div>
                    
                    <div className="pt-3 pb-6 border-gray-100 border-t-1">
                        <span className="text-lg font-bold">
                            Photos
                        </span>
                        <div className="flex flex-wrap gap-2 mt-3 relative">
                            { imageUrls && 
                                imageUrls.map((url) => (
                                    <Image
                                        key={url}
                                        src={url}
                                        alt="image"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        className="w-full lg:w-[320px] h-auto"
                                    />                             
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
            <BottomFooter>
                <button className="w-full h-3/4 rounded-xl cursor-pointer bg-[#6b015a]" onClick={copyPhoneNumber}>
                    <span className="text-lg text-white font-medium">Contact (02-123-4567)</span>
                </button>
            </BottomFooter>
        </div>
    );
};