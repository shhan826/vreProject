'use client'

import { useEffect, useState } from "react";
import { Roboto_Condensed } from 'next/font/google'
import Image from "next/image";
import { redirect, useSearchParams } from "next/navigation";

import CategoryModal from "./categoryModal";
import { ScopePair } from "@/util/type";

const RobotoFont = Roboto_Condensed({
    preload: false,
    weight: ["800"]
});

export default function TopHeaderMain ()
{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [priceFilter, setPriceFilter] = useState<ScopePair>({start: undefined, end: undefined});
    const [areaFilter, setAreaFilter] = useState<ScopePair>({start: undefined, end: undefined});
    const [roomFilter, setRoomFilter] = useState<ScopePair>({start: undefined, end: undefined});
    const [districtFilter, setDistrictFilter] = useState<string[]>([]);
    const [typeFilter, setTypeFilter] = useState<string[]>([]);
    const [searchTitle, setSearhTitle] = useState('');

    const isNoFilter = 
        (priceFilter.start === undefined && priceFilter.end === undefined) && 
        (areaFilter.start === undefined && areaFilter.end === undefined) && 
        (roomFilter.start === undefined && roomFilter.end === undefined) && 
        (districtFilter.length === 0) &&
        (typeFilter.length === 0);

    const searchParams = useSearchParams();
    const priceStartParam = searchParams.get('pricestart');
    const priceEndParam = searchParams.get('priceend');
    const areaStartParam = searchParams.get('areastart');
    const areaEndParam = searchParams.get('areaend');
    const roomStartParam = searchParams.get('roomstart');
    const roomEndParam = searchParams.get('roomend');
    const districtParam = searchParams.get('district');
    const typeParam = searchParams.get('type');
    const searchTitleParam = searchParams.get('searchtitle');

    useEffect(() => {
        if (priceStartParam || priceEndParam) {
            const start = priceStartParam ? Number(priceStartParam) : undefined;
            const end = priceEndParam ? Number(priceEndParam) : undefined;
            setPriceFilter({start: start, end: end});
        }   
    }, [priceStartParam, priceEndParam]);
    useEffect(() => {
        if (areaStartParam || areaEndParam) {
            const start = areaStartParam ? Number(areaStartParam) : undefined;
            const end = areaEndParam ? Number(areaEndParam) : undefined;
            setAreaFilter({start: start, end: end});
        }   
    }, [areaStartParam, areaEndParam]);
    useEffect(() => {
        if (roomStartParam || roomEndParam) {
            const start = roomStartParam ? Number(roomStartParam) : undefined;
            const end = roomEndParam ? Number(roomEndParam) : undefined;
            setRoomFilter({start: start, end: end});
        }   
    }, [roomStartParam, roomEndParam]);
    useEffect(() => {
        if (districtParam) {
            setDistrictFilter(districtParam.split("+"));
        }
    }, [districtParam])
    useEffect(() => {
        if (typeParam) {
            setTypeFilter(typeParam.split("+"));
        }
    }, [typeParam])

    const onDropdown = () => {
        onToggleModal();
    };
    const onToggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    const onSearchTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearhTitle(e.target.value);
    }
    const onSearch = () => {
        applyFilter(priceFilter, districtFilter, typeFilter, areaFilter, roomFilter, searchTitle);
    };
    const onSearchClear = () => {
        setSearhTitle('');
        applyFilter(priceFilter, districtFilter, typeFilter, areaFilter, roomFilter);
    };
    const onEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key == 'Enter') {
            onSearch();
        }
    }
    const applyFilter = (
        price: ScopePair, 
        district: Array<string>, 
        type: Array<string>, 
        area: ScopePair, 
        room: ScopePair,
        searchTitle?: string
    ) => {
        setPriceFilter(price);
        setDistrictFilter(district);
        setTypeFilter(type);
        setAreaFilter(area);
        setRoomFilter(room);

        const all = '?all=' + true;
        const searchTitleParam = (searchTitle && searchTitle !== '') ? '&searchtitle=' + searchTitle : '';
        const priceStartParam = price.start ? '&pricestart=' + price.start : '';
        const priceEndParam = price.end ? '&priceend=' + price.end : '';
        const areaStartParam = area.start ? '&areastart=' + area.start : '';
        const areaEndParam = area.end ? '&areaend=' + area.end : '';
        const roomStartParam = room.start ? '&roomstart=' + room.start : '';
        const roomEndParam = room.end ? '&roomend=' + room.end : '';

        let districtArrayString = '';
        for (let i = 0; i < district.length; i++) {
            districtArrayString = districtArrayString + district[i];
            if (i !== district.length - 1) {
                districtArrayString += '*';
            }
        }
        const districtParam = district.length > 0 ? '&district=' + districtArrayString : '';

        let typeArrayString = '';
        for (let i = 0; i < type.length; i++) {
            typeArrayString = typeArrayString + type[i];
            if (i !== type.length - 1) {
                typeArrayString += '*';
            }
        }
        const typeParam = type.length > 0 ? '&type=' + typeArrayString : '';

        const targetUrl = 
            '/' + 
            all + 
            searchTitleParam +
            priceStartParam + 
            priceEndParam + 
            areaStartParam + 
            areaEndParam + 
            roomStartParam + 
            roomEndParam + 
            districtParam + 
            typeParam;

        redirect(targetUrl);
    };

    return(
        <div className="fixed left-0 top-0 z-9 bg-white w-full">
            <div className="flex justify-between items-center h-13 px-3 xl:max-w-6xl lg:max-w-4xl m-auto">
                <div className={`text-[27px] text-[#6b015a] font-bold cursor-pointer ${RobotoFont.className}`}>Thuelaco</div>

                <div>
                    <input className="mx-2 py-1 px-3 text-sm border-1 border-gray-200 rounded-xl" type="text" value={searchTitle} onChange={onSearchTitleHandler} onKeyDown={onEnter}/>
                    <button className="cursor-pointer" onClick={onSearch}>
                        <Image
                                src="/search.svg"
                                alt="search"
                                width={20}
                                height={20}
                                className="inline-block"
                        />
                    </button>
                </div>
            </div>

            <div className="flex shrink-0 items-center my-2 px-3 xl:max-w-6xl lg:max-w-4xl m-auto overflow-x-scroll whitespace-nowrap">
                <button className="py-1 px-4 mr-2 text-sm bg-gray-200 rounded-full cursor-pointer" onClick={onDropdown}>
                    filter
                    &nbsp;
                    <Image
                        src="/downarrow.svg"
                        alt="dropdown"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="inline-block w-[8px] h-[8px]"
                    />
                </button>
                { isNoFilter && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onDropdown}>
                        all
                    </button>
                }
                { (priceFilter.start !== undefined || priceFilter.end !== undefined) && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onDropdown}>
                        price: {priceFilter.start && priceFilter.start + 'đ'}~{priceFilter.end && priceFilter.end + 'đ'}
                    </button>
                }
                { districtParam && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onDropdown}>
                        district: {districtParam.replaceAll("*", ", ")}
                    </button>
                }
                { typeParam && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onDropdown}>
                        type: {typeParam.replaceAll("*", ", ")}
                    </button>
                }

                { (areaFilter.start !== undefined || areaFilter.end !== undefined) && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onDropdown}>
                        area: {areaFilter.start && areaFilter.start + '㎡'}~{areaFilter.end && areaFilter.end + '㎡'}
                    </button>
                }
                { (roomFilter.start !== undefined || roomFilter.end !== undefined) && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onDropdown}>
                        room: {roomFilter.start && roomFilter.start}~{roomFilter.end && roomFilter.end}
                    </button>
                }
                { (searchTitleParam && searchTitleParam !== '') && 
                    <button className="mr-2 py-1 px-3 text-sm text-[#6b015a] bg-[#6b015a]/10 rounded-full cursor-pointer" onClick={onSearchClear}>
                        search: {searchTitleParam}
                    </button>
                }
            </div>

            <CategoryModal 
                isModalOpen={isModalOpen} 
                onToggleModal={onToggleModal} 
                priceFilter={priceFilter} 
                districtFilter={districtFilter} 
                typeFilter={typeFilter} 
                areaFilter={areaFilter}
                roomFilter={roomFilter}
                applyFilter={applyFilter}
            />
        </div>
    );
};