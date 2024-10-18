import React from 'react';
import { increment, decrement } from '../../redux/actions';

const CounterControls = ({ dispatch }) => {
    return (
        <div>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default CounterControls;
