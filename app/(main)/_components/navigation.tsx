"use client";

import { api } from '@/convex/_generated/api';
import { cn } from '@/lib/utils';
import { useMutation } from 'convex/react';
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';
import { Item } from './item';
import UserItem from './userItem';

const MIN_WIDTH = 240;
const MAX_WIDTH = 480;

const Navigation: React.FC = () => {
    
    const isMobile = useMediaQuery('(max-width: 768px)');
    const pathName = usePathname();
    const create = useMutation(api.documents.create);

    const isResizingRef = useRef(false);
    const sideBarRef = useRef<ElementRef<'aside'>>(null);
    const navBarRef = useRef<ElementRef<'div'>>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathName]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        isResizingRef.current = true;
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp)
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;
        if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
        if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;
        if (sideBarRef.current && navBarRef.current) {
            sideBarRef.current.style.width = `${newWidth}px`;
            navBarRef.current.style.setProperty('left', `${newWidth}px`);
            navBarRef.current.style.setProperty('width', `calc(100% - ${newWidth}px)`);
        }
    };

    const handleMouseUp = (e: MouseEvent) => {
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const resetWidth = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);
            sideBarRef.current.style.width = isMobile ? '100%' : `${MIN_WIDTH}px`;
            navBarRef.current.style.setProperty('width', isMobile ? '0' : `calc(100% - ${MIN_WIDTH}px)`);
            navBarRef.current.style.setProperty('left', `${isMobile ? '100%' : MIN_WIDTH}px`);
            setTimeout(() => setIsResetting(false), 300);
        }
    };
        
    const collapse = () => {
        if (sideBarRef.current && navBarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);
            sideBarRef.current.style.width = '0';
            navBarRef.current.style.setProperty('width', '100%');
            navBarRef.current.style.setProperty('left', '0');
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const onCreate = () => {
        const createPromise = create({
            title: 'New note',
        });
        toast.promise(createPromise, {
            loading: 'Creating...',
            success: 'New Note created!',
            error: 'Error creating note.',
            duration: 2000
        });
    }

    return <>
        <aside ref={sideBarRef} className={cn(
                "group h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0",
            )}>
            <div 
                onClick={collapse}
                role='button' className={cn(
                    "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover:opacity-100 transition",
                    isMobile && "opacity-100",
                )}>
                    <ChevronsLeft className='h-6 w-6' />
            </div>
            <div>
                <UserItem />
                <Item label='Search' icon={Search} isSearch />
                <Item label='Settings' icon={Settings} />
                <Item onClick={onCreate} label='New page' icon={PlusCircle} />
            </div>
            <div className='mt-4'>
            </div>
            {/* Hover over the side bar to expand or collapse the aside. */}
            <div 
                onMouseDown={handleMouseDown}
                onClick={resetWidth}
                className='opacity-0 group-hover:opacity-100
                transition cursor-ew-resize
                absolute h-full w-1 bg-primary/10 right-0 top-0' />
        </aside>
        <div ref={navBarRef} className={cn(
            "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
            isResetting && "transition-all ease-in-out duration-300",
            isMobile && "left-0 w-full",
        )}>
            <nav className='bg-transparent px-3 py-2 w-full'>
                {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className='h-6 w-6 text-muted-foreground'></MenuIcon>}
            </nav>
        </div>
    </>;
};

export default Navigation;
