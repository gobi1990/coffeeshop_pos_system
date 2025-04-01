import { useCallback, useState } from "react";
import { Percent, Tag, Gift } from "lucide-react";
import { Promotion, MenuItem } from "@/app/interfaces/interfaces";

import { memo } from "react";
import { twJoin } from "tailwind-merge";

interface PromotionsSectionProps {
  promotions: Promotion[];
  menuItems: MenuItem[];
  togglePromotionStatus: (promotionId: string) => void;
}

const PromotionsSection = memo(
  ({ promotions, menuItems, togglePromotionStatus }: PromotionsSectionProps) => {
    const [activeTab, setActiveTab] = useState<"active" | "inactive">("active");

    const handleTabChange = useCallback(
      (tab: "active" | "inactive") => setActiveTab(tab),
      []
    );

    const handleToggleStatus = useCallback(
      (promotionId: string) => togglePromotionStatus(promotionId),
      [togglePromotionStatus]
    );

    return (
      <div className="space-y-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleTabChange("active")}
            className={twJoin(
              "px-4 py-2 rounded-lg font-medium",
              activeTab === "active"
                ? "bg-primary text-primary-foreground"
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            Active Promotions
          </button>
          <button
            onClick={() => handleTabChange("inactive")}
            className={twJoin(
              "px-4 py-2 rounded-lg font-medium",
              activeTab === "inactive"
                ? "bg-primary text-primary-foreground"
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            Inactive Promotions
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promotions
            .filter((promo) => (activeTab === "active" ? promo.active : !promo.active))
            .map((promotion) => (
              <div key={promotion.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {promotion.type === "discount" && (
                      <Percent className="h-6 w-6 text-blue-500" />
                    )}
                    {promotion.type === "bogo" && (
                      <Tag className="h-6 w-6 text-green-500" />
                    )}
                    {promotion.type === "gift" && (
                      <Gift className="h-6 w-6 text-purple-500" />
                    )}
                    <h3 className="font-medium">{promotion.name}</h3>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(promotion.id)}
                    className={twJoin(
                      "px-3 py-1 rounded-full text-sm",
                      promotion.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    )}
                  >
                    {promotion.active ? "Active" : "Inactive"}
                  </button>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>ID: {promotion.id}</p>
                  <p>Type: {promotion.type.toUpperCase()}</p>
                  {promotion.discountPercent && (
                    <p>Discount: {promotion.discountPercent}%</p>
                  )}
                  {promotion.giftItem && <p>Gift: {promotion.giftItem}</p>}
                  <p>Start: {new Date(promotion.startDate).toLocaleDateString()}</p>
                  <p>End: {new Date(promotion.endDate).toLocaleDateString()}</p>
                  <p>
                    Applicable Items:{" "}
                    {promotion.applicableItems
                      .map((id) => menuItems.find((item) => item.id === id)?.name)
                      .join(", ")}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
);

PromotionsSection.displayName = "PromotionsSection";

export default PromotionsSection;