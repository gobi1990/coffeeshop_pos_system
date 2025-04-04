import { useCallback, useState } from "react";
import { memo } from "react";
import { twJoin } from "tailwind-merge";
import MenuItemUI from "../ui/menuItem";
import { MenuItem } from "../../interfaces/interfaces";
import { CakeIcon, FolderCog, ShoppingCart } from "lucide-react";
import AddMenuItemSection from "./addMenuItemSection";

interface MenuSectionProps {
  activeCategory: "coffee" | "dessert" | "cold";
  setActiveCategory: (category: "coffee" | "dessert" | "cold") => void;
  menuItems: MenuItem[];
  cartCount: number;
  addToCart: (item: MenuItem) => void;
  toggleCart: () => void;
  toggleAddMenuItem: () => void;
}

const MenuSection = memo(
  ({ activeCategory, setActiveCategory, menuItems, cartCount, addToCart, toggleCart, toggleAddMenuItem }: MenuSectionProps) => {
    const [isAddingMenuItem, setIsAddingMenuItem] = useState(false);

    const handleCategoryChange = useCallback(
      (category: "coffee" | "dessert" | "cold") => setActiveCategory(category),
      [setActiveCategory]
    );

    const handleAddMenuItemClick = useCallback(() => {
      setIsAddingMenuItem(true);
      toggleAddMenuItem(); // If you still need this for parent state
    }, [toggleAddMenuItem]);

    const handleBackToMenu = useCallback(() => {
      setIsAddingMenuItem(false);
    }, []);

    const handleSubmitNewItem = useCallback((newItem: {
      name: string;
      description: string;
      price: number;
      inventoryItems: string[];
      imageUrl: string;
    }) => {
      // Here you would typically dispatch an action or call an API to add the item
      console.log("New menu item:", newItem);
      setIsAddingMenuItem(false);
    }, []);

    if (isAddingMenuItem) {
      return <AddMenuItemSection onBack={handleBackToMenu} onSubmit={handleSubmitNewItem} />;
    }

    return (
      <>
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={handleAddMenuItemClick}
            className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
          >
            <CakeIcon className="h-5 w-5" />
            <span>Add New Menu Item</span>
          </button>
          <button
            onClick={() => {}}
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
        <button
          onClick={toggleCart}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow hover:bg-gray-100 hover:scale-95 transition-all z-50"
        >
          <ShoppingCart className="h-8 w-8" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </button>
      </>
    );
  }
);

MenuSection.displayName = "MenuSection";

export default MenuSection;