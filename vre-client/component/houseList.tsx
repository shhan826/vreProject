'use client'

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import { getHouseAPI } from "@/util/api";
import { HouseInfo } from "@/util/type";
import HouseItem from "./houseItem";
import SkeletonHouseItem from "./skeletonHouseItem";

const itemLimit = 25;

export default function HouseList ()
{   
    const [items, setItems] = useState<HouseInfo[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [filterChangeFlag, setFilterChangeFlag] = useState(false);

    const elementRef = useRef(null);

    const searchParams = useSearchParams();
    const priceStartParam = searchParams.get('pricestart');
    const priceEndParam = searchParams.get('priceend');
    const districtParam = searchParams.get('district');
    const typeParam = searchParams.get('type');
    const areaStartParam = searchParams.get('areastart');
    const areaEndParam = searchParams.get('areaend');
    const roomStartParam = searchParams.get('roomstart');
    const roomEndParam = searchParams.get('roomend');
    const searchTitleParam = searchParams.get('searchtitle');

    const handleHouseResult = (result: Array<HouseInfo>) => {
        const list = result;
        if (list.length > 0) {
            setItems((prevItems) => [...prevItems, ...list]);
        } else {
            setHasMore(false);
        }
    };
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
        const firstEntry = entries[0];        
        if (firstEntry.isIntersecting && hasMore) {
            setItemOffset((itemOffset) => itemOffset + itemLimit);       
        }
    };
    // 첫 번째 렌더에서는 동작하지 않는 Hook
    const useDidMountEffect = (func: any, deps: any) => {
        const didMount = useRef(false);
      
        useEffect(() => {
          if (didMount.current) func();
          else didMount.current = true;
        }, deps);
    };
    useDidMountEffect(() => {
        setItems([]);
        setItemOffset(0);
        setFilterChangeFlag((prev)=>!prev);
    }, [priceStartParam, priceEndParam, districtParam, typeParam, areaStartParam, areaEndParam, roomStartParam, roomEndParam, searchTitleParam]);
    useEffect(() => {
        const priceStart = priceStartParam ? Number(priceStartParam) : undefined;
        const priceEnd = priceEndParam ? Number(priceEndParam) : undefined;
        const areaStart = areaStartParam ? Number(areaStartParam) : undefined;
        const areaEnd = areaEndParam ? Number(areaEndParam) : undefined;
        const roomStart = roomStartParam ? Number(roomStartParam) : undefined;
        const roomEnd = roomEndParam ? Number(roomEndParam) : undefined;
        getHouseAPI(itemLimit, itemOffset, false, priceStart, priceEnd, districtParam, typeParam, areaStart, areaEnd, roomStart, roomEnd, searchTitleParam)
        .then((result) => handleHouseResult(result))
    }, [itemOffset, filterChangeFlag]);
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection);
        if (elementRef.current) {
            observer.observe(elementRef.current);
        }
        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [hasMore]);
    
    if (items.length === 0 && hasMore === false) {
        return (
            <div className="p-8 text-center">
                <div className="text-gray-200">No itmes searched.</div>
            </div>
        );
    }
    return(
        <div className="px-2">
            <div className='grid gap-x-2 gap-y-2 grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]'>
            { (items.length > 0) ? 
                items.map((item) => (
                    <HouseItem key={item.code} data={item}/>
                )) :
                <SkeletonHouseItem/>
            }
            </div>
            <div ref={elementRef} className="h-10"></div>
        </div>
    );
};