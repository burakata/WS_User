import React, { useEffect, useState, Props } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { TextField, Typography, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        table: {
            minWidth: 650,
        },
        marginRight: {
            marginRight: 10
        },
        button: {
            margin: theme.spacing(1),
        },
        bck: {
            backgroundColor: 'yellow'
        }
    }),
);
export interface IValues {
    _id: number,
    name: string,
    birth_date: string,
    email: string,
    record_date: string,
    update_date: string
}

export default function SimpleTable() {
    const classes = useStyles();
    const [data, setData] = useState([] as IValues[]);
    useEffect(() => {
        getData();
    }, []);

    const [randomData, setRandomData] = useState({} as IValues);

    const getData = async () => {

        const instance = axios.create({
            headers: {
                'Pragma': 'no-cache'
            }
        });

        const users = await instance.get(process.env.REACT_APP_BACKEND_URI + `/user/users`);
        setData(users.data);
        console.log(users)
    }
    const deleteUser = async (event: any, id: number) => {
        event.persist();
        await axios.delete(process.env.REACT_APP_BACKEND_URI + `/user/delete/?userID=${id}`).then(data_ => {
            getData();

        })
    }

    const getRandomData = async () => {

        if (data.length > 0) {
            let selected = Math.floor(Math.random() * data.length);
            setRandomData(data[selected])

            while (data.length > 1 && randomData._id === data[selected]._id) {
                selected = Math.floor(Math.random() * data.length);
                setRandomData(data[selected])
            }
        }
    }

    return (
        <>
            
             
             <TableContainer>
                 <Table>
                 <TableRow>
                     <TableCell>
                     <Button variant="contained" color="primary" size="large" disabled={data.length < 1} className={classes.button} onClick={getRandomData}>Pick A Name</Button>
                     </TableCell>
                     <TableCell className={classes.bck}>
                     <h2>{randomData ? randomData.name : ''}</h2>
                     </TableCell>
                 </TableRow>
                 </Table>
             </TableContainer>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Birth Date</TableCell>
                            <TableCell align="right">Record Date</TableCell>
                            <TableCell align="right">Update Date</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(user => (
                            <TableRow key={user.name}>
                                <TableCell component="th" scope="row">
                                    {user.name}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{Moment(user.birth_date).isValid() ? Moment(user.birth_date).format('MMMM Do YYYY') : ''}</TableCell>
                                <TableCell align="right">{Moment(user.record_date).isValid() ? Moment(user.record_date).format('MMMM Do YYYY, h:mm:ss a') : ''}</TableCell>
                                <TableCell align="right">{Moment(user.update_date).isValid() ? Moment(user.update_date).format('MMMM Do YYYY, h:mm:ss a') : ''}</TableCell>
                                <TableCell align="right">
                                    <Link to={`edit/${user._id}`}> <EditIcon className={classes.marginRight} /> </Link>
                                    <DeleteIcon onClick={e => deleteUser(e, user._id)} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
