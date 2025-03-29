import { memo } from "react";
import { Plus, Image as ImageIcon } from "lucide-react";
import { MenuItem } from "../interfaces/interfaces";
import Image from "next/image";

interface MenuItemUIProps {
  item: MenuItem;
  addToCart: (item: MenuItem) => void;
}

const MenuItemUI = memo(({ item, addToCart }: MenuItemUIProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        {item.imageUrl ? (
          <Image
            width={400}
            height={300}
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
          <span className="bg-gray-200 font-medium font-semibold px-2 py-1 rounded-lg text-gray-600">${item.price.toFixed(2)}</span>
        </div>
        {item.description && (
          <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        )}
        <button
          onClick={() => addToCart(item)}
          className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-primary/90 flex items-center justify-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
});

MenuItemUI.displayName = "MenuItemUI";

export default MenuItemUI;