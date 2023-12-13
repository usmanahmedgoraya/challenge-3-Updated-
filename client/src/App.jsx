import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [randomNumber, setRandomNumber] = useState(0);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/random');
      setNumber(response.data.randomNumber);
      setRandomNumber(response.data.randomNumber);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (randomNumber < 0) {
      fetchData();
    }
  }, [randomNumber]);

const decreaseNum = num => {
  if(num < 1 ){
    fetchData();
  }
  setRandomNumber(num => num-1);
}

  useEffect(() => {
    const interval = setInterval(() => {
      decreaseNum(randomNumber);
      }, 1000);
      console.log(randomNumber, 'ques')
    return () => clearInterval(interval);
  }, [randomNumber]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/random');
    setNumber(response.data.randomNumber);
    setRandomNumber(response.data.randomNumber);
  
  };
  const arrayWithIndices = Array.from({ length: randomNumber }, (_, index) => index);
  return (
    <div className="App">
      <h1 className="text-4xl font-bold mb-4">Random Number: {number}</h1>
      <div className="cards-container grid grid-cols-3">
        {arrayWithIndices.map((num,index) => 
        {return (<div key={index} className='h-[10rem] w-[10rem] bg-gray-200 p-5 border-blue-800 border-2 flex justify-center items-center text-black font-bold mx-5'>{num + 1}</div>)})}
        
      </div>
    </div>
  );
};

export default App;
