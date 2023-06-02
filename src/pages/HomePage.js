import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout'
import { useArray } from '../Context/random';


const HomePage = () => {
  const[heightFactor, setHeightFactor] = useState(3);
  const [speedFactor, setSpeedFactor]= useState(1000);
  const [array, setArray] = useArray();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  // const [sort_btn, setSortBtn] = useState(false);
  // const [bars_container, setBarsContainer] = useState();
  // const [select_algo, setSelectAlgo] = useState();
  // const [speed, setSpeed] = useState();
  // const [slider, setSlider] = useState();
  // const [maxRange, setMaxRange] = useState();
  const [numOfBars, setNumberOfBars] = useState(50);
 
const renderBars = () => {
    return array.length? array.map((value, index) => (
      <div
        key={index}
        className="bar"
        style={{ height: `${value * heightFactor}px` }}
      ></div>
    )) : "Array is Empty";
};

const randomClick = () => {
  const elements = document.getElementsByClassName('bar');
  const array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = Math.floor(Math.random() * 150) + 1;
    elements[i].style.backgroundColor = 'aqua';
  }
  setArray(array);
};

const handleSliderChange = (e) => {
  let newValue = e.target.value;
  setNumberOfBars(newValue);
};

const handleSpeedFactor = (e)=>{
  let newValue = e.target.value;
  setSpeedFactor(newValue);
}

//========================== bubble Sort =================================

const BubbleSort= async ()=>{
  const length = array.length;
  let tempArray = [...array];
  const elements = document.getElementsByClassName('bar');
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      elements[j].style.backgroundColor = 'tomato';
      elements[j + 1].style.backgroundColor = 'tomato';
      await new Promise((resolve) => setTimeout(resolve, speedFactor));
      if (tempArray[j] > tempArray[j + 1]) {
        let temp = tempArray[j];
        tempArray[j] = tempArray[j + 1];
        tempArray[j + 1] = temp;
        setArray([...tempArray]);
      }
      elements[j].style.backgroundColor = 'aqua';
      elements[j + 1].style.backgroundColor = 'aqua';
    }
    elements[length-i-1].style.backgroundColor = 'tomato';
  }
  elements[0].style.backgroundColor = 'tomato';
}


//=======================Insertion Sort==============================
const InsertionSort= async()=>{
  const length = array.length;
  let tempArray = [...array];
  const elements = document.getElementsByClassName('bar');
  for(let j=1; j<length; j++){
    for(let i =j; i>0; i--){
      elements[i].style.backgroundColor = 'tomato';
      elements[i - 1].style.backgroundColor = 'tomato';
      await new Promise((resolve) => setTimeout(resolve, speedFactor));
      if(tempArray[i-1]>tempArray[i]){
        let temp = tempArray[i];
        tempArray[i] = tempArray[i-1];
        tempArray[i-1] = temp;
        setArray([...tempArray]);
      }
      elements[i].style.backgroundColor = 'aqua';
      elements[i - 1].style.backgroundColor = 'aqua';
    }
  }
}

//=======================Quick Sort==============================

const quickSort = (arr) => {
  const elements = document.getElementsByClassName('bar');
  if (arr.length <= 1) {
    return arr;
  }

  let pivot = arr[0];
  // elements[0].style.backgroundColor = 'red';
  let leftArr = [];
  let rightArr = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      // elements[i].style.backgroundColor = 'tomato';
      leftArr.push(arr[i]);    
      // await new Promise((resolve) => setTimeout(resolve, speedFactor));
    } else {
      // elements[i].style.backgroundColor = 'green';
      rightArr.push(arr[i]);
      // await new Promise((resolve) => setTimeout(resolve, speedFactor));
    }
  }
  
  return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

const handleQuickSort= ()=>{
  const tempArray = [...array];
  const newArray = quickSort(tempArray);
  setArray([...newArray])
}

// ======================MERGE SORT===============================
const MergeSort = ()=>{
  return<>
  <h1>"Working on IT"</h1>
  </>
}


const handleSort = () => {
  switch (selectedAlgorithm) {
    case "bubble":
      BubbleSort();
      break;
    case "insertion":
      InsertionSort();
      break;
    case "merge":
      MergeSort();
      break;
    case "quick":
      handleQuickSort();
      break;
    default:
      
      break;
  }
};


useEffect(() => {
  const array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = Math.floor(Math.random() * 150) + 1;
  }
  setArray([...array]);
}, []);

  return (
    <Layout title={"Algorithm Visualizer"}>
      
       <div className="graph-container">
        
      <div className="bars_container" id="bars_container">
      {renderBars()}
      
      </div>
      <button className='btn btn-secondary' onClick={randomClick} id="randomize_array_btn">Randomize Array</button>

      </div>

      <div className="buttons_container">
    
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
       
        <input
          className='m-3'
          type="range"
          id="slider"
          min="40"
          max="80"
          step="1"
          value={numOfBars}
          onChange={handleSliderChange}
        />

         <select className='form-select m-3' value={speedFactor} onChange={handleSpeedFactor} id="speed">
         <option defaultValue={"Select Speed of Sorting"}>Select Speed of Sorting</option>
           <option value="100">Slow</option>
           <option value="50">Medium</option>
           <option value="10">Fast</option>
         </select>
         <select
  className="form-select m-3"
  name=""
  id="algo"
  value={selectedAlgorithm}
  onChange={(e) => setSelectedAlgorithm(e.target.value)}
>
  <option defaultValue={"Select Sorting Algorithm"}>Select Sorting Algorithm</option>
  <option value="bubble">Bubble Sort</option>
  <option value="insertion">Insertion Sort</option>
  <option value="merge">Merge Sort</option>
  <option value="quick">Quick Sort</option>
</select>

<button className="btn btn-success m-3" onClick={handleSort}>
  Sort
</button>
        </nav>
    </div>
    </Layout>

    
  )
}

export default HomePage