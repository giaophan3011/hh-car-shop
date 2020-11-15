import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const initialCarState = {
    brand: '', model: '', color: '', fuel: '', price: '', year: ''
}

export default function AddCar (props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState(initialCarState);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleInputChange = (event) => {
        setCar({...car, [event.target.name]: event.target.value})
    };

    const addCar = () => {
        props.saveCar(car);
        handleClose();
    }

 

    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add car
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New car</DialogTitle>
            <DialogContent>              
              <TextField
                autoFocus
                margin="dense"
                value={car.brand}
                label="Brand"
                onChange={(e)=> handleInputChange(e)}                
                fullWidth
                name="brand"
              />
              <TextField
                autoFocus
                margin="dense"
                value={car.model}
                label="Model"
                onChange={(e)=> handleInputChange(e)}                
                fullWidth
                name="model"
              />
              <TextField
                autoFocus
                margin="dense"
                value={car.color}
                label="Color"
                onChange={(e)=> handleInputChange(e)}                
                fullWidth
                name="color"
              />
              <TextField
                autoFocus
                margin="dense"
                value={car.year}
                label="Year"
                onChange={(e)=> handleInputChange(e)}                
                fullWidth
                name="year"
              />
              <TextField
                autoFocus
                margin="dense"
                value={car.fuel}
                label="Fuel"
                onChange={(e)=> handleInputChange(e)}                
                fullWidth
                name="fuel"
              />
              <TextField
                autoFocus
                margin="dense"
                value={car.price}
                label="Price"
                onChange={(e)=> handleInputChange(e)}                
                fullWidth
                name="price"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={addCar} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}