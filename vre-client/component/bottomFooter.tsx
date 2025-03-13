import { ReactNode } from "react";

interface BottomFooterProps {
    children: ReactNode
}

export default function BottomFooter (props: BottomFooterProps)
{
    return(
        <div className="fixed left-0 bottom-0 z-9 bg-white w-screen border-gray-100 border-t-1">
            <div className="flex items-center h-19 px-3 xl:max-w-6xl lg:max-w-4xl max-w-[720px] m-auto">
                { props.children }
            </div>
        </div>
    );
};