import React, { useReducer, createContext } from "react";
export const DogwalkContext = createContext();

const initialState = {
    dogs: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case "REFRESH":
            console.log('in reducer REFRESH', state);
            return {
                dogs: action.payload
            };
        default:
            console.log('in reducer DEFAULT', [...state.dogs, action.payload]);
            return {
                dogs: action.payload
            }
    }
};

export const DogwalkContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <DogwalkContext.Provider value={[state, dispatch]}>
            {props.children}
        </DogwalkContext.Provider>
    );
};