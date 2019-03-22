const data = require('../employees.json');

const reducer = (state = data, action) => {
    switch (action.type) {
      case 'Add_Item':
        return [...state, action.newItem];
          
      case 'Delete_Item':
        const deletedId = state.findIndex(
                  (el) => el.id === action.id);
        
        const newArray = [
          ...state.slice(0, deletedId), 
          ...state.slice(deletedId + 1)];
        
          return newArray;
        
      case 'Edit_Item':
      
      const editedId = state.findIndex(
                        (el) => el.id === action.id);
            
      const newArr = [
        ...state.slice(0, editedId),
        action.item,
        ...state.slice(editedId + 1)];
  
      return newArr;

      default:
        return state;
    }
  };

  export default reducer;

  