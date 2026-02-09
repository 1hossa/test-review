import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        // TODO: Define a RootState type and Action types instead of implicit 'any'
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {
                    // TODO: State mutation! Redux state must be immutable. push() modifies the array in place.
                    // Should return { ...state, todos: [...state.todos, action.payload] }
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                // TODO: Use createSlice and extraReducers for better TypeScript support and readability
                default:
                    return state;
            }
        }
    }
})
