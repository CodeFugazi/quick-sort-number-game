import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

// Example of Quick Sort Algorithm
const quickSort = (arr) => {
  // Base Case
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

const initialNumbers = [5, 3, 9, 7, 1, 2, 6, 4, 8, 10]; // Initial numbers to sort

const App = () => {
  const [numbers, setNumbers] = useState(initialNumbers);
  const [sorted, setSorted] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(numbers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNumbers(items);
  };

  const checkSort = () => {
    setClicked(true);
    const sortedNumbers = quickSort([...numbers]);

    if (JSON.stringify(sortedNumbers) === JSON.stringify(numbers)) {
      setSorted(true);
    } else {
      setSorted(false);
      // Add a red flash effect
      setTimeout(() => {
        setNumbers([...initialNumbers]);
        setClicked(false);
      }, 1000); // Reset after 1 second
    }
  };

  return (
    <div className="App">
      <h1>Drag and Drop Number Sort Game</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="numbers">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="numbers-container"
            >
              {numbers.map((number, index) => (
                <Draggable
                  key={`number-${number}`}
                  draggableId={`number-${number}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="number"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {number}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={checkSort} className="check-button">
        Check Sort
      </button>
      {/* Checking message */}
      {!sorted && clicked && <div>Checking...</div>}
      {!clicked && !sorted && (
        <div className="red-flash">Numbers are not sorted correctly!</div>
      )}
      {sorted && (
        <div className="success-message">
          All numbers sorted!{" "}
          <span role="img" aria-label="check-mark">
            ✅
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
