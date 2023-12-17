"use client"

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const Heading: React.FC = () => {
    return <div className='__Heading max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:test-6xl font-bold'>
            Your Ideas, Documents, and Plans, Unified. Welcome to <span className='underline'>Kotion</span>
        </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
            Kotion is the connected workspace where <br /> better, faster work happens.
        </h3>
        <Button>Enter Kotion <ArrowRight className='h-4 w-4 ml-2' /></Button>
    </div>;
};
