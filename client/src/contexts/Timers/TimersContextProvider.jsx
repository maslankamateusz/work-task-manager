import React, { createContext, useState } from 'react';

const TimersContext = createContext();

const TimersContextProvider = ({ children }) => {


    return (
        <TimersContext.Provider >
            {children}
        </TimersContext.Provider>
    );
};

export { TimersContext, TimersContextProvider };
