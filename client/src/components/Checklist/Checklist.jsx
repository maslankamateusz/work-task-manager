import { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem/ChecklistItem";

function Checklist() {

  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    if (checklistItems.length === 0) {
        fetchTasksFromServer();
      }
  }, [checklistItems]);

  async function fetchTasksFromServer (){
    try {
        const response = await fetch('http://localhost:5000/api/checklist');
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const checklistData = await response.json();
        setChecklistItems(checklistData); 
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; 
    }
};

  function addItem() {
    fetch('http://localhost:5000/api/checklist', {
    method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              name: "Add name",
              isEditing: false
          }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to create new checklist item');
          }
          console.log('New checklist item created successfully');
          return response.json();
      }).then(result => {
        setChecklistItems(prev => [
          ...prev,
          {
            _id: result._id,
            name: "Add name",
            isEditing: false
          }
        ]);
      }).catch(error => {
          console.error('Error creating checklist item:', error);
      });
  }

  function changeEditItemStatus(itemId){
    setChecklistItems(prev =>
      prev.map(item =>
        item._id === itemId ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  }
  async function deleteItem(checklistItemId) {
    setChecklistItems(prev => prev.filter(item => item._id !== checklistItemId));

      try {
        await fetch('http://localhost:5000/api/checklist/del', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: checklistItemId,
            }),
        })
        console.log("dlaczego nie mogę wypisać czegoklowiek do konsoli?");
      } catch (error) {
        console.error('Error deleting task:', error);
    }
  }

  async function editItem(_id, value) {
    if(value){
      const item = {
        name: value,
        isEditing: false
      }
      try {
        await fetch(`http://localhost:5000/api/checklist/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
        }).then(response => {
          if (response.ok) {
            changeEditItemStatus(_id);
            setChecklistItems(prev => {
              const index = prev.findIndex(item => item._id === _id);
              if (index !== -1) {
                const updatedItems = [...prev];
                updatedItems[index] = { ...updatedItems[index], name: value };
                return updatedItems;
              } else {
                return prev;
              }});
          } else {
            throw new Error('Failed to delete item');
          }
        });
      } catch (error) {
        console.error('Error editing checklist item:', error);
      }
    } else{
      deleteItem(_id);
    }
    
 }
  
  return (
    <div className="bg-green-300 w-2/5 ">
      <div className="pt-3">
        <p className="text-center text-3xl">Daily Checklist</p>
      </div>
      <ul className="w-full px-2.5">
        {checklistItems.map(item => (
          <ChecklistItem
            key={item._id}
            item={item}
            changeEditItemStatus={() => changeEditItemStatus(item._id)}
            editItem={(_id, value) => editItem(_id, value)}
          />
        ))}  
      </ul>
      {checklistItems.length<6 && <button
          className="text-center w-full text-full text-gray-700 hover:text-black"
          onClick={addItem}
        >
          + Add item
        </button>}
    </div>
  );
}

export default Checklist;
