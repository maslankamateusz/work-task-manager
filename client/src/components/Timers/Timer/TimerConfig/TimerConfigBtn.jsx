
export default function TimerConfiBtn({ handleClick }) {
    return (
        <div className="relative">
            <button className="text-gray-700 hover:text-black" onClick={handleClick}>Config</button>
        </div>
    );
}
