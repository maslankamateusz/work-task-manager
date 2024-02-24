import React, { useState } from "react";
import ChecklistItem from "./ChecklistItem/ChecklistItem";

function Checklist() {
  const defaultChecklist = [
    {
      id: 0,
      name: "Figo F"
    },
    {
      id: 1,
      name: "Figo Fago"
    }
  ];
  const [checklistItems, setChecklistItems] = useState(defaultChecklist);
  const [editingItemId, setEditingItemId] = useState(null);

  function addItem() {
    setChecklistItems(prev => [
      ...prev,
      {
        id: prev.length,
        name: "Add name"
      }
    ]);
  }

  function changeEditItemStatus(itemId){
    setEditingItemId(prevId => (prevId === null || prevId !== itemId ? itemId : null));
  }

  function editItem(id, value) {
    console.log(id, value);
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
  }
  
  return (
    <div className="bg-green-300 w-2/5 ">
      <div className="pt-3">
        <p className="text-center text-3xl">Daily Checklist</p>
      </div>
      <ul className="w-full px-2">
        {checklistItems.map(item => (
          <ChecklistItem
            key={item.id}
            item={item}
            isEditing={editingItemId === item.id}
            changeEditItemStatus={() => changeEditItemStatus(item.id)}
            editItem={(id, value) => editItem(id, value)}
          />
        ))}
        <button
          className="text-center w-full text-xl mt-2 text-gray-700 hover:text-black"
          onClick={addItem}
        >
          + Add item
        </button>
      </ul>
    </div>
  );
}

export default Checklist;
