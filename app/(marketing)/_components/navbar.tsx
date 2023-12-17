"use client"

import { ModeToggle } from '@/components/mode-toggle';
import { useScrollTop } from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
    const scrolled = useScrollTop();
    return <div className={cn('z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6',
    scrolled && 'border-b shadow-sm')}>
        <div className='font-bold'>Kotion</div>
        <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
            <ModeToggle />
        </div>
    </div>;
};
