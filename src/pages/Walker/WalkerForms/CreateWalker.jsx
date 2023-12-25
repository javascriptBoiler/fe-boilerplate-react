import { useNavigate } from "react-router-dom";
import { useState, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";

// material-ui
import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// third party
import * as Yup from "yup";
import { useFormik } from "formik";

// project import
import AnimateButton from "../../../components/@extended/AnimateButton";
import { endpoints } from "../../../config";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// ============================|| CREATE - CUSTOMER ||============================ //

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateForm = ({formik: formData}) => {

  const navigate = useNavigate();

  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    values,
  } = formData;


  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="first-name-walker-create">
           First Name
          </InputLabel>
          <OutlinedInput
            id="first-name-walker-create"
            type="text"
            value={values.firstName}
            name="firstName"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter First Name"
            fullWidth
            error={Boolean(touched.firstName && errors.firstName)}
          />
          {touched.firstName && errors.firstName && (
            <FormHelperText
              error
              id="standard-weight-helper-text-firstName"
            >
              {errors.firstName}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="last-name-walker-create">
           Last Name
          </InputLabel>
          <OutlinedInput
            id="last-name-walker-create"
            type="text"
            value={values.lastName}
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Last Name"
            fullWidth
            error={Boolean(touched.lastName && errors.lastName)}
          />
          {touched.lastName && errors.lastName && (
            <FormHelperText
              error
              id="standard-weight-helper-text-lastName"
            >
              {errors.lastName}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="rate-walker-create">
           Rate
          </InputLabel>
          <OutlinedInput
            id="rate-walker-create"
            type="number"
            value={values.rate}
            name="rate"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Walker Initial Rate"
            fullWidth
            error={Boolean(touched.rate && errors.rate)}
          />
          {touched.rate && errors.rate && (
            <FormHelperText
              error
              id="standard-weight-helper-text-rate"
            >
              {errors.rate}
            </FormHelperText>
          )}
        </Stack>
      </Grid>



      {errors.submit && (
        <Grid item xs={12}>
          <FormHelperText error>{errors.submit}</FormHelperText>
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack alignItems="center" direction="row" spacing={1} sx={{float: "right",}}>

          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              variant="outlined"
              color="secondary"
              sx={{
                width: { xs: "100%", md: "100%", lg: "100%" },
              }}
              onClick={() => navigate('/walker')}
            >
              Cancel
            </Button>
          </AnimateButton>

          <AnimateButton>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                width: { xs: "100%", md: "100%", lg: "100%" },
              }}
            >
              Create
            </Button>
          </AnimateButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

const CreateWalker = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const formik = useFormik({
    initialValues: {
      firstName: undefined,
      lastName: undefined,
      rate: undefined,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Walker First Name is required"),
      lastName: Yup.string().required("Walker Last Name is required"),
      rate: Yup.number().notRequired(),
    }),
    onSubmit: (values, actions) => handleSubmit(values, actions)
  });

  const [open, setOpen] = useState(false);

  const openMessage = () => {
    setOpen(true);
  };

  const closeMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (values, actions) => {
    const { setErrors, setStatus, setSubmitting, resetForm } = actions;
    try {
      setSubmitting(true);
      await axiosPrivate.post(`${endpoints.WALKER}`, JSON.stringify({ ...values}), {
        headers: { "Content-Type": "application/json" },
      });
      openMessage();
      resetForm();
      setStatus({ success: true });
      setSubmitting(false);
      setTimeout(() => {
        navigate("/walker");
      }, 2000);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const createForm = useMemo(() => <CreateForm {...{formik}} />, [formik]);

  return (
    <>
      <Typography variant="h4" style={{marginBottom:40}}>Create Walker</Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        {createForm}
      </form>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeMessage} severity="success" sx={{ width: "100%" }}>
          Walker successfully created.
        </Alert>
      </Snackbar>
    </>
  );
};

CreateWalker.propTypes = {
  getUsers: PropTypes.func,
  getUserPets: PropTypes.func,
};

CreateForm.propTypes = {
  formik: PropTypes.object,
  getUsers: PropTypes.func,
  getUserPets: PropTypes.func,
};

export default CreateWalker;
