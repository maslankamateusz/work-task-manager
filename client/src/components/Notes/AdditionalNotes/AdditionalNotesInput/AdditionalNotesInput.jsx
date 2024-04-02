
function AdditionalNotesInput({index, placeholder, value, onChange}){
    return(
        <input
                key={index}
                placeholder={placeholder}
                defaultValue={value}
                type="text"
                className="w-5/6 h-[12%] shadow appearance-none border rounded py-2 px-2 text-center text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onBlur={(newValue) => {
                    onChange(placeholder, newValue.target.value);
                }}
            />
    );
}

export default AdditionalNotesInput;