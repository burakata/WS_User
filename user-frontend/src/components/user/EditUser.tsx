import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter, useHistory, useParams } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
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
      width: "100%",
    },
    formInput: {
      width: "100%"
    },
    button: {
      margin: theme.spacing(1),
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
const values: IValues = {
  name: "",
  birth_date: "",
  email: ""
}
function EditUser<RouteComponentProps>() {
  const [values, setValues] = useState({} as IValues);
  const { id } = useParams();


  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {


    const instance = axios.create({
      headers: {
        'Pragma': 'no-cache'
      }
    });

    const user = await instance.get(process.env.REACT_APP_BACKEND_URI + `/user/user/${id}`)
    await setValues(user.data);
    console.log(values)
  }

  const handleChange = (event: any) => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
  }

  const handleSubmit = (event: any) => {
    event.persist();
    axios.put(process.env.REACT_APP_BACKEND_URI + `/user/edit?userID=${id}`, values).then(data => {
      history.goBack()
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <TextField
          id="outlined-input"
          name="name"
          value={values.name}
          label=""
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="email"
          value={values.email}
          label=""
          type="email"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="birth_date"
          value={Moment(values.birth_date).toISOString().substring(0, 10)}
          label=""
          type="date"
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
          Update
      </Button>
      </div>
    </div>
  )
}

export default withRouter(EditUser);