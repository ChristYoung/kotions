"use client"

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ChevronsLeftRight } from 'lucide-react';

const UserItem: React.FC = () => {
    const { user } = useUser();
    return <div className='__userItem'>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role='button' className='flex items-center text-sm p-3 w-full
                hover:bg-primary/5'>
                    <div className='gap-x-2 flex items-center max-w-[150px]'>
                        <Avatar className='w-5 h-5'>
                            <AvatarImage src={user?.imageUrl ?? ''} alt='' />
                        </Avatar>
                        <span className='text-start font-medium line-clamp-1'>
                            {user?.fullName}&apos;s Kotion
                        </span>
                    </div>
                    <ChevronsLeftRight className='rotate-90 ml-2 text-muted-foreground h-4 w-4'/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-80' align='start' alignOffset={11} forceMount>
                <div className='flex flex-col space-y-4 p-2'>
                    <p className='text-xs font-medium leading-none text-muted-foreground'>{user?.emailAddresses[0].emailAddress}</p>
                    <div className='flex items-center gap-x-2'>
                        <div className='rounded-md bg-secondary p-1'>
                            <Avatar className='w-8 h-8'>
                                <AvatarImage src={user?.imageUrl ?? ''} alt='' />
                            </Avatar>
                        </div>
                    </div>
                </div>
                <DropdownMenuSeparator>
                    <DropdownMenuItem asChild className='w-full cursor-pointer text-muted-foreground'>
                        <SignOutButton>
                            Log Out
                        </SignOutButton>
                    </DropdownMenuItem>
                </DropdownMenuSeparator>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>;
};
export default UserItem;
