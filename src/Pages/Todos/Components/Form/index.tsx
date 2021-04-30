import React from 'react';
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  todo: yup
    .string()
    .min(3, "Todo should be of minimum 3 characters length")
    .required("Todo is required")
});

type FormProp = {
  onSubmit?: (newTodo: string) => void;
};

const Form = ({ onSubmit }: FormProp) => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      todo: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (onSubmit) {
        onSubmit(values.todo);
      }
    }
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="todo"
          name="todo"
          label="New Todo"
          value={formik.values.todo}
          onChange={formik.handleChange}
          error={formik.touched.todo && Boolean(formik.errors.todo)}
          helperText={formik.touched.todo && formik.errors.todo}
        />
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
