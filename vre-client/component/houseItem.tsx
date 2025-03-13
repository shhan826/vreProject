'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link'

import { HouseInfo } from "@/util/type";
import { makeImageUrls } from "@/util/api";

interface HouseItemProps {
    data: HouseInfo
}

export default function HouseItem (props: HouseItemProps)
{
    const {data} = props;
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        if (data.image_keys === undefined) return;
        const urls = makeImageUrls(data.image_keys);
        setImageUrls(urls);
    }, [])

    return(
        <Link href={"/house?code=" + data.code}>
            <div className="bg-white w-full xl:w-[350px] rounded-2xl shadow-[0_2px_10px_5px_rgba(0,0,0,0.05)] flex p-2">
                <div className="flex-col">
                    <div className="flex gap-2">
                        <div className="border-1 border-gray-200 rounded-lg w-[120px] h-[120px] overflow-hidden">
                            { imageUrls.length > 0 && 
                            <Image
                                key={imageUrls[0]}
                                src={imageUrls[0]}
                                alt="image"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-[150px] h-[150px]"
                            />
                            }
                        </div>

                        <div className="h-[120px] max-w-[200px] sm:max-w-[480px] md:max-w-xl lg:w-[200px] flex flex-col gap-1">
                            <div className="text-[10px] text-gray-500 truncate inline-block">
                                <Image
                                    src="/location.svg"
                                    alt="location"
                                    width={18}
                                    height={18}
                                    className="inline-block"
                                />
                                {data.ward}, {data.district}, {data.city}
                            </div>

                            <div className="font-semibold text-sm leading-4 line-clamp-2">{data.apartment_name}</div>

                            <div className="font-bold text-red-700 text-sm truncate">{data.price + 'đ'}</div>

                            <div className="text-xs truncate">
                                <Image
                                    src="/bed.svg"
                                    alt="room_count"
                                    width={18}
                                    height={18}
                                    className="inline-block"
                                />
                                &nbsp;{data.room_count}&nbsp;&nbsp;
                                <Image
                                    src="/bath.svg"
                                    alt="barhroom_count"
                                    width={18}
                                    height={18}
                                    className="inline-block"
                                />
                                &nbsp;{data.bathroom_count}&nbsp;&nbsp;
                                <Image
                                    src="/area.svg"
                                    alt="area"
                                    width={16}
                                    height={16}
                                    className="inline-block"
                                />
                                &nbsp;{data.area + '㎡'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};