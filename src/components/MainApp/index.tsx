import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';


type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};

class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        // TODO: Missing semicolon and inconsistent quote usage
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        const { todoTitle } = this.state;
        // TODO: window.allTodosIsDone is a global variable anti-pattern. Use local variable or state/selectors.
        window.allTodosIsDone = true;

        // TODO: Logic bug: window.allTodosIsDone will only reflect the state of the LAST todo in the map.
        // Should use .every(t => t.isDone) instead of .map.
        // Also can decompose props to get only todos for better readability
        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                {/* TODO: Use functional components and hooks instead of class components where possible */}
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (
                    // TODO: Missing 'key' prop for list element 
                    // TODO: Inconsistent indentation in the map block
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            // TODO: Avoid using magic numbers in inline styles
                            style={{ marginTop: -8, marginLeft: 5 }}
                            // TODO: Avoid inline functions in render for performance (re-renders) and make every prop from new line    
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                            // TODO: Annotate 'changedTodos' type explicitly for clarity
                            const changedTodos = this.props.todos.map((t, index) => {
                                // TODO: logic could be simplified without initial var 'res'.
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)

                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

// TODO: Use useSelector and useDispatch instead of 'connect' HOC
export default connect(
    (state) => ({}),
    (dispatch) => ({
        // TODO: Use 'Todo' type instead of 'any'
        addTodo: (todo: any) => {
            // TODO: Move action strings to constants or use createAction/createSlice
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
