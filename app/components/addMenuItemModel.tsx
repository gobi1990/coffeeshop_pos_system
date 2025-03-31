import { useCallback } from "react";
import { ListOrderedIcon, X } from "lucide-react";
import { MenuItem } from "@/app/interfaces/interfaces";
import CustomButton from "./customButton";

interface AddMenuItemModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  newMenuItem: Partial<MenuItem>;
  handleAddMenuItem: () => void;
}

const AddMenuItemModal = ({
  isOpen,
  toggleModal,
  newMenuItem,
  handleAddMenuItem,
}: AddMenuItemModalProps) => {
  const handleChange = useCallback(
    () => {},
    []
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Menu Item</h3>
          <button onClick={toggleModal} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={newMenuItem.name || ""}
              onChange={() => handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <CustomButton onClick={handleAddMenuItem} 
          label="Add Menu Item" 
          icon={<ListOrderedIcon className="h-5 w-5" />}/>
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemModal;