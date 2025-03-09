'use client'

import { getHouseAPI } from "@/util/api";
import { HouseInfo } from "@/util/type";
import { useEffect, useRef, useState } from "react";
import HouseItem from "./houseItem";

const itemLimit = 5;

export default function HouseList ()
{   
    const [items, setItems] = useState<HouseInfo[]>([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const elementRef = useRef(null);

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

    useEffect(() => {
        getHouseAPI(itemLimit, itemOffset)
        .then((result) => handleHouseResult(result))
    }, [itemOffset]);
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

    return(
        <div className="px-2">
            <div className='grid gap-x-2 gap-y-2 grid-cols-[1fr] lg:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr]'>
            { items.map((item) => (
                <HouseItem key={item.code} data={item}/>
            ))}
            </div>
            <div ref={elementRef} className="h-10"></div>
        </div>
    );
};