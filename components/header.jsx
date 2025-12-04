"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles, FileText, LayoutDashboard, User, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenuDemo } from "./DropDown"

const navItems = [
  { href: "/", label: "Generate", icon: Sparkles },
  { href: "/history", label: "History", icon: FileText },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  // { href: "/profile", label: "My Profile", icon: User },
  // { href: "/settings", label: "Settings", icon: Settings },
]
const monthyUsageIsNear = true
export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex justify-between item-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal to-teal/70 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-navy">ProposalAI <span className="text-sm">Free</span></h1>
              <p className="text-xs text-muted-foreground">AI-Powered Proposal Generator</p>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            {monthyUsageIsNear && <div className="px-2 py-2">
              <Link href={'/pricing'} className="text-sm cursor-pointer text-blue-500/90 hover:underline">
                Upgrade to pro plan
              </Link>
            </div>}
            <Button className="h-7 w-12 bg-transparent hover:bg-transparent hover:text-black" variant='outline'>
              6/10
            </Button>
            <DropdownMenuDemo />
          </div>
        </div>

        <nav className="flex items-center justify-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all",
                  isActive ? "bg-green-500 text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            )
          })}
        </nav>

      </div>
    </header>
  )
}
