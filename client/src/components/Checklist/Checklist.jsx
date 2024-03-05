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
        summaryId: daySummaryId
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
            isEditing: false
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
  async function completeCheckItem(ifDone){
    try {
      await fetch(`http://localhost:5000/api/daysummary/checklistdone`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },       
        body: JSON.stringify({
          summaryId: daySummaryId,
          checkItemDone: ifDone
      })
      })
    } catch (error) {
       console.error('Error updating checklist item status:', error);
    }
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
        console.log("czemu to nie jest wypisane w konsoli?");
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  }

  function editItem(_id, value) {
    if (value) {
      const item = {
        name: value,
        isEditing: false
      };

      fetch(`http://localhost:5000/api/checklist/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
        .then(response => {
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
              }
            });
          } else {
            throw new Error('Failed to delete item');
          }
        })
        .catch(error => {
          console.error('Error editing checklist item:', error);
        });
    } else {
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
            completeCheckItem={completeCheckItem}
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
