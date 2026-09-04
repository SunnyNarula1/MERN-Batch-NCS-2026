import { useState } from "react";
export default function User() {
    const [count, setCount] = useState(0)
    function incrementCount() {
        setCount(count+1)
    }
    return (
        <div className="text-center">
            <h2>Count - {count}</h2>
            <button type="button" onClick={incrementCount} >Increment</button>
        </div>
    )
}