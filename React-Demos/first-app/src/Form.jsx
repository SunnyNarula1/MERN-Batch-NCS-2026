import { useState } from "react";
export default function Form() {
    const [name, setName] = useState('')
    // function getValue(e){
    //     setName(e.target.value)
    // }
    return (
        <div className="text-center">
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
            <p>Hello, {name}</p>
        </div>
    )
}