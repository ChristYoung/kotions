"use client"

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { useConvexAuth } from 'convex/react';
import { ArrowRight } from 'lucide-react';
import { SignInButton } from '@clerk/clerk-react';
import Link from 'next/link';

export const Heading: React.FC = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    return <div className='__Heading max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:test-6xl font-bold'>
            Your Ideas, Documents, and Plans, Unified. Welcome to <span className='underline'>Kotion</span>
        </h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>
            Kotion is the connected workspace where <br /> better, faster work happens.
        </h3>
        { isLoading && (
            <div className='w-full flex items-center justify-center text-center'>
                <Spinner size='lg' />
            </div>
        ) }
        { isAuthenticated && !isLoading && (
            <Button asChild>
                <Link href="/documents">
                    Enter Kotion <ArrowRight className='h-4 w-4 ml-2' />
                </Link>
            </Button>
        )}
        { !isAuthenticated && !isLoading && (
            <SignInButton mode='modal'>
                <Button>
                    Get Kotion free <ArrowRight className='h-4 w-4 ml-2'></ArrowRight>
                </Button>
            </SignInButton>
        )}
    </div>;
};
