import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './Customers.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

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

    // DELETE FUNCTION

    const deleteCustomer = (link) => {
        console.log("It seems that you are looking to delete the customer. Are you sure?")
        if (window.confirm("Are you sure? This can't be reversed!")){
          // If true, let's run delete!
          console.log("Let's delete that customer! Soon it'll be but a memory! Customer ID was: " + link);
          // Let's delete that customer! Soon it'll be but a memory!
          fetch(link, {method: 'DELETE'})
          .then(response => getCustomers())
          .catch(error => console.error(error))
          
          // Let's use the snackbar to show the customer was deleted...
          setMessage('Customer deleted');
          setOpen('true');
  
          
        }
       // If the user doesn't confirm, we'll do nothing at all
      }



   // TABLE COLUMNS
    const columns = [
        { Header: "First name", accessor: 'firstname', sortable: true },
        { Header: "Last name", accessor: 'lastname', sortable: true },
        { Header: "Street Address", accessor: 'streetaddress', sortable: true },
        { Header: "Postcode", accessor: 'postcode', sortable: true },
        { Header: "City", accessor: 'city', sortable: true },
        { Header: "Email", accessor: 'email', sortable: true },
        { // Edit Customers
            Header: 'Edit',
            sortable: false,
            filterable: false,
            width: 80,
            /* Cell: row => (
              <EditCustomer 
              customer={row.original} 
              updateCustomer={updateCustomer} />) */
          },
          { // Let's add a button for deleting rows
          Header: 'Delete',
          accessor: 'links[0].href',
          Cell: row => 
              <IconButton 
                startIcon={<DeleteIcon />}
                variant="contained" 
                color="secondary" 
                onClick={() => deleteCustomer(row.value)} 
                ><DeleteIcon />
              </IconButton>, // row.value acesses the value of the cell, and it's being sent to the delete function
          sortable: false,
          filterable: false,
          width: 80
        }
    ]


    const handleClose = () => {
        setOpen(false);
      }

    // RETURN FOR RENDER

    return(
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Customers</h1>
                    <p className="lead">Display all Customers</p>
                </div>
            </div>
            <div className="ag-theme-material" style={{height: '700px', width: '80%', margin: 'auto'}}>
                <ReactTable className="ReactTable" filterable={true} data={customers}  columns={columns} defaultPageSize={15} />
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} message={message} />
            </div>
        </div>
    )
}