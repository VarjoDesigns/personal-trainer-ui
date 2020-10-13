import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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



    // REACT TABLES
    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        }
    ]

    return(
        <div>
            <h1>Customers</h1>
            <ReactTable
                filterable={true}
                data={customers}
                columns={columns}
                defaultPageSize={50}
            />
        </div>
    )
}