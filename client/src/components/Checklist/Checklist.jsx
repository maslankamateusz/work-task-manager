import ChecklistItem from "./ChecklistItem/ChecklistItem";

function Checklist() {
  return (
    <div className="bg-green-300 w-2/5 ">
        <div className="pt-2">
          <p className="text-center text-3xl">Daily Checklist</p>
        </div>
        <ul className="w-full px-2">
          <ChecklistItem />
          <ChecklistItem />
        </ul>
      
    </div>
  );
}

export default Checklist;
