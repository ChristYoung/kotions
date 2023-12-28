"use client"

import Image from 'next/image';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

const DocumentsPage: React.FC = () => {
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const createPromise = create({
            title: 'New Note',
        });
        toast.promise(createPromise, {
            loading: 'Creating...',
            success: 'New Note created!',
            error: 'Error creating note.',
            duration: 2000
        });
    };

    return <div className='__documents_page h-full flex flex-col items-center justify-center
     space-y-4'>
        <Image src="/empty.png" alt='' height='300' width='300' className='dark:hidden' />
        <Image src="/empty.png" alt='' height='300' width='300' className='hidden dark:block' />
        <h2 className='text-lg font-medium'>Welcome to {user?.firstName}&apos;s Kotion</h2>
        <Button onClick={onCreate}>
            <PlusCircleIcon className='h-4 w-4 mr-2'/> Create a note
        </Button>
    </div>;
};

export default DocumentsPage;
