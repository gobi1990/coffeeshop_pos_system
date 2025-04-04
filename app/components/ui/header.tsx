import { Bell, LogOut, MenuIcon, Settings, User} from "lucide-react";
import { memo, useState } from "react";

interface HeaderProps {
  activeNav: string;
}






const Header = memo(
  ({ activeNav }: HeaderProps) => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    
    const toggleProfileDropdown = () => {
      setIsProfileOpen((prev) => !prev);
    };

    return (
      <header className="bg-white shadow fixed top-0 w-full z-40 mb-4">
        <div className="px-4 py-5 flex justify-between">
          <div className="flex items-center space-x-2">
            <MenuIcon className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">{activeNav}</h2>
          </div>
          <div className="flex fixed right-4 space-x-4 pb-4">
            <div className="">
            <button className=" text-gray-600 hover:text-gray-800 focus:outline-none">
              <div className="relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </div>
            </button>
            </div>
            <div className="ml-4 mr-4">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
            </button>
            {isProfileOpen && (
              <div className="absolute right-3 mt-3 w-48 bg-white rounded-md shadow py-1 z-50">
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    console.log("Profile clicked");
                    setIsProfileOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    console.log("Settings clicked");
                    setIsProfileOpen(false);
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    console.log("Logout clicked");
                    setIsProfileOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export default Header;