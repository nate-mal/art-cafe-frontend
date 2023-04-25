import * as React from "react";
import useSWR from "swr";
import { backend_url } from "../lib/settings";
export const DiscountsContext = React.createContext(null);

export default function DiscountsProvider({ children }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `${backend_url}/api/alldiscounts`,
    fetcher
  );

  const getDiscountPercentage = React.useCallback(
    (subCategoryId, subCategoryRoName) => {
      if (!data) {
        return null;
      }
      const discounts = data;
      let filteredDiscounts = [];
      for (let i = 0; i < discounts.length; i++) {
        let discount = discounts[i];
        for (let j = 0; j < discount.sub_categories.length; j++) {
          let subCategory = discount.sub_categories[j];
          if (
            subCategory.id === subCategoryId ||
            subCategory.ro_name === subCategoryRoName
          ) {
            filteredDiscounts.push(discount);
            break;
          }
        }
      }

      if (filteredDiscounts.length === 0) {
        return null;
      }

      // filteredDiscounts.sort(function (a, b) {
      //   return new Date(b.createdAt) - new Date(a.createdAt);
      // });
      // todo

      return filteredDiscounts[0].percentage;
    },
    [data]
  );
  return (
    <DiscountsContext.Provider
      value={{ discounts: data, getDiscountPercentage }}
    >
      {children}
    </DiscountsContext.Provider>
  );
}
