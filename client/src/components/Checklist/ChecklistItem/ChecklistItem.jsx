function ChecklistItem({ item, changeEditItemStatus, isEditing, editItem }) {
    
    const handleKeyPress = (event) => {
        console.log(event.key);
        if (event.key == "Enter") {            
          editItem(item.id, event.target.value);
        }
      };

    if(!isEditing){
        return (
            <li className="flex w-full items-center justify-center gap-2.5 border-b-2 bg-white px-3 py-2.5 hover:border-gray-400">
                <input
                    type="checkbox"
                    id={`checkbox${item.id}`}
                    className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0
                    after:top-0 after:h-full after:w-full after:bg-gray-500 checked:bg-gray-500 hover:ring 
                  hover:ring-gray-300 focus:outline-none"
                />
                <label
                    onClick={changeEditItemStatus}
                    className={"w-full font-medium ms-2 text-gray-600 peer-checked:text-gray-400 peer-checked:line-through cursor-text"}
                >
                    {item.name}
                </label>
            </li>            
        )
    } else{
        return(
            <li className="flex w-full items-center justify-center gap-2.5 border-b-2 bg-white px-3 py-2.5 hover:border-gray-400">
                <input
                    type="checkbox"
                    id={`checkbox${item.id}`}
                    className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0
                    after:top-0 after:h-full after:w-full after:bg-gray-500 checked:bg-gray-500 hover:ring
                  hover:ring-gray-300 focus:outline-none"
                />
                <input
                    className={"w-full ms-2 outline-none border-transparent font-medium text-gray-600 peer-checked:text-gray-400 peer-checked:line-through "}
                    defaultValue={item.name}
                    autoFocus
                    onBlur={(event) => editItem(item.id, event.target.value)}
                    onKeyUp={handleKeyPress}

                />
            </li>   
        )    
    }
  }
  
  export default ChecklistItem;
  