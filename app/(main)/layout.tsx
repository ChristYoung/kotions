"use client";

import { Spinner } from '@/components/spinner';
import { useConvexAuth } from 'convex/react';
import { redirect } from 'next/navigation';
import Navigation from './_components/navigation';

export interface MainLayOutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayOutProps> = (props: MainLayOutProps) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return <div className='h-full flex items-center justify-center'>
            <Spinner size="lg"></Spinner>
        </div>;
    }
    if (!isAuthenticated) {
        return redirect('/');
    }
    return <div className='__layout h-full flex dark:bg-[#1f1f1f]'>
        <Navigation></Navigation>
        <main className='flex-1 h-full overflow-y-auto'>
            {props.children}
        </main>
    </div>;
};

export default MainLayout;
