"use client"

import Image from 'next/image';

export const Heroes: React.FC = () => {
    return <div className='__Heroes flex flex-col items-center justify-center max-w-5xl'>
        <div className='flex items-center'>
            <div className='relative w-[300px] h-[300px] sm:w-[350px]
            sm:h-[350px] md:h-[400px] md:w-[400px]'>
                <Image src="/documents.png" fill className='object-contain' alt='' />
                <Image src="/documents-dark.png" fill alt='' className='object-contain hidden dark:block' />
            </div>
        </div>
    </div>;
};
