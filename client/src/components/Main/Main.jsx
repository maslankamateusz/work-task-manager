import "./Main.scss";
import Timers from '../Timers/Timers';
import Notes from '../Notes/Notes';
import Tasks from '../Tasks/Tasks';
import Checklist from '../Checklist/Checklist';

function Main(){
    return (
        <div className='mainContainer flex md:flex-row mt-1 bg-gray-200'>
          {/* <button className='absolute shadow-sm btn btn-success btn-sm h-10 px-3 ms-2 ' type='button'>
              Save
          </button> */}
          <div className='leftZone leftFirstZone  md:w-1/2 flex flex-col justify-between items-center '>
            <Timers />
          <div className="leftSecondZone md:w-full h-full flex ">
            <Notes />
            <Checklist />
          </div>
          </div>
          <div className='rightZone md:w-1/2 w-full px-3 p-8 bg-stone-300' >
            <Tasks />
          </div>
        </div>
      );
}

export default Main;
