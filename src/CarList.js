import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCar from './AddCar';
import EditCar from './EditCar';

export default function CarList () {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(()=> fetchData(), []);

    const fetchData = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
    };

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {        
            fetch(link, {method: 'DELETE'})
            .then(response => {
                setOpen(true);
                fetchData();
            })
            .catch(err => console.err (err))
    }
    };

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.log(err));
    }

    const updateCar = (car, link) => {
        console.log(car);
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => fetchData())
        .catch(err => console.log(err));
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
      };

    const columns = [
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
        
            Cell: row => <EditCar car={row.original} updateCar={updateCar}/>
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: '_links.self.href',
            Cell: row => <Button color='secondary' size='small' onClick={() => deleteCar(row.value)}>Delete</Button>
        },
    ]
    return (<div>
        <AddCar saveCar={saveCar}/>
        <ReactTable filterable='true' columns={columns} data={cars}/>
        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Deleted"      
      />
    </div>);
}