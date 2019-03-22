export const addItem = (id, FIO, phone, birthday,
    role, archive) => (
    {type: 'Add_Item',
        newItem: {
            id: id++,
            name: FIO,
            isArchive : archive,
            role: role,
            phone: phone,
            birthday: birthday
            
          }
    });

export const deleteItem = (id) => 
    ({type: 'Delete_Item',
        id});

export const editItem = (id, item) => {
    return {
        type: 'Edit_Item',
        id,
        item        
    };    
};