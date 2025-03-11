'use client'

import Image from "next/image";
import Link from 'next/link'

export default function TopHeaderSub ()
{   
    const goBack = () => {
        window.history.back();
    }
    const share = () => {
        window.navigator.share({
            title: "Share",
            text: "Share house information.",
            url: window.location.href
        }).then((result) => {
            console.log(result);
        }). catch((err) => {
            console.log(err);
        })
    };
    return(
        <div className="fixed left-0 top-0 z-9 bg-white w-full shadow-[0_4px_4px_0_rgba(0,0,0,0.03)]">
            <div className="flex items-center h-13 px-3 xl:max-w-5xl lg:max-w-4xl m-auto place-content-between">
                <button onClick={goBack}>
                    <Image
                        src="/back.svg"
                        alt="back"
                        width={23}
                        height={23}
                        className="inline-block"
                    />
                </button>
                <div className="flex itmes-center gap-3">
                    <Link href="/">
                        <Image
                            src="/home.svg"
                            alt="home"
                            width={25}
                            height={25}
                            className="inline-block"
                        />
                    </Link>
                    <button onClick={share}>
                        <Image
                            src="/share.svg"
                            alt="share"
                            width={25}
                            height={25}
                            className="inline-block"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};