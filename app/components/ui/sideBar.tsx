import { memo, useCallback } from "react";
import { NavItem } from "../../interfaces/interfaces";
import { twJoin } from 'tailwind-merge';
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    navItems: NavItem[];
    activeNav: string;
    setActiveNav: (name: string) => void;
  }

  const Sidebar = memo(
    ({ isOpen, toggleSidebar, navItems, activeNav, setActiveNav }: SidebarProps) => {
      const handleNavClick = useCallback(
        (name: string) => setActiveNav(name),
        [setActiveNav]
      );
  
      return (
        <div
          className={twJoin(
            "bg-white h-screen fixed left-0 top-0 transition-all duration-300 ease-in-out z-30",
            isOpen ? "w-64" : "w-20"
          )}
        >
          <div className="flex items-center justify-between p-4 ">
            <h1
              className={twJoin(
                "font-bold transition-all duration-300",
                isOpen ? "text-xl" : "text-xs"
              )}
            >
              {isOpen ? "Coffee Shop POS Admin" : "POS Admin"}
            </h1>
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {isOpen ? (
                <ChevronLeft className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>
          <nav className="p-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.name)}
                className={twJoin(
                  "w-full flex items-center space-x-4 p-3 rounded-lg mb-2 transition-all duration-200",
                  activeNav === item.name
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {item.icon}
                {isOpen && <span>{item.name}</span>}
              </button>
            ))}
          </nav>
        </div>
      );
    }
  );
  
  Sidebar.displayName = "Sidebar";
  
  export default Sidebar;