import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gettodoData,
  todoDataCreate,
  todoDataDelete,
  todoDataSelector,
  todoDataUpdate,
} from "../Reducer/reducers/dataReducer";

import { ToastContainer} from 'react-toastify';

const Todolist = () => {
  const [value, setvalue] = useState("");
  const [ids, setids] = useState("");
  const { gettododata,deletetododataLoading,updatetododataLoading,createtododataLoading,gettododataLoading } = useSelector(todoDataSelector);
  console.log(gettododata, "jjh");

  const dispatch = useDispatch();

  const [label, setlabel] = useState("Add");

  const handletodolist = (e, id) => {
    e.preventDefault();
    const type = e.target.innerText;

    console.log(type, "ggg");

    if (type === "Add") {
      const formData = { data: value };
      dispatch(todoDataCreate(formData));
      dispatch(gettodoData());
    }
    if (type === "Delete") {
      const formData = { id: id };
      dispatch(todoDataDelete(formData));
      dispatch(gettodoData());
    }
    if (type === "update") {
      const formData = { id: ids, data: value };
      console.log(formData,'ygjg')
      dispatch(todoDataUpdate(formData));
      dispatch(gettodoData());
    }
    setvalue('')
    setlabel("Add")
    setids('')
  };

  const handletodolistUpdate = (e, id, data) => {
    console.log(e, id, data, "ygjg");
    setvalue(data);
    setlabel("update");
    // handletodolist(e,id)
    setids(id)
  };

  useEffect(() => {
    dispatch(gettodoData());
  }, [deletetododataLoading,updatetododataLoading,createtododataLoading]);
  return (
    <>
      <div className="container">
        <ToastContainer/>
        
        <div className="header">
          <h4>Make Your To-Do List</h4>
        </div>
        <div className="input-box-container">
          <input
            type="text"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
          />{" "}
          <button
            onClick={(e) => {
              handletodolist(e);
            }}
          >
            {label}
          </button>
        </div>
        <div className="todo-lists">
          <table>
            <thead>
              <tr key={1}>
                <th>S.no</th>
                <th>Todo-List</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {gettododata ? (
                gettododata.map((list, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{list?.data}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          handletodolistUpdate(e, list?.id, list?.data);
                        }}
                      >
                        Edit
                      </button>{" "}
                      <button
                        onClick={(e) => {
                          handletodolist(e, list?.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>Create your to-do List</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Todolist;
