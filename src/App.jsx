import { useCallback, useEffect, useRef, useState } from "react";


function App() {

  const [length,setLength] = useState(6)
  const [password,setPassword] = useState("")
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)

  const passwordRef = useRef(null)

  const generatePassword = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*+-'
    for(let i=0; i<length; i++){
      const char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [length,numAllowed,charAllowed])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }


  useEffect(()=>{
    generatePassword()
  },[length,numAllowed,charAllowed])

  return (
    <div className="bg-slate-300 w-full h-screen py-10">
      <div className="w-1/3 h-2/5 bg-cyan-500 mx-auto my-auto rounded-3xl px-5">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            className="py-1 px-3 w-full outline-none" 
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button 
            className="text-white bg-blue-500 outline-none px-3 py-0.5 shrink-0" 
            onClick={copyPasswordToClipboard}
          >copy</button>
        </div> 
        <div className="text-sm gap-x-2"> 
          <div className="flex items-center gap-x-1 mb-3">
            <input 
              type="range"
              // min={6}
              max={25}
              className="cursor-pointer"
              value={length}
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label htmlFor="length">Length : {length}</label>
          </div> 
          <div className="flex items-center gap-x-1 mb-3">
            <input 
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={()=>setNumAllowed(prev=>!prev)}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={()=>setCharAllowed(prev=>!prev)}
            />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;