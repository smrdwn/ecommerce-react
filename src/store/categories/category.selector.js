import {createSelector} from "reselect";

const selectCategoryReducer = (state) => state.categories;

// Prevents unnecessary re-renders by memoizing results (saving previous results if inputs haven't changed).
export const selectCategories = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categories)

export const selectCategoriesMap = createSelector([selectCategories], (categories) => categories.reduce((acc, category) => {
    const {title, items} = category;
    acc[title.toLowerCase()] = items;
    return acc;
}, {}));

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);