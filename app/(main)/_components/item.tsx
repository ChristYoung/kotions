"use client"

import { LucideIcon } from 'lucide-react';

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: string;
    label?: string;
    icon?: LucideIcon;
}

export const Item: React.FC<ItemProps> = (props: ItemProps) => {
    const { label, icon: Icon, onClick } = props;
    return <div onClick={(e) => onClick && onClick(e)} role='button' className='__item group min-h-[27px] cursor-pointer text-sm
                py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium'
                style={{paddingLeft: '12px'}}
            >
                { Icon && <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' /> }
                <span className='truncate'>
                {label}
                </span>
            </div>;
};
