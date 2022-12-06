import { CameraAlt, CameraEnhance } from '@mui/icons-material';
import { Avatar, Badge, Box, Button, Card, Grid, SxProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { UsersService } from 'api/services/users/users.service';
import VendorDashboardLayout from 'components/layouts/vendor-dashboard';
import { H3 } from 'components/Typography';
import countryList from 'data/countryList';
import { Formik } from 'formik';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useRouter } from 'next/router';
import React, { FC, Fragment, ReactElement } from 'react';
import * as yup from 'yup';

// upload button
type UploadButtonProps = { id: string; style?: SxProps };
const UploadButton: FC<UploadButtonProps> = ({ id, style = {} }) => {
  return (
    <Fragment>
      <label htmlFor={id}>
        <Button
          size="small"
          component="span"
          color="secondary"
          sx={{
            p: '6px',
            height: 'auto',
            borderRadius: '50%',
            bgcolor: 'info.100',
            ...style,
            ':hover': { backgroundColor: 'grey.300' },
          }}>
          <CameraAlt fontSize="small" color="info" />
        </Button>
      </label>

      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => console.log(e.target.files)}
        style={{ display: 'none' }}
      />
    </Fragment>
  );
};

const accountSchema = yup.object().shape({
  city: yup.string().required('City is required'),
  country: yup.mixed().required('Country is required'),
  contact: yup.string().required('Contact is required'),
  last_name: yup.string().required('Last name is required'),
  first_name: yup.string().required('First name is required'),
  email: yup.string().email('Invalid Email').required('Email is required'),
});

// =============================================================================
AccountSetting.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================

export default function AccountSetting() {
  const user = useTypedSelector((state) => state.userStore.user);
  const [file, setFile] = React.useState(null);
  const [fileLocaleUrl, setFileLocaleUrl] = React.useState(null);

  const { push } = useRouter();
  const { profile } = useActions();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setFileLocaleUrl(URL.createObjectURL(file));
  };

  const initialValues = {
    email: '',
    phone: '',
    last_name: '',
    first_name: '',
  };

  const handleFormSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('password', values.password);
    formData.append('birthday', values.birthday);
    formData.append('verified', 'true');
    if (file) {
      formData.append('avatar', file);
    }
    await UsersService.updateUser(user.id, formData);

    profile();
  };

  return (
    user && (
      <Box py={4}>
        <H3 mb={2}>Account Setting</H3>

        <Card sx={{ p: 4 }}>
          <Avatar
            src={fileLocaleUrl || user.avatar || '/assets/images/faces/ralph.png'}
            sx={{ height: 64, width: 64 }}
          />

          <Box
            ml={5.5}
            sx={{
              transform: 'translateY(-50%)',
            }}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  p: '8px',
                  height: 'auto',
                  bgcolor: 'grey.300',
                  borderRadius: '50%',
                }}>
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input
              onChange={(e) => handleFileChange(e)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>

          <Formik
            initialValues={user || initialValues}
            // validationSchema={accountSchema}
            onSubmit={handleFormSubmit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={4}>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        color="info"
                        size="medium"
                        name="first_name"
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.first_name}
                        error={!!touched.first_name && !!errors.first_name}
                        helperText={touched.first_name && errors.first_name}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        color="info"
                        size="medium"
                        name="last_name"
                        label="Last Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.last_name}
                        error={!!touched.last_name && !!errors.last_name}
                        helperText={touched.last_name && errors.last_name}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        color="info"
                        name="email"
                        type="email"
                        label="Email"
                        size="medium"
                        onBlur={handleBlur}
                        value={values.email}
                        onChange={handleChange}
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        type="tel"
                        color="info"
                        size="medium"
                        name="phone"
                        label="Phone"
                        onBlur={handleBlur}
                        value={values.phone}
                        onChange={handleChange}
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        type="password"
                        color="info"
                        size="medium"
                        name="password"
                        label="Password"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        error={!!touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    {/* <Grid item md={6} xs={12}>
                    <Autocomplete
                      fullWidth
                      disablePortal
                      options={countryList}
                      value={values.country}
                      getOptionLabel={(option) => option.label}
                      onChange={(_, value) => setFieldValue('country', value)}
                      renderInput={(params) => (
                        <TextField
                          color="info"
                          label="Country"
                          variant="outlined"
                          placeholder="Select Country"
                          error={!!touched.country && !!errors.country}
                          helperText={touched.country && errors.country}
                          {...params}
                          size="medium"
                        />
                      )}
                    />
                  </Grid> */}
                    {/* <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="city"
                      label="City"
                      color="info"
                      size="medium"
                      onBlur={handleBlur}
                      value={values.city}
                      onChange={handleChange}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  </Grid> */}
                  </Grid>
                </Box>

                <Button type="submit" variant="contained" color="info">
                  Save Changes
                </Button>
              </form>
            )}
          </Formik>
        </Card>
      </Box>
    )
  );
}
