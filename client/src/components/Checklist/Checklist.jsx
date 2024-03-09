import { useState, useEffect } from "react";
import ChecklistItem from "./ChecklistItem/ChecklistItem";

function Checklist() {
  const [checklistItems, setChecklistItems] = useState([]);
  const [daySummaryId, setDaySummaryId] = useState(null);
  
  useEffect(() => {
    if (checklistItems.length === 0) {
      fetchTasksFromServer();
    }
  }, [checklistItems]);
  
  async function fetchTasksFromServer() {
    try {
      const [checklistResponse, daySummaryResponse] = await Promise.all([
        fetch('http://localhost:5000/api/checklist'),
        fetch('http://localhost:5000/api/daysummary')
      ]);
  
      const checklistData = await checklistResponse.json();
      const daySummaryData = await daySummaryResponse.json();
  
      setChecklistItems(checklistData);
      setDaySummaryId(daySummaryData._id);
  
      await fetch(`http://localhost:5000/api/daysummary/checklistsummary`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summaryId: daySummaryData._id,
          checklistAmount: checklistData.length
        }),
      });
  
      console.log('Checklist amount updated successfully');
    } catch (error) {
      console.error('Error fetching or updating data:', error);
    }
  }
  

  function addItem() {
    fetch('http://localhost:5000/api/checklist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "Add name",
        isEditing: false,
        summaryId: daySummaryId,
        isDone: false
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create new checklist item');
        }
        return response.json();
      })
      .then(result => {
        setChecklistItems(prev => [
          ...prev,
          {
            _id: result._id,
            name: "Add name",
            isEditing: false,
            isDone: false
          }
        ]);
      })
      .catch(error => {
        console.error('Error creating checklist item:', error);
      });
  }

  function changeEditItemStatus(itemId) {
    setChecklistItems(prev =>
      prev.map(item =>
        item._id === itemId ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  }
  async function completeCheckItem(checkListItemId){
    
    const updatedItems = [...checklistItems];
    const itemIndexToUpdate = updatedItems.findIndex(item => item._id === checkListItemId);
    if (itemIndexToUpdate !== -1) {
        updatedItems[itemIndexToUpdate].isDone = !updatedItems[itemIndexToUpdate].isDone;
    }
    const itemTuUpdate = updatedItems[itemIndexToUpdate];
    
    fetch(`http://localhost:5000/api/checklist/${checkListItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemTuUpdate)
    }).catch(error => {
        console.error('Error editing checklist item:', error);
      });
      
  }
 
  function deleteItem(checklistItemId) {
    setChecklistItems(prev => prev.filter(item => item._id !== checklistItemId));

    fetch('http://localhost:5000/api/checklist/del', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: checklistItemId,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete task');
        }
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  }

  function editItem(_id, itemName) {
    
    const itemToUpdate = checklistItems.find(item => item._id === _id);
    if (!itemToUpdate) {
      console.error(`Item with id ${_id} not found.`);
      return;
    }

    let updatedItem;
    if (itemName) {
      updatedItem = { ...itemToUpdate, name: itemName, isEditing: false };
    } else {
      deleteItem(_id);
      return;
    }

    fetch(`http://localhost:5000/api/checklist/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then(response => {
        if (response.ok) {
          setChecklistItems(prev => {
            const index = prev.findIndex(item => item._id === _id);
            if (index !== -1 && itemName) {
              changeEditItemStatus(_id);
              const updatedItems = [...prev];
              updatedItems[index] = { ...updatedItems[index], name: itemName };
              return updatedItems;
            } else {
              return prev;
            }
        });
      }})
      .catch(error => {
        console.error('Error editing checklist item:', error);
      });
  
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
          completeCheckItem={completeCheckItem}
          itemClassName={item.isDone ? "w-full font-medium ms-2 text-gray-400 peer-checked:text-gray-600 line-through peer-checked:no-underline cursor-text" : "w-full font-medium ms-2 text-gray-600 peer-checked:text-gray-400 peer-checked:line-through cursor-text"}
        />
      ))}

      </ul>
      {checklistItems.length < 6 && <button
        className="text-center w-full text-full text-gray-700 hover:text-black"
        onClick={addItem}
      >
        + Add item
        </button>}
    </div>
  );
}

export default Checklist;
