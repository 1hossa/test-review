import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    // TODO: Avoid 'any[]', use 'Todo[]' type from MainApp for consistency
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    React.useEffect(
        () => {
            console.log('userSelect');
            // TODO: Add error handling for fetch ( .catch() )
            // TODO: Consider moving API calls to a separate service or thunk
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    // TODO: Define a proper interface for User (from options) instead of 'never[]' or 'any'
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    // TODO: Indentation of function body is inconsistent
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {
                console.log('props.user', props.user);
                res.user = e.target.value;
            }
            return res;
        })
        // TODO: Possible typo in action type? Rename 'CHANGE_TODOS' to 'CHANGE_TODO'
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        // TODO: Missing 'value' prop to make it a controlled component
        <select name="user" className={styles.user} onChange={handleChange}>
            {/* TODO: Add 'key' prop to option and avoid 'any' type */}
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
