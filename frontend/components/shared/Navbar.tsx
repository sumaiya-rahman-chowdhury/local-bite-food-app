"use client";

import { useState } from "react";
import { Menu, X, User, LogOut, ListIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { clearSession } from "@/lib/cookie";
import CartIcon from "../cart/CartIcon";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    await clearSession();
    const res = await logout();
    setUser(null);
    alert(res.message);
    router.push("/");
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    ...(user?.role === "admin"
      ? [{ name: "Dashboard", href: "/dashboard" }]
      : []),
    { name: "Post Food", href: "/food-marketplace/post" },
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-800">
            Local <span className="text-green-600 font-bold">Bite</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <CartIcon />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100 text-black"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatarUrl} alt="user avatar" />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem disabled>
                  <User className="mr-2 h-4 w-4" />
                  {user?.name || "User"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/profile")}
                  className=""
                >
                  <User className="mr-2 h-4 w-4 text-black" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/posts")}>
                  <ListIcon className="mr-2 h-4 w-4" />
                  Food Posts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            className="text-black"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`bg-white md:hidden px-4  space-y-3 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block text-sm font-medium text-gray-700 hover:text-primary transition-colors"
          >
            {item.name}
          </a>
        ))}

        {user ? (
          <>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 px-0"
              onClick={() => router.push("/profile")}
            >
              {" "}
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 px-0"
              onClick={() => router.push("/posts")}
            >
              Food Posts
            </Button>
            <Button
              variant="outline"
              className="w-full  text-gray-700 mb-4"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </>
        ) : (
          <Button
            variant="default"
            className="w-full"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
