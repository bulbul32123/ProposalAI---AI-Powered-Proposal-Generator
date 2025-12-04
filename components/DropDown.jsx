import { Button } from "@/components/ui/button"
import { User, BadgeDollarSign, Settings, LogOut } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export function DropdownMenuDemo() {
    const monthyUsageIsNear = false
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className='p-0 bg-transparent hover:bg-transparent cursor-pointer' >
                    <div>
                        <img src="/apple-icon.png" alt="Profile"  className="h-10 w-10 rounded-full"/>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="center">
                <DropdownMenuLabel className="py-3 ">bulbul@gmail.com</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer group">
                        <Link href={'/profile'} className="flex gap-2">
                            <DropdownMenuShortcut ><User size={15} className="group-hover:text-white text-black" /></DropdownMenuShortcut>
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer group">
                        <Link href={'/settings'} className="flex gap-2">
                            <DropdownMenuShortcut ><Settings size={15} className="group-hover:text-white text-black" /></DropdownMenuShortcut>
                            Settings
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer group">
                        <Link href={'/pricing'} className="flex gap-2">
                            <DropdownMenuShortcut ><BadgeDollarSign size={15} className="group-hover:text-white text-black" /></DropdownMenuShortcut>
                            Pricing
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer group">
                    <Link href={'/dashboard'}>
                        Monthly usage
                    </Link>
                    <DropdownMenuShortcut className="group-hover:text-white text-black">8/10</DropdownMenuShortcut>
                </DropdownMenuItem>
                {monthyUsageIsNear && <div className="px-2 py-2">
                    <Link href={'/pricing'} className="text-blue-500 text-sm cursor-pointer ">
                        Upgrade your plan to buy more credits.
                    </Link>
                </div>}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    Support
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                    <a href="https://github.com/bulbul32123">
                        GitHub
                    </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500 hover:text-white group " >
                    <Link href={'/logout'} className="flex gap-2 item-center">
                        <DropdownMenuShortcut ><LogOut size={10} className="group-hover:text-white text-black pt-0.5" /></DropdownMenuShortcut>
                        Log out
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
