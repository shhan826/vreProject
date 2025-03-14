import { serverOrigin, serverPrefix } from "./constant";
import { HouseCode, HouseInfo } from "./type";
import AWS from "aws-sdk"
import { customAlphabet } from "nanoid";

export async function getHouseAPI(
        limit: number, 
        offset: number, 
        all: boolean, 
        pricestart?: number | null, 
        priceend?: number | null,
        district?: string | null,
        type?: string | null,
        areastart?: number | null,
        areaend?: number | null,
        roomstart?: number | null,
        roomend?: number | null,
        searchTitle?: string | null
    ): Promise<Array<HouseInfo>> {
    const pricestartParam = pricestart ? '&pricestart=' + pricestart : '';
    const priceendParam = priceend ? '&priceend=' + priceend : '';
    const districtParam = district ? '&district=' + district : '';
    const typeParam = type ? '&type=' + type : '';
    const areastartParam = areastart ? '&areastart=' + areastart : '';
    const areaendParam = areaend ? '&areaend=' + areaend : '';
    const roomstartParam = roomstart ? '&roomstart=' + roomstart : '';
    const roomendParam = roomend ? '&roomend=' + roomend : '';
    const searchTitleParam = searchTitle ? '&searchtitle=' + searchTitle : '';

    const url = serverOrigin 
        + serverPrefix 
        + "/house" 
        + "?limit=" + limit 
        + "&offset=" + offset 
        + "&all=" + all
        + pricestartParam 
        + priceendParam
        + districtParam
        + typeParam
        + areastartParam
        + areaendParam
        + roomstartParam
        + roomendParam
        + searchTitleParam;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        return response.json();
    }
    return [];
};

export async function getHouseItemAPI(code: string): Promise<undefined | HouseInfo> {
    const url = serverOrigin + serverPrefix + "/houseitem" + "?code=" + code ;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (response.ok) {
        return response.json();
    }
    return undefined;
};

export async function addHouseItemAPI(input: HouseInfo): Promise<HouseCode | undefined> {
    const url = serverOrigin + serverPrefix + "/manager/add";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input)
    });
    if (response.ok) {
        return response.json();
    }
    return undefined;
}

export async function uploadFileAPI(files: FileList | undefined, name: string): Promise<boolean> {
    if (!files) return false;

    AWS.config.update({
        region: process.env.NEXT_PUBLIC_AWS_REGION,
        accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET,
    });

    let success = true;
    for (let i = 0; i < files.length; i++) {
        const fileFormat = files[i].name.split('.').reverse()[0];
        const upload = new AWS.S3.ManagedUpload({
            params: {
              Bucket: 'vre-image-resource',
              Key: name + '-' + (i + 1),
              Body: files[i],
              ContentType: files[i].type,
            },
        });
        upload.promise().then(
            () => { console.log('Image upload complete.'); }, 
            () => { success = false; }
        );
    }

    return success;
}

export function createImageKeys(files: FileList, name: string,): string[] {
    let resultArray = [];
    for (let i = 0; i < files.length; i++) {
        const resultImageKey = name + '-' + (i + 1);
        resultArray.push(resultImageKey);
    }
    return resultArray;
}

export function createHouseCode(): string {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); ;

    const nanoid1 = customAlphabet("0123456789", 2);
    const nanoid2 = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWYZ", 4);
    
    return year + month + '-' + nanoid1() + nanoid2();
}

export function makeImageUrls(imageKeys: string): string[]{
    let result: string[] = [];

    try {
        const keyArray = JSON.parse(imageKeys);
        if (!keyArray) return result;

        for (let i = 0; i < keyArray.length; i++) {
            const url = 'https://vre-image-resource.s3.ap-southeast-2.amazonaws.com/' + keyArray[i];
            result.push(url);
        }
    } catch(e) {
        console.log(e);
        return result;
    };
    return result;
}