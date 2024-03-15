import Measurements from "../Measurements/Measurements";

function Notes(){
    return (
        <div className="w-3/5 me-3 flex flex-col justify-between " >
            <div className="bg-blue-300 w-full h-3/4">
                Notes
            </div>
            <Measurements />
        </div>
    )
}

export default Notes;