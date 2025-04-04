import { useState, useCallback } from "react";
import { ArrowLeft, X, Plus } from "lucide-react";


interface AddMenuItemSectionProps {
  onBack: () => void;
  onSubmit: (newItem: {
    name: string;
    description: string;
    price: number;
    inventoryItems: string[];
    imageUrl: string;
  }) => void;
}

const AddMenuItemSection: React.FC<AddMenuItemSectionProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    inventoryItems: [] as string[],
    imageUrl: "",
  });
  const [newInventoryItem, setNewInventoryItem] = useState("");

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  }, []);

  const addInventoryItem = useCallback(() => {
    if (newInventoryItem.trim()) {
      setFormData((prev) => ({
        ...prev,
        inventoryItems: [...prev.inventoryItems, newInventoryItem.trim()],
      }));
      setNewInventoryItem("");
    }
  }, [newInventoryItem]);

  const removeInventoryItem = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      inventoryItems: prev.inventoryItems.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form after submission
    setFormData({
      name: "",
      description: "",
      price: 0,
      inventoryItems: [],
      imageUrl: "",
    });
  }, [formData, onSubmit]);

  return (
    <div className="p-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Menu</span>
      </button>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold">Add New Menu Item</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inventory Items</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={newInventoryItem}
                onChange={(e) => setNewInventoryItem(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
                placeholder="Add inventory item"
              />
              <button
                type="button"
                onClick={addInventoryItem}
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {formData.inventoryItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => removeInventoryItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-gray-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemSection;