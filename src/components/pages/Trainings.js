import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Trainings() {

    // Let's render the fetch once per render
    useEffect(() => {
        getTrainings();
    }, []);

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

    ]

    return(
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Workouts</h1>
                    <p className="lead">Display all Workouts</p>
                </div>
            </div>
            <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={trainings}
                />
            </div>
        </div>
    )
}