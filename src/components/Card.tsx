import type { ReactNode } from "react";

interface CArdProp {
    children: ReactNode,
    tittle?: string;
    subtittle?: string;
    icon?: ReactNode;
    hover?: boolean;
    glowEffect?: boolean;
    className?: string;
}

const Card = ({children, className = "", glowEffect = false, hover = false, icon,subtittle,tittle}: CArdProp) => {


    return (
        <div className={` bg-gray-900 cursor-pointer rounded-xl border border-gray-700 shadow-md p-6 transition-all
        ${hover ? "hover: border-primary-500 hover: shadow-lg hover:-translate-y-0.5" : ""}
        ${glowEffect ? "glow" : ""}
        ${className}`}>
            {(tittle || icon) && (
                <div className="flex items-center space-x-3 mb-4">
                    {icon && (
                        <div className="p-2 bg-primary-500/10 rounded-xl flex items-center justify-center">
                            {icon}
                        </div>)}
                </div>
            )}

            {(tittle || subtittle) && (
                <div>
                    {tittle && <h3 className="text-lg font-medium">{tittle}</h3>}
                    {subtittle && <p className="text-sm text-gray-400">{subtittle}</p>}
                </div>
            )}
            {children}
        </div>
    )
};

export default Card;