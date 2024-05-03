import { useState, useRef } from "react";

export default function TimerDescription({ title, addTime }) {
    const [addTimeToggle, setAddTimeToggle] = useState(false);
    const addedTime = useRef();

    const onButtonClick = () => {
        setAddTimeToggle((prev) => !prev);
    }

    const onAddTime = () => {
        addTime(addedTime.current.value);
    }

    return (
        <div className="h-full text-center">
            <h4 className="pt-3 pb-2">{title}</h4>
            
            {!addTimeToggle ? (
                <button 
                    className="bg-indigo-500 hover:bg-indigo-600 text-xs lg:text-sm text-white px-2 p-2 rounded-xl shadow-md transition-colors duration-300 ease-in-out" 
                    onClick={onButtonClick}
                >
                    Add time
                </button>
            ) : (
                <>
                    <input 
                        type="number" 
                        style={{ width: "85%" }} 
                        className="rounded px-2 py-1"
                        ref={addedTime}
                    />
                    <button 
                        className="bg-indigo-500 hover:bg-indigo-600 text-sm text-white px-2 p-2 rounded-xl shadow-md transition-colors duration-300 ease-in-out mt-2" 
                        onClick={() => {
                            onButtonClick();
                            onAddTime();
                        }}
                    >
                        Add time
                    </button>
                </>
            )}
        </div>
    );
}
