"use client";

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import { Spinner } from '@/components/spinner';

export const TrashBox: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState('');
    const filterDocuments = documents?.filter((doc) => doc.title.toLowerCase()
    .includes(search.toLowerCase()));

    const onClick = (docId: string) => {
        router.push(`/documents/${docId}`);
    }

    const onRestore = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, docId: Id<'documents'>) => {
        e.stopPropagation();
        const promise = restore({ id: docId });
        toast.promise(promise, {
            loading: 'Restoring document...',
            success: 'Document restored!',
            error: 'Failed to restore document!',
            duration: 2000,
        });
    }

    const onRemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, docId: Id<'documents'>) => {
        const promise = remove({ id: docId });
        toast.promise(promise, {
            loading: 'Deleting document...',
            success: 'Document deleted!',
            error: 'Failed to delete document!',
            duration: 2000,
        });

        if (params.documentId === docId) {
            router.push('/documents');
        }

        if (documents === undefined) {
            return (
                <div className='h-full flex items-center justify-center p-4'>
                    <Spinner size='lg'></Spinner>
                </div>
            )
        }
    }

    return <div className='__TrashBox'>TrashBox component works!</div>;
};
