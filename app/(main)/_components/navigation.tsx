"use client";

const Navigation: React.FC = () => {
    return <>
        <aside className='group h-full bg-secondary
        overflow-y-auto relative flex w-60 flex-col z-[99999]'>
            <div>
                <p>Action items</p>
            </div>
            <div className='mt-4'>
                <p>Doc</p>
            </div>
            <div className='opacity-0 group-hover:opacity-100
            transition cursor-ew-resize
            absolute h-full w-1 bg-primary/10 right-0 top-0' />
        </aside>
    </>;
};

export default Navigation;
