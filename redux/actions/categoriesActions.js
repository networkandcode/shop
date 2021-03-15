import {
    ADD_CATEGORY,
    SAVE_CATEGORY,
    DELETE_CATEGORY
} from '../constants/categoriesConstants';

export const addCategory = () => ({
    type: ADD_CATEGORY
});

export const saveCategory = () => ({
    type: SAVE_CATEGORY
});

export const deleteCategory = () => ({
    type: DELETE_CATEGORY
});