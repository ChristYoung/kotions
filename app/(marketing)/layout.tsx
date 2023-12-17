import { Navbar } from './_components/navbar';

export interface MarketingLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = (props: MarketingLayoutProps) => {
    return <div className='__layout h-full dark:bg-[#1F1F1F]'>
        <Navbar />
        <main className='h-full pt-40'>
            {props.children}
        </main>
    </div>;
};

export default MarketingLayout;
