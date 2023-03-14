import React from "react";
import "./style.css";
import { useState, useEffect } from "react";

const getLocalItmes = () => {
  let list = localStorage.getItem("lists");
  console.log(list);

  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItmes());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  // Add Item Function
  const addItem = () => {
    if (!inputdata) {
      alert("Please fill the data");
    } else if (inputdata && !toggleSubmit) {
      setItems(
        items.map((element) => {
          if (element.id === isEditItem) {
            return { ...element, name: inputdata };
          }
          return element;
        })
      );
      setToggleSubmit(true);

      setInputData("");

      setIsEditItem(null);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //Delete Item Function

  const deleteItem = (index) => {
    const updateditems = items.filter((element) => {
      return index !== element.id;
    });
    setItems(updateditems);
  };

  //Remove all Item Function

  const removeAll = () => {
    setItems([]);
  };

  //useEffect to store data to local storage

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  // Edit the item
  // When user click on edit button
  // 1: get the id and name of the data which user clicked to edit
  // 2: set the toggle mode to change the submit button into edit button
  // 3: Now update the value of the setInput with the new updated value to edit.
  // 4: To pass the current element Id to new state variable for reference

  const editItem = (index) => {
    let newEditItem = items.find((element) => {
      return element.id === index;
    });
    console.log(newEditItem);

    setToggleSubmit(false);

    setInputData(newEditItem.name);

    setIsEditItem(index);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <img src="./images/todo.jpg" alt="todo-logo" />
          <h1 className="heading">Add your list here </h1>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleSubmit ? (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            ) : (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* Show Items */}
          <div className="showItems">
            {items.map((element) => {
              return (
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(element.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(element.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clear Buttons */}
          <div className="showItems">
            <button
              className="btn effect04"
              // data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              Remove All
              {/* <span> CHECK LIST </span> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
