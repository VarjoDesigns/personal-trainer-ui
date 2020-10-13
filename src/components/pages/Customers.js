import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

export default function Customers() {

    // Let's render the fetch once per render
    useEffect(() => {
        getCustomers();
    }, []);

    // Let's first define the parameters we'll be using

    // We're going to need an array of Customers
    const [ customers, setCustomers ] = useState([]);
    // We'll use a message....
    const [ message, setMessage ] = useState('');
    // together with a Snackbar modal to give feedback to the user
    const [ open, setOpen ] = useState(false);


    //  GET FUNCTION - Reads all Customers from the server, and saves them into Customers object array
    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    console.log('Customers loaded' + customers)



    // AG GRID - Ag Grid column definitions
    const columns = [
        { HeaderName: "First name", field: 'firstname', sortable: 'true'},
        { HeaderName: "Last name", field: 'lastname', sortable: 'true' },
        { HeaderName: "Street Address", field: 'streetaddress', sortable: 'true' },
        { HeaderName: "Postcode", field: 'postcode', sortable: 'true' },
        { HeaderName: "City", field: 'city', sortable: 'true' },
        { HeaderName: "Email", field: 'email', sortable: 'true' },
    ]

    return(
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Customers</h1>
                    <p className="lead">Display all Customers</p>
                </div>
            </div>
            <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
                <AgGridReact
                    columnDefs={columns}
                    rowData={customers}
                />
            </div>
        </div>
    )
}