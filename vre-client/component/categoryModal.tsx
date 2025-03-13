'use client'

import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import { districtFullArray, typeFullArray } from '@/util/constant';
import { ScopePair } from '@/util/type';

interface CategoryModalProps {
    isModalOpen: boolean,
    onToggleModal: () => void,
    priceFilter: ScopePair,
    districtFilter: Array<string>,
    typeFilter: Array<string>,
    areaFilter: ScopePair,
    roomFilter: ScopePair,
    applyFilter: (
        price: ScopePair, 
        district: Array<string>, 
        type: Array<string>, 
        area: ScopePair, 
        room: ScopePair
    ) => void
}

export default function CategoryModal (props: CategoryModalProps)
{
    const { 
        isModalOpen, 
        onToggleModal, 
        priceFilter, 
        districtFilter, 
        typeFilter, 
        applyFilter,
        areaFilter,
        roomFilter
    } = props;

    let selectDistrictArray: Array<boolean> = [];
    for (let i = 0; i < districtFullArray.length; i++) {
        const isSelect = districtFilter.indexOf(districtFullArray[i]) === -1 ? false : true;
        selectDistrictArray.push(isSelect);
    }
    let selectTypeArray: Array<boolean>  = [];
    for (let i = 0; i < typeFullArray.length; i++) {
        const isSelect = typeFilter.indexOf(typeFullArray[i]) === -1 ? false : true;
        selectTypeArray.push(isSelect);
    }
    const [priceStart, setPriceStart] = useState<string>('');
    const [priceEnd, setPriceEnd] = useState<string>('');
    const [areaStart, setAreaStart] = useState<string>('');
    const [areaEnd, setAreaEnd] = useState<string>('');
    const [roomStart, setRoomStart] = useState<string>('');
    const [roomEnd, setRoomEnd] = useState<string>('');
    const [districtSelectArray, setDistrictSelectArray] = useState<boolean[]>([]);
    const [typeSelectArray, setTypeSelectArray] = useState<boolean[]>([]);

    const modalRef = useRef(null);
    const backgroundRef = useRef(null);

    const unSelectedStyle = 'py-1 px-4 mr-2 mb-2 text-sm bg-gray-200 border-1 border-gray-200 rounded-full cursor-pointer';
    const selectedStyle = 'py-1 px-4 mr-2 mb-2 text-sm text-[#6b015a] bg-[#6b015a]/10 border-1 border-[#6b015a] rounded-full cursor-pointer';

    useEffect(() => {
        setPriceStart(props.priceFilter.start?.toString() || '');
        setPriceEnd(props.priceFilter.end?.toString() || '');
        setAreaStart(props.areaFilter.start?.toString() || '');
        setAreaEnd(props.areaFilter.end?.toString() || '');
        setRoomStart(props.roomFilter.start?.toString() || '');
        setRoomEnd(props.roomFilter.end?.toString() || '');
        setDistrictSelectArray(selectDistrictArray);
        setTypeSelectArray(selectTypeArray);
    }, [props]);

    const onPriceStartHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceStart(e.target.value);
    }
    const onPriceEndHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPriceEnd(e.target.value);
    }
    const onAreaStartHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaStart(e.target.value);
    }
    const onAreaEndHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaEnd(e.target.value);
    }
    const onRoomStartHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomStart(e.target.value);
    }
    const onRoomEndHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomEnd(e.target.value);
    }
    const toggleDistrict = (index: number) => {
        let result = districtSelectArray.slice();
        result[index] = !result[index];
        setDistrictSelectArray(result);
    }
    const toggleType = (index: number) => {
        let result = typeSelectArray.slice();
        result[index] = !result[index];
        setTypeSelectArray(result);
    }

    const onReset = () => {
        onToggleModal();

        setPriceStart('');
        setPriceEnd('');
        setDistrictSelectArray([false, false, false]);
        setTypeSelectArray([false, false, false]);
        setAreaStart('');
        setAreaEnd('');
        setRoomStart('');
        setRoomEnd('');

        applyFilter(
            {start: undefined, end: undefined},
            [],
            [],
            {start: undefined, end: undefined},
            {start: undefined, end: undefined}
        );
    };
    const onApply = () => {
        onToggleModal();

        const priceStartNum = (priceStart === '') ? undefined : Number(priceStart);
        const priceEndNum = (priceEnd === '') ? undefined : Number(priceEnd);
        let district: Array<string> = [];
        for (let i = 0; i < districtFullArray.length; i++) {
            if (districtSelectArray[i] === true) district.push(districtFullArray[i]);
        }
        let type: Array<string> = [];
        for (let i = 0; i < typeFullArray.length; i++) {
            if (typeSelectArray[i] === true) type.push(typeFullArray[i]);
        }
        const areaStartNum = (areaStart === '') ? undefined : Number(areaStart);
        const areaEndNum = (areaEnd === '') ? undefined : Number(areaEnd);
        const roomStartNum = (roomStart === '') ? undefined : Number(roomStart);
        const roomEndNum = (roomEnd === '') ? undefined : Number(roomEnd);
        applyFilter(
            {start: priceStartNum, end: priceEndNum},
            district,
            type,
            {start: areaStartNum, end: areaEndNum},
            {start: roomStartNum, end: roomEndNum}
        );
    };

    return(
        <>
            <CSSTransition nodeRef={backgroundRef} in={isModalOpen} timeout={500} mountOnEnter unmountOnExit classNames="fade">
                <div ref={backgroundRef} className="fixed top-0 w-full h-full bg-black opacity-50" onClick={onApply}/>
            </CSSTransition>
            <CSSTransition nodeRef={modalRef} in={isModalOpen} timeout={500} mountOnEnter unmountOnExit classNames="trans-modal">
                <div ref={modalRef} className='fixed top-[20%] left-1/2 -translate-x-1/2 h-[80%] w-full bg-white rounded-t-xl lg:max-w-3xl'>
                    <div>
                        <div className="m-5 fixed top-0 right-0 my-5"> 
                            <button className="rounded-full bg-gray-400 text-white cursor-pointer py-1 px-3 mr-2 text-sm" onClick={onReset}>Reset</button>
                            <button className="rounded-full bg-[#6b015a] text-white cursor-pointer py-1 px-3 text-sm" onClick={onApply}>Apply</button>
                        </div>
                        <div className="mt-15 h-full w-full fixed overflow-y-scroll">
                            <div className="mx-5 mb-15">
                                <div className="pt-3 pb-5 border-gray-100 border-b-1 flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Price (đ)
                                    </span>
                                    <div className="flex items-center">
                                        <input className="p-1 mt-2 w-[47%] text-base bg-gray-100 rounded-sm text-center" type="number" value={priceStart} onChange={onPriceStartHandler}/>
                                        <span className="mt-2 w-[6%] text-center text-gray-500">~</span>
                                        <input className="p-1 mt-2 w-[47%] text-base bg-gray-100 rounded-sm text-center" type="number" value={priceEnd} onChange={onPriceEndHandler}/>
                                    </div>
                                </div>

                                <div className="pt-3 pb-5 border-gray-100 border-b-1 flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        District
                                    </span>
                                    <div className="flex items-center">
                                        <div className="flex-auto mt-2">
                                            <button className={districtSelectArray[0] ? selectedStyle : unSelectedStyle} onClick={() => toggleDistrict(0)}>
                                                {districtFullArray[0]}
                                            </button>
                                            <button className={districtSelectArray[1] ? selectedStyle : unSelectedStyle} onClick={() => toggleDistrict(1)}>
                                                {districtFullArray[1]}
                                            </button>
                                            <button className={districtSelectArray[2] ? selectedStyle : unSelectedStyle} onClick={() => toggleDistrict(2)}>
                                                {districtFullArray[2]}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 pb-5 border-gray-100 border-b-1 flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Type
                                    </span>
                                    <div className="flex items-center">
                                        <div className="flex-auto mt-2">
                                            <button className={typeSelectArray[0] ? selectedStyle : unSelectedStyle} onClick={() => toggleType(0)}>
                                                {typeFullArray[0]}
                                            </button>
                                            <button className={typeSelectArray[1] ? selectedStyle : unSelectedStyle} onClick={() => toggleType(1)}>
                                                {typeFullArray[1]}
                                            </button>
                                            <button className={typeSelectArray[2] ? selectedStyle : unSelectedStyle} onClick={() => toggleType(2)}>
                                                {typeFullArray[2]}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 pb-5 border-gray-100 border-b-1 flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Area (㎡)
                                    </span>
                                    <div className="flex items-center">
                                        <input className="p-1 mt-2 w-[47%] text-base bg-gray-100 rounded-sm text-center" type="number" value={areaStart} onChange={onAreaStartHandler}/>
                                        <span className="mt-2 w-[6%] text-center text-gray-500">~</span>
                                        <input className="p-1 mt-2 w-[47%] text-base bg-gray-100 rounded-sm text-center" type="number" value={areaEnd} onChange={onAreaEndHandler}/>
                                    </div>
                                </div>

                                <div className="pt-3 pb-5 border-gray-100 border-b-1 flex flex-col">
                                    <span className="text-gray-400 text-sm">
                                        Room Count
                                    </span>
                                    <div className="flex items-center">
                                        <input className="p-1 mt-2 w-[47%] text-base bg-gray-100 rounded-sm text-center" type="number" value={roomStart} onChange={onRoomStartHandler}/>
                                        <span className="mt-2 w-[6%] text-center text-gray-500">~</span>
                                        <input className="p-1 mt-2 w-[47%] text-base bg-gray-100 rounded-sm text-center" type="number" value={roomEnd} onChange={onRoomEndHandler}/>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};