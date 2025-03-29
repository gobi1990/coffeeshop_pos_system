import { useCallback } from "react";
import { memo } from "react";
import { twJoin } from "tailwind-merge";
import MenuItemUI from "./menuItem";
import { MenuItem } from "../interfaces/interfaces";
import { CakeIcon, FolderCog } from "lucide-react";

interface MenuSectionProps {
  activeCategory: "coffee" | "dessert" | "cold";
  setActiveCategory: (category: "coffee" | "dessert" | "cold") => void;
  menuItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
}

const MenuSection = memo(
  ({ activeCategory, setActiveCategory, menuItems, addToCart }: MenuSectionProps) => {
    const handleCategoryChange = useCallback(
      (category: "coffee" | "dessert" | "cold") => setActiveCategory(category),
      [setActiveCategory]
    );

    return (
      <>
      <div className="flex items-center space-x-4 mb-6">
      <button
          onClick={()=>{}}
          className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
        >
          <CakeIcon className="h-5 w-5" />
          <span>Add New Menu Item</span>
        </button>
        <button
          onClick={()=>{}}
          className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
        >
          <FolderCog className="h-5 w-5" />
          <span>Add New Category</span>
        </button>
      </div>
        <div className="flex space-x-4 mb-6">
          {["coffee", "dessert", "cold"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category as "coffee" | "dessert" | "cold")}
              className={twJoin(
                "px-4 py-2 rounded-lg font-medium",
                activeCategory === category
                  ? "bg-black text-white shadow" 
                  : "bg-white shadow text-gray-600 hover:bg-gray-50"
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {menuItems
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <MenuItemUI key={item.id} item={item} addToCart={addToCart} />
            ))}
        </div>
      </>
    );
  }
);

MenuSection.displayName = "MenuSection";

export default MenuSection;