import { useState, useCallback } from "react";
import CustomButton from "../ui/customButton";
import { CustomInputField, CustomTextarea } from "../ui/customInputField";
import { ArrowLeft, Plus } from "lucide-react";


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
    setFormData({
      name: "",
      description: "",
      price: 0,
      inventoryItems: [],
      imageUrl: "",
    });
  }, [formData, onSubmit]);

  return (
    <div className="pb-6">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-black hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold">Add New Menu Item</h2>

        <div className="space-y-4">
          <CustomInputField
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />

          <CustomTextarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
          />
          <div className="flex row space-y-2">
          <CustomInputField
            label="Price ($)"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
          />
          </div>

          <div>
            {/* <label className="block text-sm font-medium text-gray-700">Inventory Items</label> */}
            <div className="flex space-x-2 mt-1">
  
          <CustomInputField
            label="Inventory Items"
            onChange={(e) => setNewInventoryItem(e.target.value)}
            name="inventoryItem"
            value={newInventoryItem}
            type="text"
            placeholder="Add inventory item"
          />
              <CustomButton
                label=""
                onClick={addInventoryItem}
                width={40}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                icon={<Plus className="h-5 w-5" />}
              />
            </div>
            <ul className="mt-2 space-y-2">
              {formData.inventoryItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
                  <span>{item}</span>
                  <CustomButton
                    label="X"
                    onClick={() => removeInventoryItem(index)}
                    className="p-0"
                  />
                    
                </li>
              ))}
            </ul>
          </div>

          <CustomInputField
            label="Image URL"
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>

        <CustomButton onClick={() => {}} label="Submit" className="w-full"/>
          
      </form>
    </div>
  );
};

export default AddMenuItemSection;