import { useCallback } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";
import { MenuItem } from "@/app/interfaces/interfaces";
import { memo } from "react";
import { twJoin } from 'tailwind-merge';

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
        <div className="flex space-x-4 mb-6">
          {["coffee", "dessert", "cold"].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category as "coffee" | "dessert" | "cold")}
              className={twJoin(
                "px-4 py-2 rounded-lg font-medium",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <span className="text-gray-600">${item.price.toFixed(2)}</span>
                  </div>
                  {item.description && (
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  )}
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  }
);

MenuSection.displayName = "MenuSection";

export default MenuSection;