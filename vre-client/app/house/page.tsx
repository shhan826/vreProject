'use client'

import BottomFooter from "@/component/bottomFooter";
import TopHeaderSub from "@/component/topHeaderSub";
import { getHouseItemAPI, makeImageUrls } from "@/util/api";
import { HouseInfo } from "@/util/type";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link'
import HouseInfoRow from "@/component/houseInfoRow";

export default function Home() {
    const [houseItem, setHouseItem] = useState<HouseInfo>({
        code: '',
        city: '',
        district: '',
        ward: '',
        detail_address: '',
        property_type: '',
        apartment_name: '',
        price: '',
        area: '',
        room_count: '',
        bathroom_count: '',
        option_info: '',
        image_keys: ''
    });
    const [imageUrls, setImageURls] = useState<string[]>();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');
    const fullAddress = houseItem.city+', '+houseItem.district+', '+houseItem.ward+', '+houseItem.detail_address;

    const handleHouseItemResult = (result: HouseInfo[] | undefined) => {
        if (result === undefined || result.length === 0) return;
        const item = result[0];
        const urls = makeImageUrls(item.image_keys);
        setHouseItem(item);
        setImageURls(urls);
    }
    const copyPhoneNumber = () => {
        navigator.clipboard.writeText('02-1234-567');
        alert('부동산 전화번호가 복사되었습니다. 해당 부동산으로 문의해주세요. (02-1234-567)');
    }

    useEffect(() => {
        getHouseItemAPI(code)
        .then((result) => handleHouseItemResult(result))
    }, [code]);

    return (
        <div>
            <TopHeaderSub/>
            <main className="mt-13 mb-19 mx-auto xl:max-w-5xl lg:max-w-4xl">
                <div className="pt-8 px-4">
                    <div className="pb-4">
                        <span className="text-2xl font-bold">{houseItem.apartment_name}</span>
                    </div>
                    <div className="pt-3 pb-6 border-gray-100 border-t-1">
                        <span className="text-lg font-bold">
                            내부 정보
                        </span>
                        <HouseInfoRow subject={'유형'} content={houseItem.property_type}/>
                        <HouseInfoRow subject={'면적'} content={houseItem.area}/>
                        <HouseInfoRow subject={'방 개수'} content={houseItem.room_count}/>
                        <HouseInfoRow subject={'화장실 개수'} content={houseItem.bathroom_count}/>
                        <HouseInfoRow subject={'옵션 정보'} content={houseItem.option_info}/>
                    </div>
                    <div className="pt-3 pb-6 border-gray-100 border-t-1">
                        <span className="text-lg font-bold">
                            주소
                        </span>
                        <div className="flex items-start mt-3">

                            <Link href={"https://www.google.com/maps/search/" + fullAddress}>
                                <Image
                                    src="/googlemap.png"
                                    alt="map"
                                    width={35}
                                    height={35}
                                    className="inline-block"
                                />
                                <span className="pt-1">
                                    {fullAddress}
                                </span>
                            </Link>  
                        </div>
                    </div>
                    <div className="pt-3 pb-6 border-gray-100 border-t-1">
                        <span className="text-lg font-bold">
                            사진
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
                                        className="w-full lg:w-[325px] h-auto"
                                    />                             
                                ))
                            }
                        </div>
                    </div>
                </div>
            </main>
            <BottomFooter>
                <button className="btn btn-primary w-full h-3/4" onClick={copyPhoneNumber}>
                    <span className="text-lg font-medium">방 문의 (02-123-4567)</span>
                </button>
            </BottomFooter>
        </div>
    );
};