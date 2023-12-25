import { useNavigate } from "react-router-dom";
import { useState, forwardRef, useEffect, useMemo } from "react";
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
import { useSelector} from "react-redux";

// project import
import AnimateButton from "../../../components/@extended/AnimateButton";
import { endpoints } from "../../../config";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import DatePicker from "../../../components/DatePicker";

// ============================|| CREATE - CUSTOMER ||============================ //

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateForm = ({userdata, formik: formData}) => {

  const navigate = useNavigate();
  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    values,
    setFieldValue,
    setValues,
  } = formData;

  useEffect(() => {
    if (userdata?.id && setValues ) {
      const {email, title, firstName, lastName, mobile, image, addressLineOne, addressLineTwo, city, country, latitude, longitude, note, postalCode, province, recommendedNextVisit, userStatus} = userdata;
      setValues({email, title, firstName, lastName, mobile, image, addressLineOne, addressLineTwo, city, country, latitude, longitude, note, postalCode, province, recommendedNextVisit: new Date(recommendedNextVisit), userStatus});
    }
  }, [userdata?.id, setValues]);

  return (
    <Grid container spacing={3}>
      {/* email */}
      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="email-customer-create">Email</InputLabel>
          <OutlinedInput
            id="email-customer-create"
            type="email"
            value={values.email}
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter email"
            fullWidth
            error={Boolean(touched.email && errors.email)}
          />
          {touched.email && errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.email}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="title-customer-create">Title</InputLabel>
          <OutlinedInput
            id="title-customer-create"
            type="text"
            value={values.title}
            name="title"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Title"
            fullWidth
            error={Boolean(touched.title && errors.title)}
          />
          {touched.title && errors.title && (
            <FormHelperText error id="standard-weight-helper-text-title-login">
              {errors.title}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="first-name-customer-create">
            First Name
          </InputLabel>
          <OutlinedInput
            id="first-name-customer-create"
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
              id="standard-weight-helper-text-firstName-login"
            >
              {errors.firstName}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="last-name-customer-create">Last Name</InputLabel>
          <OutlinedInput
            id="last-name-customer-create"
            type="text"
            value={values.lastName}
            name="lastName"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter last Name"
            fullWidth
            error={Boolean(touched.lastName && errors.lastName)}
          />
          {touched.lastName && errors.lastName && (
            <FormHelperText
              error
              id="standard-weight-helper-text-lastName-login"
            >
              {errors.lastName}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="mobile-customer-create">Mobile No</InputLabel>
          <OutlinedInput
            id="mobile-customer-create"
            type="text"
            value={values.mobile}
            name="mobile"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Mobile No"
            fullWidth
            error={Boolean(touched.mobile && errors.mobile)}
          />
          {touched.mobile && errors.mobile && (
            <FormHelperText error id="standard-weight-helper-text-mobile-login">
              {errors.mobile}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="address-one-customer-create">
            Address Line 1
          </InputLabel>
          <OutlinedInput
            id="address-one-customer-create"
            type="text"
            value={values.addressLineOne}
            name="addressLineOne"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Address Line 1"
            fullWidth
            error={Boolean(touched.addressLineOne && errors.addressLineOne)}
          />
          {touched.addressLineOne && errors.addressLineOne && (
            <FormHelperText
              error
              id="standard-weight-helper-text-addressLineOne-login"
            >
              {errors.addressLineOne}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="address-two-customer-create">
            Address Line 2
          </InputLabel>
          <OutlinedInput
            id="address-two-customer-create"
            type="text"
            value={values.addressLineTwo}
            name="addressLineTwo"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Address Line 2"
            fullWidth
            error={Boolean(touched.addressLineTwo && errors.addressLineTwo)}
          />
          {touched.addressLineTwo && errors.addressLineTwo && (
            <FormHelperText
              error
              id="standard-weight-helper-text-addressLineTwo-login"
            >
              {errors.addressLineTwo}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="city-customer-create">City</InputLabel>
          <OutlinedInput
            id="city-customer-create"
            type="text"
            value={values.city}
            name="city"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter City Name"
            fullWidth
            error={Boolean(touched.city && errors.city)}
          />
          {touched.city && errors.city && (
            <FormHelperText error id="standard-weight-helper-text-city-login">
              {errors.city}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="country-customer-create">Country</InputLabel>
          <OutlinedInput
            id="country-customer-create"
            type="text"
            value={values.country}
            name="country"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Country Name"
            fullWidth
            error={Boolean(touched.country && errors.country)}
          />
          {touched.country && errors.country && (
            <FormHelperText
              error
              id="standard-weight-helper-text-country-login"
            >
              {errors.country}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="latitude-customer-create">Latitude</InputLabel>
          <OutlinedInput
            id="latitude-customer-create"
            type="number"
            value={values.latitude}
            name="latitude"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Latitude"
            fullWidth
            error={Boolean(touched.latitude && errors.latitude)}
          />
          {touched.latitude && errors.latitude && (
            <FormHelperText
              error
              id="standard-weight-helper-text-latitude-login"
            >
              {errors.latitude}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="longitude-customer-create">Longitude</InputLabel>
          <OutlinedInput
            id="longitude-customer-create"
            type="number"
            value={values.longitude}
            name="longitude"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Longitude"
            fullWidth
            error={Boolean(touched.longitude && errors.longitude)}
          />
          {touched.longitude && errors.longitude && (
            <FormHelperText
              error
              id="standard-weight-helper-text-longitude-login"
            >
              {errors.longitude}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="postalCode-customer-create">
            Postal Code
          </InputLabel>
          <OutlinedInput
            id="postalCode-customer-create"
            type="text"
            value={values.postalCode}
            name="postalCode"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Postal Code"
            fullWidth
            error={Boolean(touched.postalCode && errors.postalCode)}
          />
          {touched.postalCode && errors.postalCode && (
            <FormHelperText
              error
              id="standard-weight-helper-text-postalCode-login"
            >
              {errors.postalCode}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="province-customer-create">Province</InputLabel>
          <OutlinedInput
            id="province-customer-create"
            type="text"
            value={values.province}
            name="province"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Province Name"
            fullWidth
            error={Boolean(touched.province && errors.province)}
          />
          {touched.province && errors.province && (
            <FormHelperText
              error
              id="standard-weight-helper-text-province-login"
            >
              {errors.province}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="recommendedNextVisit-customer-create">
            Recommended Next Visit
          </InputLabel>
          <DatePicker
            id="recommendedNextVisit-customer-create"
            value={values?.recommendedNextVisit || null}
            onChange={setFieldValue}
            onBlur={handleBlur}
            name="recommendedNextVisit"
            error={Boolean(touched.recommendedNextVisit && errors.recommendedNextVisit)}
          />
          {touched.recommendedNextVisit && errors.recommendedNextVisit && (
            <FormHelperText
              error
              id="standard-weight-helper-text-recommendedNextVisit-login"
            >
              {errors.recommendedNextVisit}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={12} lg={12}>
        <Stack spacing={1}>
          <InputLabel htmlFor="note-customer-create">Note</InputLabel>
          <OutlinedInput
            id="note-customer-create"
            type="textArea"
            value={values.note}
            name="note"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Your Note"
            fullWidth
            error={Boolean(touched.note && errors.note)}
          />
          {touched.note && errors.note && (
            <FormHelperText error id="standard-weight-helper-text-note-login">
              {errors.note}
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
              onClick={() => navigate('/customer')}
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
              Update
            </Button>
          </AnimateButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

const UpdateCustomer = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { updateUser: userdata } = useSelector(
    (state) => state.user
  );

  const formik = useFormik({
    initialValues: {
      email: undefined,
      title: undefined,
      firstName: undefined,
      lastName: undefined,
      mobile: undefined,
      image: undefined,
      addressLineOne: undefined,
      addressLineTwo: undefined,
      city: undefined,
      country: undefined,
      latitude: undefined,
      longitude: undefined,
      note: undefined,
      postalCode: undefined,
      province: undefined,
      recommendedNextVisit: undefined,
      userStatus: undefined,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
      title: Yup.string().required("Title is required"),
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      mobile: Yup.string().required("Mobile is required"),
      image: Yup.string().notRequired(),
      addressLineOne: Yup.string().required("Address is required"),
      addressLineTwo: Yup.string().notRequired(),
      city: Yup.string().required("City is required"),
      country: Yup.string().required("Country is required"),
      latitude: Yup.string().notRequired(),
      longitude: Yup.string().notRequired(),
      note: Yup.string().notRequired(),
      postalCode: Yup.string().required("Postal Code is required"),
      province: Yup.string().notRequired(),
      recommendedNextVisit: Yup.string().notRequired(),
      userStatus: Yup.string().required("User Status is required"),
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
      await axiosPrivate.patch(`${endpoints.USER}/${userdata?.id}`, JSON.stringify({ ...values }), {
        headers: { "Content-Type": "application/json" },
      });
      openMessage();
      resetForm();
      setStatus({ success: true });
      setSubmitting(false);
      setTimeout(() => {
        navigate("/customer");
      }, 2000);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const updateForm = useMemo(() => <UpdateForm {...{ userdata, formik}} />, [userdata, formik]);

  return (
    <>
      <Typography variant="h4" style={{marginBottom:40}}>Edit User</Typography>
      <form noValidate onSubmit={formik.handleSubmit}>
        {updateForm}
      </form>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={closeMessage} severity="success" sx={{ width: "100%" }}>
          User successfully Updated.
        </Alert>
      </Snackbar>
    </>
  );
};

UpdateCustomer.propTypes = {
  userdata: PropTypes.object,
  isloading: PropTypes.bool,
};

UpdateForm.propTypes = {
  formik: PropTypes.object,
  userdata: PropTypes.object,
};

export default UpdateCustomer;
