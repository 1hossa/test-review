import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    // TODO: Avoid 'any' type, use 'Todo' interface
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}

export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    // TODO: Syncing state from props in componentDidUpdate is usually an anti-pattern (derived state). 
    // Consider making this component fully controlled or uncontrolled with a key.
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        // TODO: event.keyCode is deprecated. Use event.key === 'Enter'.
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        // TODO: Use 'const' or 'let' instead of 'var'.
        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
