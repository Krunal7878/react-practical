import React, { useEffect, useState } from 'react'
//dialoge
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

//table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteDialog from './DeleteDialoge';
import EditIcon from '@mui/icons-material/Edit';

export default function Dashboard(props) {
    //here we can get product data with useSelector

    const [open, setOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [count, setcount] = useState(null);
    const [deleteName, setdeleteName] = useState('');
    const [isDialoge, setisDialoge] = useState('');
    const [editName, seteditName] = useState('');
    const [searchText, setsearchText] = useState('');

    //here we need to assign productData from reducer 
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        if (searchText && searchText.length !== 0) {
            let product_data = JSON.parse(localStorage.getItem("productData"))
            let newData = product_data.filter(item=> item.product_name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1)
            setProductData(newData)

        } else {
            let product_data = JSON.parse(localStorage.getItem("productData"))
            setProductData(product_data)
        }
    }, [searchText])

    useEffect(() => {
        //set data from reducer insted of localstorage
        let product_data = JSON.parse(localStorage.getItem("productData"))
        setProductData(product_data)
    }, [count])

    const handleClickOpen = (isDialoge, editData) => {
        if (isDialoge === "EDIT") {
            let find_data = productData.find(item => item.product_name === editData)
            if (find_data) {
                setName(find_data.product_name)
                setDescription(find_data.product_description)
                setPrice(find_data.product_price)
                setRating(find_data.product_rating)
            }
            // seteditData(find_data)
        }
        setisDialoge(isDialoge)
        seteditName(editData)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName("")
        setDescription("")
        setPrice("")
        setRating("")
    };

    function handleSubmit(event, isData) {
        event.preventDefault();
        if (isData === "ADD") {
            let prod_data = JSON.parse(localStorage.getItem("productData"))
            let data = []
            if (prod_data && prod_data.length > 0) {
                prod_data.map(item => {
                    data.push(item)
                })
            }

            let obj = {
                product_name: name,
                product_price: price,
                product_description: description,
                product_rating: rating
            }
            data.push(obj)
            handleClose()
            setcount(count + 1)
            //here we meed to call an action and pass data as payload insted of localstorage
            localStorage.setItem("productData", JSON.stringify(data))
        } else {
            let find_data = productData.find(item => item.product_name === editName)
            find_data.product_name = name
            find_data.product_price = price
            find_data.product_description = description
            find_data.product_rating = rating

            let find_index = productData.findIndex(item => item.product_name === deleteName)
            productData.splice(find_index)

            let data = []
            if (productData && productData.length > 0) {
                productData.map(item => {
                    data.push(item)
                })
            }
            data.push(find_data)
            handleClose()
            setcount(count + 1)
            //here we meed to call an action and pass data as payload insted of localstorage
            localStorage.setItem("productData", JSON.stringify(data))

        }
    }

    function isFormSubmit() {
        return name.length > 0 && description.length > 0 && price.length > 0 && rating.length > 0
    }

    function Logout() {
        localStorage.setItem("isLogged", null)
        props.history.push("/login")

    }
    function handleDelete() {
        let find_index = productData.findIndex(item => item.product_name === deleteName)
        productData.splice(find_index)
        localStorage.setItem("productData", JSON.stringify(productData))
        setcount(count + 1)
        handleDeleteClose()

    }
    const handleDeleteClickOpen = (e, pr_name) => {
        setIsDeleteOpen(true);
        setdeleteName(pr_name)
    };

    const handleDeleteClose = () => {
        setIsDeleteOpen(false);
    };

    function handleSearch(e) {
        setsearchText(e.target.value)
    }

    return (
        <div>
            Welcome to dashboard!
            <Button variant="contained" style={{ marginLeft: '82%' }} onClick={() => handleClickOpen("ADD", '')}>Add Product</Button>
            <Button variant="contained" onClick={Logout}>Logout</Button>
            <br />
            <br />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Search..."
                type="text"
                fullWidth
                variant="standard"
                value={searchText}
                onChange={(e) => handleSearch(e)}
            />
            <br />
            <br />
            <br />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="right">Product Description</TableCell>
                            <TableCell align="right">Product Price</TableCell>
                            <TableCell align="right">Product Rating</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productData && productData.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.product_name}
                                </TableCell>
                                <TableCell align="right">{row.product_description}</TableCell>
                                <TableCell align="right">{row.product_price}</TableCell>
                                <TableCell align="right">{row.product_rating}</TableCell>
                                <TableCell align="right"><DeleteIcon style={{ cursor: 'pointer' }} onClick={(e) => handleDeleteClickOpen(e, row.product_name)} /> <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOpen("EDIT", row.product_name)} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogTitle>{isDialoge === 'ADD' ? 'Add Product' : 'Edit Product'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Product Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="description"
                        label="Product Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="price"
                        label="Product Price"
                        type="number"
                        fullWidth
                        variant="standard"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="rating"
                        label="Product Rating"
                        type="number"
                        fullWidth
                        variant="standard"
                        InputProps={{ inputProps: { min: 0, max: 5 } }}
                        value={rating}
                        onChange={(e) => {
                            if (e.target.value <= 5) {
                                setRating(e.target.value)
                            }
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={(event) => handleSubmit(event, isDialoge)} disabled={!isFormSubmit()}>{isDialoge === 'ADD' ? 'Add Product' : 'Update'}</Button>
                </DialogActions>
            </Dialog>
            <DeleteDialog
                isDeleteOpen={isDeleteOpen}
                handleDelete={handleDelete}
                handleDeleteClose={handleDeleteClose}
            />
        </div>
    )
}
