"use client"

import { ModeToggle } from '@/components/mode-toggle';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { useScrollTop } from '@/hooks/useScrollTop';
import { cn } from '@/lib/utils';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { useConvexAuth } from 'convex/react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
    const scrolled = useScrollTop();
    const { isAuthenticated, isLoading } = useConvexAuth();
    return <div className={cn('z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6',
    scrolled && 'border-b shadow-sm')}>
        <div className='font-bold'>Kotion</div>
        <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
            {isLoading && (
                <Spinner />
            )}
            {!isAuthenticated && !isLoading && (
                <>
                    <SignInButton mode='modal'>
                        <Button variant="ghost" size="sm">Log In</Button>
                    </SignInButton>
                    <SignInButton mode='modal'>
                        <Button size="sm">Get Kotion free</Button>
                    </SignInButton>
                </>
            )}
            {
                isAuthenticated && !isLoading && (
                    <>
                        <Button size="sm" variant="ghost" asChild>
                            <Link href="/documents">Enter Kotion</Link>
                        </Button>
                        <UserButton afterSignOutUrl='/' />
                    </>
                )
            }
            <ModeToggle />
        </div>
    </div>;
};
