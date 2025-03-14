export default function SkeletonHouseItem ()
{
    return(
            <div className="bg-white w-full xl:w-[350px] rounded-2xl shadow-[0_2px_10px_5px_rgba(0,0,0,0.05)] flex p-2 animate-pulse">
                <div className="flex-col">
                    <div className="flex gap-2">
                        <div className="border-1 border-gray-200 rounded-lg w-[120px] h-[120px] overflow-hidden">
                            <div className="h-[150px] w-[150px] bg-gray-200"></div>
                        </div>
                        <div className="h-[120px] max-w-[200px] sm:max-w-[480px] md:max-w-xl lg:w-[200px] flex flex-col gap-1">
                            <div className="text-[10px] rounded bg-gray-200 w-[100px]">&nbsp;</div>
                            <div className="text-sm leading-4 rounded bg-gray-200 w-[200px]">&nbsp;</div>
                            <div className="text-sm rounded bg-gray-200 w-[100px]">&nbsp;</div>
                            <div className="text-xs rounded bg-gray-200 w-[200px]">&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
    );
};