function ChecklistItem() {
    return (
    <li className="flex w-full items-center justify-center gap-2.5 border-b-2 bg-white px-3 py-3.5 hover:border-gray-400">
        <input type="checkbox" id="checkbox1" className="peer relative h-5 w-5 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gray-500 checked:bg-gray-500 hover:ring hover:ring-gray-300 focus:outline-none" />
        <label htmlFor="checkbox1" className="w-full cursor-pointer font-medium text-gray-600 peer-checked:text-gray-400 peer-checked:line-through"> Do Something for 1 hour </label>
    </li>
    );
  }
  
  export default ChecklistItem;