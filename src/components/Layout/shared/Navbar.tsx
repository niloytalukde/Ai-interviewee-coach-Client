import { Button } from "@/components/ui/button";
import userStore from "@/zustand/user/user.store";
import { Brain } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const navLinks = [
    { name: "Features", href: "#features" ,role:"Public" },
    { name: "How It Works", href: "#how-it-works" ,role:"Public" },
    { name: "Roles", href: "#roles",role:"Public"  },
    { name: "Pricing", href: "#pricing" ,role:"Public" },
    { name: "Dashboard", href: "/user/dashboard", role:"user"},
  ];

  const {user,logout}=userStore()
    const handleLogout = async () => {
      await logout();
    };
  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
         <Link to="/" className="inline-flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Brain className="h-5 w-5" />
          </div>
         
         </Link>
          <span className="text-xl font-bold text-foreground">InterviewAI</span>
        </div>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth buttons */}
        {
          user?.data?.email ? (
              <Button className="hover:text-white" onClick={handleLogout} variant="outline">Logout</Button>  
          ) : (<div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/sign-in">Get Started</Link>
          </Button>
        </div>)
        }
      </div>
    </nav>
  );
};

export default Navbar;
