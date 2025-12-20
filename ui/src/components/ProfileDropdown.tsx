import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogOut, User } from "lucide-react";

interface ProfileDropdownProps {
  userEmail?: string;
  onLogout?: () => void;
}

export function ProfileDropdown({
  userEmail = "user@example.com",
  onLogout,
}: ProfileDropdownProps) {
  const getUserInitials = () => {
    if (!userEmail) return "U";
    const firstLetter = userEmail.charAt(0).toUpperCase();
    return firstLetter;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900">
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-500 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl bg-slate-800 border-slate-700">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none text-white">My Account</p>
            <p className="text-xs leading-none text-slate-400">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem className="cursor-pointer rounded-lg text-white focus:bg-slate-700 focus:text-white">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-slate-700" />
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-slate-700 rounded-lg"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}