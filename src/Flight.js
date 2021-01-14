import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Table } from "reactstrap";

export default function Flight() {
  const [formState, setFormState] = useState({
    booktype: "oneway",
    from: "",
    destination: "",
    departure: "",
    return: "",
    listEmployee: [],
    searchListEmployee: [],
  });
  useEffect(() => {
    fetch("http://dummy.restapiexample.com/api/v1/employees")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setFormState({
          listEmployee: result.data,
          searchListEmployee: result.data,
        });
      });
  }, []);
  const handleChange = (event) => {
    console.log("formState->", formState);
    const { name, value } = event.target;
    setFormState((prevState) => {
      const newState = { ...prevState };
      newState[name] = value;
      if (name === "from") {
        const filtered = newState.listEmployee.filter((res) => {
          return res.employee_name.indexOf(value) > -1;
        });
        newState.searchListEmployee = [...filtered];
        //searchListEmployee();
      }
      return newState;
    });
  };
  const searchListEmployee = () => {
    setFormState((prevState) => {
      const nextState = { ...prevState };
      const filtered = nextState.searchListEmployee.filter((res) => {
        return res.employee_name.indexOf(formState.from) > -1;
      });
      nextState.searchListEmployee = [...filtered];
      return nextState;
    });
  };
  const onSubmit = (e) => {
    if (!formState.from) {
      alert("please select From");
    }
    e.preventDefault();
  };
  return (
    <div className="App">
      <Form>
        <h1>Flight Booking</h1>
        <FormGroup>
          <Label for="type">
            <Input
              type="radio"
              id="oneway"
              onChange={handleChange}
              name="booktype"
              value="oneway"
            />
            Oneway
          </Label>
          <Label for="type">
            <Input
              type="radio"
              id="twoway"
              onChange={handleChange}
              name="booktype"
              value="twoway"
            />
            Roundway
          </Label>
        </FormGroup>
        <FormGroup>
          <input
            type="text"
            value={formState.from}
            onChange={handleChange}
            name="from"
            placeholder="FROM"
          />
          <input
            type="text"
            value={formState.destination}
            onChange={handleChange}
            name="destination"
            placeholder="DESTINATION"
          />
          <input
            type="date"
            value={formState.departure}
            onChange={handleChange}
            name="departure"
            placeholder="DEPARTURE"
          />
          <input
            type="date"
            value={formState.return}
            disabled={formState.booktype === "twoway" ? true : false}
            onChange={handleChange}
            name="return"
            placeholder="RETURN"
          />
        </FormGroup>
        <FormGroup>
          <input
            type="submit"
            name="submit"
            onClick={onSubmit}
            value="Submit"
          />
        </FormGroup>
      </Form>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee name</th>
            <th>Employee salary</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {formState.searchListEmployee.map((res) => {
            return (
              <tr key={res.id}>
                <th scope="row">{res.id}</th>
                <td>{res.employee_name}</td>
                <td>{res.employee_salary}</td>
                <td>{res.employee_age}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
