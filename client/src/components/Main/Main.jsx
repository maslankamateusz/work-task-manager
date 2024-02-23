import "./Main.scss";
import Timers from '../Timers/Timers';
import Notes from '../Notes/Notes';
import Tasks from '../Tasks/Tasks';
import Checklist from '../Checklist/Checklist';

function Main(){
    return (
        <div className='mainContainer flex md:flex-row'>
          <div className='leftZone leftFirstZone  md:w-1/2 flex flex-col justify-between items-center bg-blue-200'>
            <Timers />
          <div className="leftSecondZone md:w-full h-full flex ">
            <Notes />
            <Checklist />
          </div>
          </div>
          <div className='rightZone md:w-1/2 w-full px-3 bg-gray-700 p-8'>
            <Tasks />
          </div>
        </div>
      );
}

export default Main;
