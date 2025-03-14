export default function SkeletonHouseMain ()
{
    return(
        <main className="mt-13 mb-19 mx-auto xl:max-w-6xl lg:max-w-4xl">
            <div className="pt-8 px-4">
                <div className="pb-4">
                    <div className="text-[22px] rounded bg-gray-200 w-[250px] animate-pulse">&nbsp;</div>
                </div>
                <div className="pt-3 pb-6 border-gray-100 border-t-1">
                    <span className="text-lg font-bold">Thông tin chi tiết</span>
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Price</span>
                        <div className="rounded bg-gray-200 w-[150px] animate-pulse">&nbsp;</div>
                    </div>       
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Property type</span>
                        <div className="rounded bg-gray-200 w-[150px] animate-pulse">&nbsp;</div>
                    </div>    
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Area</span>
                        <div className="rounded bg-gray-200 w-[100px] animate-pulse">&nbsp;</div>
                    </div>
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Floors</span>
                        <div className="rounded bg-gray-200 w-[100px] animate-pulse">&nbsp;</div>
                    </div>
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Room count</span>
                        <div className="rounded bg-gray-200 w-[100px] animate-pulse">&nbsp;</div>
                    </div>
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Bathroom</span>
                        <div className="rounded bg-gray-200 w-[100px] animate-pulse">&nbsp;</div>
                    </div>
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Option Info</span>
                        <div className="rounded bg-gray-200 w-[180px] animate-pulse">&nbsp;</div>
                    </div>
                    <div className="flex items-start mt-3 text-sm">
                        <span className="w-1/5 min-w-25 text-gray-400">Datails</span>
                        <div className="rounded bg-gray-200 w-[150px] animate-pulse">&nbsp;</div>
                    </div>
                </div>
                <div className="pt-3 pb-6 border-gray-100 border-t-1">
                    <span className="text-lg font-bold">Địa chỉ</span>
                    <div className="flex flex-row mt-3">
                        <div className="flex items-center">
                            <div className="text-sm rounded bg-gray-200 w-[250px] animate-pulse">&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div className="pt-3 pb-6 border-gray-100 border-t-1">
                    <span className="text-lg font-bold">Photos</span>
                    <div className="flex flex-wrap gap-2 mt-3 relative">
                        <div className="bg-gray-200 w-full lg:w-[320px] h-[320px] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};