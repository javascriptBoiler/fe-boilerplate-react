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
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// third party
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

// project import
import AnimateButton from "../../../components/@extended/AnimateButton";
import { endpoints } from "../../../config";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import DatePicker from "../../../components/DatePicker";

// ============================|| CREATE - CUSTOMER ||============================ //

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CreateForm = ({formik: formData, getUsers, getUserPets}) => {

  const [value, setValue] = useState([]);

  const navigate = useNavigate();
  const {
    listUserForAppointment,
  } = useSelector((state) => state.user);
  
  const {
    petsForAppointment,
  } = useSelector((state) => state.pet);

  const {
    walkers,
  } = useSelector((state) => state.walker);

  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    values,
    setTouched,
    setFieldValue,
  } = formData;

  const optionList = listUserForAppointment.map(({email, firstName, lastName, id }) =>({label: `${firstName} ${lastName} - (${email})`, id}))
  const petOptionList = petsForAppointment.map(({name, type, id }) =>({label: `${name} - (${type})`, id}));
  const walkerOptionList = walkers.map(({firstName, lastName, id }) =>({label: `${firstName} ${lastName}`, id})) 

  const handlePetList = (val) => {
    getUserPets(`?ownerID=${val?.id}`);
    setFieldValue('petID', undefined);
  }

  return (
    <Grid container spacing={3}>
      {/* email */}
      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="user-appointment-create">User</InputLabel>

          <Autocomplete
            disablePortal
            id="user-appointment-create"
            size='small'
            name='userID'
            options={optionList}
            onBlur={() => setTouched({ 'userID': true })}
            onChange={(e, val) => {setFieldValue('userID', val?.id); handlePetList(val)}}
            onInputChange={(e, val) => getUsers(true, `?keyword=${val}`)}
            error={Boolean(touched.userID && errors.userID)}
            renderInput={(params) => <TextField {...params} error={Boolean(touched.userID && errors.userID)} placeholder='Select User'/>}
          />
          {touched.userID && errors.userID && (
            <FormHelperText error id="standard-weight-helper-text-userID">
              {errors.userID}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="pet-appointment-create">Pet</InputLabel>
          <Autocomplete
            disablePortal
            id="pet-appointment-create"
            size='small'
            name='petID'
            options={petOptionList}
            onBlur={() => setTouched({ 'petID': true })}
            onChange={(e, val) => setFieldValue('petID', val?.id)}
            error={Boolean(touched.petID && errors.petID)}
            renderInput={(params) => <TextField {...params} error={Boolean(touched.petID && errors.petID)} placeholder='Select User'/>}
          />
          {touched.petID && errors.petID && (
            <FormHelperText error id="standard-weight-helper-text-petID">
              {errors.petID}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="walker-appointment-create">
            Walker
          </InputLabel>
          <Autocomplete
            multiple
            id="walker-appointment-create"
            size='small'
            name='walker'
            options={walkerOptionList.filter((each) => !value.includes(each?.id))}
            onBlur={() => setTouched({ 'walker': true })}
            onChange={(e, val) => {
              setFieldValue('walker', val.map((each) => each.id));
              setValue([...val.map((each) => each.id)]);
            }}
            error={Boolean(touched.walker && errors.walker)}
            getOptionLabel={(option) => option.label}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  style={{height:22}}
                  key={index}
                  label={option.label}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => <TextField {...params} error={Boolean(touched.walker && errors.walker)} placeholder='Select Walkers'/>}
          />
          {touched.walker && errors.walker && (
            <FormHelperText
              error
              id="standard-weight-helper-text-walker"
            >
              {errors.walker}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="start-at-appointment-create">Start At</InputLabel>
          <DatePicker
            id="start-at-appointment-create"
            value={values?.startAt || null}
            onChange={setFieldValue}
            onBlur={handleBlur}
            name="startAt"
            error={Boolean(touched.startAt && errors.startAt)}
          />
          {touched.startAt && errors.startAt && (
            <FormHelperText
              error
              id="standard-weight-helper-text-startAt"
            >
              {errors.startAt}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="end-at-appointment-create">End At</InputLabel>
          <DatePicker
            id="end-at-appointment-create"
            value={values?.endAt || null}
            onChange={setFieldValue}
            onBlur={handleBlur}
            name="endAt"
            error={Boolean(touched.endAt && errors.endAt)}
          />
          {touched.endAt && errors.endAt && (
            <FormHelperText
              error
              id="standard-weight-helper-text-endAt"
            >
              {errors.endAt}
            </FormHelperText>
          )}
        </Stack>
      </Grid>


      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="time-spent-appointment-create">
            Time Spent
          </InputLabel>
          <OutlinedInput
            id="time-spent-appointment-create"
            type="number"
            value={values.timeSpent}
            name="timeSpent"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Spent Time"
            fullWidth
            error={Boolean(touched.timeSpent && errors.timeSpent)}
          />
          {touched.timeSpent && errors.timeSpent && (
            <FormHelperText
              error
              id="standard-weight-helper-text-timeSpent"
            >
              {errors.timeSpent}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="milage-before-appointment-create">
            Milage Before
          </InputLabel>
          <OutlinedInput
            id="milage-before-appointment-create"
            type="number"
            value={values.mileageBefore}
            name="mileageBefore"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Milage Before"
            fullWidth
            error={Boolean(touched.mileageBefore && errors.mileageBefore)}
          />
          {touched.mileageBefore && errors.mileageBefore && (
            <FormHelperText
              error
              id="standard-weight-helper-text-mileageBefore"
            >
              {errors.mileageBefore}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="milage-after-appointment-create">
            Milage After
          </InputLabel>
          <OutlinedInput
            id="milage-after-appointment-create"
            type="number"
            value={values.mileageAfter}
            name="mileageAfter"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Milage After"
            fullWidth
            error={Boolean(touched.mileageAfter && errors.mileageAfter)}
          />
          {touched.mileageAfter && errors.mileageAfter && (
            <FormHelperText
              error
              id="standard-weight-helper-text-mileageAfter"
            >
              {errors.mileageAfter}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="cost-estimate-appointment-create">
            Cost Estimate
          </InputLabel>
          <OutlinedInput
            id="cost-estimate-appointment-create"
            type="number"
            value={values.costEstimate}
            name="costEstimate"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Cost Estimate"
            fullWidth
            error={Boolean(touched.costEstimate && errors.costEstimate)}
          />
          {touched.costEstimate && errors.costEstimate && (
            <FormHelperText
              error
              id="standard-weight-helper-text-costEstimate"
            >
              {errors.costEstimate}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="invoice-no-appointment-create">
           Invoice No
          </InputLabel>
          <OutlinedInput
            id="invoice-no-appointment-create"
            type="text"
            value={values.invoiceNumber}
            name="invoiceNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Invoice Number"
            fullWidth
            error={Boolean(touched.invoiceNumber && errors.invoiceNumber)}
          />
          {touched.invoiceNumber && errors.invoiceNumber && (
            <FormHelperText
              error
              id="standard-weight-helper-text-invoiceNumber"
            >
              {errors.invoiceNumber}
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
              Create
            </Button>
          </AnimateButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

const CreateAppointment = ({getUsers, getUserPets}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const formik = useFormik({
    initialValues: {
      costEstimate: undefined,
      endAt: undefined,
      invoiceNumber: undefined,
      mileageAfter: undefined,
      mileageBefore: undefined,
      note: undefined,
      petID: '',
      startAt: undefined,
      timeSpent: undefined,
      userID: undefined,
      walker: undefined,
    },
    validationSchema: Yup.object().shape({
      costEstimate: Yup.string().required("Cost Estimation is required"),
      endAt: Yup.string().notRequired(),
      invoiceNumber: Yup.string().notRequired(),
      mileageAfter: Yup.number().notRequired(),
      mileageBefore: Yup.number().required("Milage Before is required"),
      note: Yup.string().notRequired(),
      petID: Yup.string().required("Pet Selection is required"),
      userID: Yup.string().required("User Selection is required"),
      startAt: Yup.string().required("Start At time is required"),
      timeSpent: Yup.number().notRequired(),
      walker: Yup.array().notRequired(),
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
      await axiosPrivate.post(`${endpoints.APPOINTMENT}`, JSON.stringify({ ...values}), {
        headers: { "Content-Type": "application/json" },
      });
      openMessage();
      resetForm();
      setStatus({ success: true });
      setSubmitting(false);
      setTimeout(() => {
        navigate("/appointment");
      }, 2000);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const createForm = useMemo(() => <CreateForm {...{formik, getUsers, getUserPets}} />, [formik]);

  return (
    <>
      <Typography variant="h4" style={{marginBottom:40}}>Create Appointment</Typography>
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
          Appointment successfully created.
        </Alert>
      </Snackbar>
    </>
  );
};

CreateAppointment.propTypes = {
  getUsers: PropTypes.func,
  getUserPets: PropTypes.func,
};

CreateForm.propTypes = {
  formik: PropTypes.object,
  getUsers: PropTypes.func,
  getUserPets: PropTypes.func,
};

export default CreateAppointment;
