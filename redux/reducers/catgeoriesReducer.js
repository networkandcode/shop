import {
    ADD_CATEGORY,
    SAVE_CATEGORY,
    DELETE_CATEGORY
} from '../constants/categoriesConstants';

const category = { name: 'category' };
const categoriesReducer = (categories = [], action) => {
    switch(action.type) {
        case ADD_CATEGORY:
            return [ ...categories, category ]
        case SAVE_CATEGORY:
            return [ ...categories ]
        case DELETE_CATEGORY:
            return [ ...categories.remove(category) ]
        default:
            return [ ...categories ]
    }    
}

export default categoriesReducer;