"use client"

import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { ChevronDown, ChevronRight, LucideIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    id?: Id<'documents'>;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    label?: string;
    icon: LucideIcon;
    onExpand?: () => void;
}

export const Item = (props: ItemProps) => {
    const { label, icon: Icon, onClick, active, id,
        documentIcon, level = 0, isSearch, expanded, onExpand } = props;
    
    const create = useMutation(api.documents.create);
    const router = useRouter();

    const handleExpand = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        onExpand?.();
    };

    const onCreate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        if (!id) return;
        const createPromise = create({
            title: 'New Note',
            parentDocument: id,
        }).then(docId => {
            if (!expanded) {
                onExpand?.();
            }
            // router.push(`/documents/${docId}`);
        });
        toast.promise(createPromise, {
            loading: 'Creating...',
            success: 'Created!',
            error: 'Error creating document.',
            duration: 2000,
        });
    };

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;

    return <div onClick={(e) => onClick && onClick(e)} role='button'
                className={cn(
                    "__item group min-h-[27px] cursor-pointer text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                    active && 'bg-primary/5 text-primary',
                )}
                style={{paddingLeft: level ? `${(level * 12) + 12}px` : '12px'}}
            >
                {!!id && (
                    <div role='button' className='h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1'
                    onClick={handleExpand}>
                        <ChevronIcon className='h-4 w-4 shrink-0 text-muted-foreground/50' />
                    </div>
                )}
                {documentIcon ? (
                    <div className='shrink-0 mr-2 text-[18px]'>{documentIcon}</div>
                ) : <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' />}
                <span className='truncate'>
                    {label}
                </span>
                {isSearch && (
                    <kbd className='ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                        <span className='text-xs'> ⌘</span> + K
                    </kbd>
                )}
                {
                    !!id && (
                        <div className='ml-auto flex items-center gap-x-2'>
                            <div 
                                role='button'
                                onClick={onCreate}
                                className='opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                                <Plus className='h-4 w-4 text-muted-foreground' />
                            </div>
                        </div>
                    )
                }
            </div>;
};

Item.Skeleton = function ItemSkeleton({level}: {level?: number}) {
    return (
        <div style={{paddingLeft: level ? `${level * 12 + 25}px` : '12px'}} className='flex gap-x-2 py-[3px]'>
            <Skeleton className='h-4 w-4' />
            <Skeleton className='h-4 w-[30%]' />
        </div>
    )
};
