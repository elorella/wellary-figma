import { User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

interface ProfileDropdownProps {
  userEmail?: string;
  onPageChange?: (page: string) => void;
  onLogout?: () => void;
}

export function ProfileDropdown({
  userEmail = "user@example.com",
  onPageChange,
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
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-gray-100"
        >
          <Avatar className="h-9 w-9 ring-2 ring-slate-500/20">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-slate-400 to-slate-500 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 rounded-2xl"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              Wellary User
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userEmail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-xl cursor-pointer"
          onClick={() => onPageChange?.("reach-out")}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Reach out to Nazli</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="rounded-xl cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="rounded-xl cursor-pointer text-destructive focus:text-destructive"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
