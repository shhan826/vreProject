'use client'

// import { addHouseItemAPI, createHouseCode, createImageKeys, uploadFileAPI } from "@/util/api";
// import { HouseInfo } from "@/util/type";
// import { useCallback, useRef, useState } from "react";
// import Image from "next/image";

export default function Home() {
    // TODO: 관리자 페이지 로그인 구현까지 기능 막음 처리
    return <span>Still Making pages for managers...</span>;
    /*
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [apartmentName, setApartmentName] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [roomCount, setRoomCount] = useState('');
    const [bathroomCount, setBathroomCount] = useState('');
    const [optionInfo, setOptionInfo] = useState('');
    const [imageFiles, setImageFiles] = useState<FileList | undefined>();
    const [details, setDetails] = useState('');

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onCityHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setCity(event.currentTarget.value);
    };
    const onDistrictHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setDistrict(event.currentTarget.value);
    };
    const onWardHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setWard(event.currentTarget.value);
    };
    const onDetailAddressHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setDetailAddress(event.currentTarget.value);
    };
    const onPropertyTypeHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setPropertyType(event.currentTarget.value);
    };
    const onApartmentNameHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setApartmentName(event.currentTarget.value);
    };
    const onPriceHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setPrice(event.currentTarget.value);
    };
    const onAreaHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setArea(event.currentTarget.value);
    };
    const onRoomCountHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setRoomCount(event.currentTarget.value);
    };
    const onBathroomCountHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setBathroomCount(event.currentTarget.value);
    };
    const onOptionInfoHandler = (event: React.FormEvent<HTMLInputElement>) => {
        setOptionInfo(event.currentTarget.value);
    };
    const onDetailsHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(event.currentTarget.value);
    };
    const clearInputInfo = () => {
        setCity('');
        setDistrict('');
        setWard('');
        setDetailAddress('');
        setPropertyType('');
        setApartmentName('');
        setPrice('');
        setArea('');
        setRoomCount('');
        setBathroomCount('');
        setOptionInfo('');
        setImageFiles(undefined);
        setDetails('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const submitHouse = () => {
        const houseCode = createHouseCode();
        const imageKeys = imageFiles ? createImageKeys(imageFiles, houseCode) : [];
        const input: HouseInfo = {
            code: houseCode,
            city: city,
            district: district,
            ward: ward,
            detail_address: detailAddress,
            property_type: propertyType,
            apartment_name: apartmentName,
            price: price,
            area: area,
            room_count: roomCount,
            bathroom_count: bathroomCount,
            option_info: optionInfo,
            image_keys: JSON.stringify(imageKeys),
            details: details
        }
    
        addHouseItemAPI(input)
        .then((result) => {
            if (result) {
                uploadFileAPI(imageFiles, result.code)
                .then((success) => {
                    if (success) {
                        alert('성공적으로 등록되었습니다. (등록코드:' + result.code + ')');
                        clearInputInfo();
                    } else {
                        alert('알 수 없는 이유로 이미지 업로드가 실패했습니다. (등록코드:' + result.code + ')');
                    }
                });
            } else {
                alert('알 수 없는 이유로 업로드가 실패했습니다.');
            }
        });
    };

    const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
          return;
        }
        setImageFiles(e.target.files);
    };
      
    const onUploadImageButtonClick = useCallback(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.click();
    }, []);

    const imageComponents = () => {
        const result = [];
        if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
                const url = URL.createObjectURL(imageFiles[i]);
                result.push(
                    <Image
                        key={imageFiles[i].name}
                        src={url}
                        alt={imageFiles[i].name}
                        width={100}
                        height={100}
                    />
                );
            }
        }
        return result;
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center w-full min-h-dvh'>
                <h3 className='font-bold'>매물 정보 입력</h3>
                <br/>
                <form>
                    <table>
                        <tbody>
                        <tr>
                            <td>도시</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={city} onChange={onCityHandler}/></td>
                        </tr>
                        <tr>
                            <td>군/구</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={district} onChange={onDistrictHandler}/></td>
                        </tr>
                        <tr>
                            <td>동</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={ward} onChange={onWardHandler}/></td>
                        </tr>
                        <tr>
                            <td>상세주소</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={detailAddress} onChange={onDetailAddressHandler}/></td>
                        </tr>
                        <tr>
                            <td>구분(아파트/빌라/사무실 등)</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={propertyType} onChange={onPropertyTypeHandler}/></td>
                        </tr>
                        <tr>
                            <td>아파트 이름</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={apartmentName} onChange={onApartmentNameHandler}/></td>
                        </tr>
                        <tr>
                            <td>가격</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={price} onChange={onPriceHandler}/></td>
                        </tr>
                        <tr>
                            <td>면적</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={area} onChange={onAreaHandler}/></td>
                        </tr>
                        <tr>
                            <td>방 개수</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={roomCount} onChange={onRoomCountHandler}/></td>
                        </tr>
                        <tr>
                            <td>화장실 개수</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={bathroomCount} onChange={onBathroomCountHandler}/></td>
                        </tr>
                        <tr>
                            <td>옵션(풀옵션/노옵션)</td>
                            <td><input className='border-2 rounded-md w-md' type='text' value={optionInfo} onChange={onOptionInfoHandler}/></td>
                        </tr>
                        <tr>
                            <td>추가 정보</td>
                            <td><textarea className='border-2 rounded-md w-md h-20' value={details} onChange={onDetailsHandler}/></td>
                        </tr>
                        </tbody>
                    </table>
                </form>
                <br/>
                <form>
                    <div>
                        <label className="bg-stone-300 p-1 rounded-sm" htmlFor="image_uploads">이미지 업로드</label>
                        <input className="hidden" type="file" id="image_uploads" accept="image/*" multiple ref={inputRef} onChange={onUploadImage} />
                    </div>
                    <button onClick={onUploadImageButtonClick} />
                </form>
                <div className="flex flex-row">
                    { (imageFiles && imageFiles.length > 0) && imageComponents() }
                </div>
                <br/>
                <div className="flex flex-row gap-3">
                    <button className='btn btn-light' onClick={clearInputInfo}>입력값 초기화</button>
                    <button className='btn btn-primary' onClick={submitHouse}>업로드</button>
                </div>
            </div>
        </div>
    );
    */
};