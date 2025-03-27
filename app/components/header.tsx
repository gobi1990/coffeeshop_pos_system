import { MenuIcon} from "lucide-react";
import { memo } from "react";

interface HeaderProps {
  activeNav: string;
}

const Header = memo(
  ({ activeNav }: HeaderProps) => {
    return (
      <header className="bg-white shadow fixed top-0 w-full z-40">
        <div className="px-4 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <MenuIcon className="h-6 w-6 mr-2" />
            <h2 className="text-xl font-semibold">{activeNav}</h2>
          </div>
        </div>
      </header>
    );
  }
);

Header.displayName = "Header";

export default Header;