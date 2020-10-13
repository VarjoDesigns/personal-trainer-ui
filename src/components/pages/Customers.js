import React, { useEffect, useState } from 'react';

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

    return(
        <div>
            
        </div>
    )
}