import React, { useState } from "react";
import ChecklistItem from "./ChecklistItem/ChecklistItem";

function Checklist() {
  const defaultChecklist = [
    {
      id: 0,
      name: "Add name",
      isEditing: false
    }
  ];
  const [checklistItems, setChecklistItems] = useState(defaultChecklist);

  function addItem() {
    setChecklistItems(prev => [
      ...prev,
      {
        id: prev.length,
        name: "Add name",
        isEditing: false
      }
    ]);
  }

  function changeEditItemStatus(itemId){
    setChecklistItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  }
  function deleteItem(id) {
    setChecklistItems(prev => prev.filter(item => item.id !== id));
  }
  function editItem(id, value) {
    if (value){
      setChecklistItems(prev => {
        const index = prev.findIndex(item => item.id === id);
        if (index !== -1) {
          const updatedItems = [...prev];
          updatedItems[index] = { ...updatedItems[index], name: value };
          return updatedItems;
        } else {
          return prev;
        }
      });
      changeEditItemStatus(id);
    } else{
      deleteItem(id);
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
            key={item.id}
            item={item}
            isEditing={item.isEditing}
            changeEditItemStatus={() => changeEditItemStatus(item.id)}
            editItem={(id, value) => editItem(id, value)}
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
