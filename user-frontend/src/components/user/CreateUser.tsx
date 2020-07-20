import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import DateFnsUtils from '@date-io/date-fns'; 
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 400,
        display: "block"
      },
    },
    wrapper: {
        width:"100%",
    },
    formInput: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '300ch',
    },
  }),
);

export interface IValues {
  name: string,
  birth_date: string,
  email: string
}

export interface IFormState {
    [key: string]: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}
const defaultValues: IValues = {
    name: "",
    birth_date: "",
    email: ""
}
function CreateUser<RouteComponentProps>() {
    const [values, setValues] = useState(defaultValues as IValues);

    const classes = useStyles();
    const history = useHistory();
    
    const handleChange = (event: any) => {
        event.persist();
        setValues(values => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }

    const handleSubmit = (event:any) => {
        event.persist();
        values.birth_date = Moment(values.birth_date).toISOString().substring(0,10);

        const instance = axios.create({
          headers: {
            'Pragma': 'no-cache'
          }
        });

        instance.post(process.env.REACT_APP_BACKEND_URI + `/user/user`, values).then(data => [
              history.goBack()
          ]);
    }

    return ( 
        <div className={classes.root}>
        <div className={classes.wrapper}>
        <TextField
          id="outlined-input"
          name="name"
          label="Name"
          type="text"
          defaultValue={values.name}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
         <TextField
          id="outlined-input"
          name="email"
          label="Email Address"
          type="email"
          defaultValue={values.email}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          
          id="outlined-input"
          name="birth_date"
          label="Birth Date (Ex:1980-07-09)"
          type="date"
          defaultValue={values.birth_date}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handleSubmit}
      >
        Save
      </Button>
        </div>
      </div>
    )
}

export default withRouter(CreateUser);