interface HouseInfoRowProps {
    subject: string,
    content: string | undefined
}

export default function HouseInfoRow (props: HouseInfoRowProps)
{
    return(
        <div className="flex items-start mt-3 text-sm">
            <span className="w-1/5 min-w-25 text-gray-400">
                {props.subject}
            </span>
            <div className="flex-[1_1] whitespace-pre-wrap">
                {props.content}
            </div>
        </div>
    );
};