import newsCategoryList from "@/constants/Categories";
import axios from "axios";
import { useCallback, useState } from "react";

export const useNewsCategories = () => {
  const [newsCategories, setNewsCategories] = useState(newsCategoryList);

  const toggleNewsCategory = useCallback((id: number) => {
    setNewsCategories((prevNewsCategories) => {
      return prevNewsCategories.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });
    });
  }, []);

  return { newsCategories, toggleNewsCategory };
};
