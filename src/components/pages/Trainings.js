import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { GridApi, PropertyKeys } from 'ag-grid-community';

export default function Trainings() {

    // Let's render the fetch once per render
    useEffect(() => {
        getTrainings();
    }, []);

    const gridRef = useRef();

    // Let's first define the parameters we'll be using

    // We're going to need an array of Customers
    const [ trainings, setTrainings ] = useState([]);
    // We'll use a message....
    const [ message, setMessage ] = useState('');
    // together with a Snackbar modal to give feedback to the user
    const [ open, setOpen ] = useState(false);


    //  GET FUNCTION - Reads all Customers from the server, and saves them into Customers object array
    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
    }

        // Get the updated list
    
    const buttonClick = (e) => {
        console.log("eh");
    } 

    // AG GRID - Ag Grid column definitions
    const columns = [
        { headerName: "Activity", field: 'activity', sortable: true, filter: true },
        { headerName: "Date", field: 'date', sortable: true, filter: true },
        { headerName: "Duration", field: 'duration', sortable: true, filter: true },
        { 
            headerName: "Customer",  
            sortable: 'true',
            filter: true,
            cellRenderer: function(params) {
                return (
                    params.data.customer.firstname + " " + params.data.customer.lastname
                )
            }
        },
        { 
            headerName: "Delete", 
            cellRenderer: function(params) {
                return (
                    params.data.id
                )
            },
            sortable: false, 
            filter: false, 
        },

    ]

    return(
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Workouts</h1>
                    <p className="lead">Display all Workouts</p>
                </div>
            </div>
            <div className="Buttons">
                <button className="btn btn-outline-danger"  onClick={buttonClick}>Delete</button>
            </div>
            <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                    animateRows={true}
                    ref={gridRef}
                    onGridReady={ params => gridRef.current = params.api }
                    rowSelection="single"
                />
            </div>
        </div>
    )
}