import React from "react";
import {useState} from 'react'
export interface MyButtonProps{
  componentName?:string
}
function MyButton(props:MyButtonProps){
  const [count, setCount] = useState(0);
  const handle = () => {
    setCount(count + 3);
  }
  return (
    <>
      <div>Provided by RemoteReactTs Project - {props.componentName?props.componentName:"MyButton.ts"}</div>
      <button onClick={handle}>click me</button>
      <div>{count}</div>
    </>
  );
};
export default MyButton;