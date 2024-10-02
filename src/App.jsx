import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [passward, setPassward] = useState("");

  const passwordRef = useRef(null);
  const generateRandomPassward = useCallback(() => {
    let result = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "123456789";
    if (char) str += "!@#$%^&*(){}<>?[]";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      result += str.charAt(char);
    }
    setPassward(result);
  }, [length, number, char, setPassward]);

  useEffect(() => {
    generateRandomPassward();
  }, [length, setNumber, setLength, generateRandomPassward]);
  const copy = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(passward);
  }, [passward]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 w-screen">
      <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg w-2/4 h-1/2">
        <h1 className="text-white text-4xl text-center">Password Generator</h1>
        <div className="flex overflow-hidden rounded-lg  mt-8">
          <input
            type="text"
            className="w-full p-2 mb-4 text-black bg-white rounded-md"
            value={passward}
            placeholder="Generated Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="bg-gray-400 outline-none shrink-0 hover:bg-gray-500 text-white p-2 mb-4 
          rounded-md transition duration-300"
            onClick={copy}
          >
            Copy
          </button>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white p-2 mb-4 mt-3 rounded-md transition
           duration-300 text-center w-full"
          onClick={generateRandomPassward}
        >
          Generate Password
        </button>
        <div className="flex text-sm  gap-x-2 mt-3">
          <div className="flex text-base  gap-x-1">
            <input
              type="range"
              min={5}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center  text-base mx-3">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={(e) => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput"> Numbers </label>
          </div>
          <div className="flex items-center  text-base mx-3">
            <input
              type="checkbox"
              defaultChecked={char}
              id="charInput"
              onChange={(e) => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="charInput"> Characters </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
