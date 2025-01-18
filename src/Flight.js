import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Table, Alert, Spinner } from "reactstrap";

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
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Using JSONPlaceholder API as a more reliable alternative
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((result) => {
        // Format the data to match your employee structure
        const formattedData = result.map(user => ({
          id: user.id,
          employee_name: user.name,
          employee_salary: Math.floor(Math.random() * 100000),
          employee_age: Math.floor(Math.random() * 30) + 20
        }));
        
        setFormState(prevState => ({
          ...prevState,
          listEmployee: formattedData,
          searchListEmployee: formattedData,
        }));
      })
      .catch(error => {
        setError(error.message);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormState(prevState => {
      const newState = { ...prevState };
      newState[name] = value;
      
      if (name === "from") {
        const filtered = newState.listEmployee.filter((res) => {
          return res.employee_name.toLowerCase().includes(value.toLowerCase());
        });
        newState.searchListEmployee = filtered;
      }
      
      return newState;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.from) {
      setError("Please select From location");
      return;
    }
    
    if (!formState.destination) {
      setError("Please select Destination");
      return;
    }
    
    if (!formState.departure) {
      setError("Please select Departure date");
      return;
    }
    
    if (formState.booktype === "twoway" && !formState.return) {
      setError("Please select Return date for round trip");
      return;
    }
    
    // Clear any previous errors
    setError(null);
    
    // Handle form submission
    console.log("Form submitted:", formState);
    // Add your submission logic here
  };

  return (
    <div className="App">
      <Form onSubmit={onSubmit}>
        <h1>Flight Booking</h1>
        
        {error && (
          <Alert color="danger">
            {error}
          </Alert>
        )}

        <FormGroup tag="fieldset">
          <legend>Trip Type</legend>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="booktype"
                value="oneway"
                checked={formState.booktype === "oneway"}
                onChange={handleChange}
              />
              One Way
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="booktype"
                value="twoway"
                checked={formState.booktype === "twoway"}
                onChange={handleChange}
              />
              Round Trip
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="from">From</Label>
          <Input
            type="text"
            id="from"
            name="from"
            value={formState.from}
            onChange={handleChange}
            placeholder="Enter departure city"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="destination">To</Label>
          <Input
            type="text"
            id="destination"
            name="destination"
            value={formState.destination}
            onChange={handleChange}
            placeholder="Enter destination city"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="departure">Departure Date</Label>
          <Input
            type="date"
            id="departure"
            name="departure"
            value={formState.departure}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="return">Return Date</Label>
          <Input
            type="date"
            id="return"
            name="return"
            value={formState.return}
            onChange={handleChange}
            disabled={formState.booktype === "oneway"}
            required={formState.booktype === "twoway"}
          />
        </FormGroup>

        <Button color="primary" type="submit">
          Search Flights
        </Button>
      </Form>

      {isLoading ? (
        <div className="text-center mt-4">
          <Spinner color="primary" />
          <p>Loading employee data...</p>
        </div>
      ) : (
        <Table responsive striped className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Salary</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {formState.searchListEmployee.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.employee_name}</td>
                <td>${employee.employee_salary.toLocaleString()}</td>
                <td>{employee.employee_age}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}