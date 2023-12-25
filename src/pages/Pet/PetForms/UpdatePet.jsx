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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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

const UpdateForm = ({ formik: formData, getUsers }) => {

  const [isExecuteBefore, setVerifestExecution] = useState(false)

  const navigate = useNavigate();
  const {
    listUserForPet,
  } = useSelector((state) => state.user);
  
  const {
    updatePet,
  } = useSelector((state) => state.pet);

  const {
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    touched,
    values,
    setFieldValue,
    setValues,
    setTouched,
  } = formData;

  const optionList = useMemo(() =>listUserForPet.map(({email, firstName, lastName, id }) =>({label: `${firstName} ${lastName} - (${email})`, id})),[listUserForPet])

  useEffect(()=>{
    return(() => {
      setVerifestExecution(false);
    })
  },[])

  useEffect(() => {
    if (updatePet?.id && setValues && optionList?.length && !isExecuteBefore ) {
      const {
        ownerID,
        name,
        dob,
        type,
        species,
        gender,
        color,
        weight,
        note} = updatePet;
      setValues({
        ownerID: optionList.find(({id})=> +id === +ownerID), 
        name, 
        dob: dob ? new Date(dob) : undefined, 
        type, 
        species, 
        gender,
        color,
        weight,
        note
      });
      setVerifestExecution(true);
    }
  }, [updatePet?.id, setValues, optionList?.length]);

  return (
    <Grid container spacing={3}>
      {/* email */}
      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="owner-pet-create">Owner</InputLabel>
          <Autocomplete
            disablePortal
            id="owner-pet-create"
            size='small'
            name='ownerID'
            options={optionList}
            value={values?.ownerID}
            getOptionLabel={(option) => option.label}
            onBlur={() => setTouched({ 'ownerID': true })}
            onChange={(e, val) => {setFieldValue('ownerID', val)}}
            onInputChange={(e, val) => getUsers(true, `?keyword=${val}`)}
            error={Boolean(touched.ownerID && errors.ownerID)}
            renderInput={(params) => <TextField {...params} error={Boolean(touched.ownerID && errors.ownerID)} placeholder='Select User'/>}
          />
          {touched.ownerID && errors.ownerID && (
            <FormHelperText error id="standard-weight-helper-text-ownerID">
              {errors.ownerID}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="name-pet-create">
           Pet Name
          </InputLabel>
          <OutlinedInput
            id="name-pet-create"
            type="text"
            value={values.name}
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Spent Time"
            fullWidth
            error={Boolean(touched.name && errors.name)}
          />
          {touched.name && errors.name && (
            <FormHelperText
              error
              id="standard-weight-helper-text-name"
            >
              {errors.name}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="dob-pet-create">Date Of Birth</InputLabel>
          <DatePicker
            id="dob-pet-create"
            value={values?.dob || null}
            onChange={setFieldValue}
            onBlur={handleBlur}
            name="dob"
            error={Boolean(touched.dob && errors.dob)}
          />
          {touched.dob && errors.dob && (
            <FormHelperText
              error
              id="standard-weight-helper-text-dob"
            >
              {errors.dob}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="type-pet-create">
            Type
          </InputLabel>
          <Select
            fullWidth
            id="type-pet-create"
            value={values.type}
            name="type"
            placeholder="Select type"
            onBlur={handleBlur}
            onChange={handleChange}
            error={Boolean(touched.type && errors.type)}
          >
            <MenuItem key ={`type-select-dog`} value={'dog'}>Dog</MenuItem>
            <MenuItem key ={`type-select-cat`} value={'cat'}>Cat</MenuItem>
            <MenuItem key ={`type-select-bunny`} value={'bunny'}>Bunny</MenuItem>
            <MenuItem key ={`type-select-hamster`} value={'hamster'}>Hamster</MenuItem>
            <MenuItem key ={`type-select-ferret`} value={'ferret'}>Ferret</MenuItem>
            <MenuItem key ={`type-select-lizard`} value={'lizard'}>Lizard</MenuItem>
            <MenuItem key ={`type-select-guinea_pig`} value={'guinea_pig'}>Guinea pig</MenuItem>
            <MenuItem key ={`type-select-mice`} value={'mice'}>Mice</MenuItem>
            <MenuItem key ={`type-select-frog`} value={'frog'}>Frog</MenuItem>
            <MenuItem key ={`type-select-other`} value={'other'}>Other</MenuItem>
          </Select>
          {touched.type && errors.type && (
            <FormHelperText
              error
              id="standard-weight-helper-text-type"
            >
              {errors.type}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="species-pet-create">
            Species
          </InputLabel>
          <OutlinedInput
            id="species-pet-create"
            type="text"
            value={values.species}
            name="species"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Species"
            fullWidth
            error={Boolean(touched.species && errors.species)}
          />
          {touched.species && errors.species && (
            <FormHelperText
              error
              id="standard-weight-helper-text-species"
            >
              {errors.species}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="gender-pet-create">
            Gender
          </InputLabel>
          <Select
            fullWidth
            id="gender-pet-create"
            value={values.gender}
            name="gender"
            placeholder="Select Gender"
            onBlur={handleBlur}
            onChange={handleChange}
            error={Boolean(touched.gender && errors.gender)}
          >
            <MenuItem key ={`gender-select-male`} value={'male'}>Male</MenuItem>
            <MenuItem key ={`gender-select-female`} value={'female'}>Female</MenuItem>
          </Select>
          {touched.gender && errors.gender && (
            <FormHelperText
              error
              id="standard-weight-helper-text-gender"
            >
              {errors.gender}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="colour-pet-create">
            Colour
          </InputLabel>
          <OutlinedInput
            id="colour-pet-create"
            type="text"
            value={values.color}
            name="color"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Colour"
            fullWidth
            error={Boolean(touched.color && errors.color)}
          />
          {touched.color && errors.color && (
            <FormHelperText
              error
              id="standard-weight-helper-text-color"
            >
              {errors.color}
            </FormHelperText>
          )}
        </Stack>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Stack spacing={1}>
          <InputLabel htmlFor="weight-pet-create">
            Weight(Kg)
          </InputLabel>
          <OutlinedInput
            id="weight-pet-create"
            type="number"
            value={values.weight}
            name="weight"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter Weight"
            fullWidth
            error={Boolean(touched.weight && errors.weight)}
          />
          {touched.weight && errors.weight && (
            <FormHelperText
              error
              id="standard-weight-helper-text-weight"
            >
              {errors.weight}
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
              onClick={() => navigate('/pet')}
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

const UpdatePetDetails = ({getUsers}) => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { updatePet } = useSelector(
    (state) => state.pet
  );

  const formik = useFormik({
    initialValues: {
      ownerID: '',
      name: undefined,
      dob: undefined,
      type: '',
      species: undefined,
      gender: '',
      color: undefined,
      weight: undefined,
      note: undefined,
    },
    validationSchema: Yup.object().shape({
      ownerID: Yup.object().shape({
        label: Yup.string().required(),
        id: Yup.string().required(),
      }),
      name: Yup.string().required("Name is required"),
      dob: Yup.string().notRequired(),
      type: Yup.string().required("Pet Type is required"),
      species: Yup.string().notRequired(),
      gender: Yup.string().required("Pet Gender is required"),
      color: Yup.string().required("Pet Color is required"),
      weight: Yup.number().notRequired(),
      note: Yup.string().notRequired(),
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
    const {ownerID, ...rest} = values;
    const { setErrors, setStatus, setSubmitting, resetForm } = actions;
    try {
      setSubmitting(true);
      await axiosPrivate.patch(`${endpoints.PET}/${updatePet?.id}`, JSON.stringify({ ownerID: ownerID?.id, ...rest }), {
        headers: { "Content-Type": "application/json" },
      });
      openMessage();
      resetForm();
      setStatus({ success: true });
      setSubmitting(false);
      setTimeout(() => {
        navigate("/pet");
      }, 2000);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  const updateForm = useMemo(() => <UpdateForm {...{ formik, getUsers}} />, [formik]);

  return (
    <>
      <Typography variant="h4" style={{marginBottom:40}}>Edit Pet</Typography>
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
          Pet successfully Updated.
        </Alert>
      </Snackbar>
    </>
  );
};

UpdatePetDetails.propTypes = {
  getUsers: PropTypes.func,
  getUserPets: PropTypes.func,
};

UpdateForm.propTypes = {
  formik: PropTypes.object,
  getUsers: PropTypes.func,
  updatePet: PropTypes.object,
};

export default UpdatePetDetails;
