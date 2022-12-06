import Place from '@mui/icons-material/Place';
import { Box, Button, Grid, TextField } from '@mui/material';
import { AddressesService } from 'api/services/addresses/addresses.service';
import Card1 from 'components/Card1';
import UserDashboardHeader from 'components/header/UserDashboardHeader';
import CustomerDashboardLayout from 'components/layouts/customer-dashboard';
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations';
import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { NextPageAuth } from 'shared/types/auth.types';
import * as yup from 'yup';

const AddressCreate: NextPageAuth = () => {
  const { push } = useRouter();

  // handle form submit
  const handleFormSubmit = async (values: any) => {
    await AddressesService.addAddress(values);

    push('/address');
  };

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Place}
        title="Add New Address"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Link href="/address" passHref>
            <Button color="primary" sx={{ bgcolor: 'primary.light', px: 4 }}>
              Back to Address
            </Button>
          </Link>
        }
      />

      <Card1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}>
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="city"
                      placeholder="City"
                      onBlur={handleBlur}
                      value={values.city}
                      onChange={handleChange}
                      error={!!touched.city && !!errors.city}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="country"
                      onBlur={handleBlur}
                      placeholder="Country"
                      value={values.country}
                      onChange={handleChange}
                      error={!!touched.country && !!errors.country}
                      helperText={touched.country && errors.country}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Street"
                      name="street"
                      onBlur={handleBlur}
                      value={values.street}
                      onChange={handleChange}
                      error={!!touched.street && !!errors.street}
                      helperText={touched.street && errors.street}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      placeholder="Phone"
                      name="phone"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      error={!!touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};

const initialValues = {
  city: '',
  country: '',
  street: '',
  phone: '',
};

const checkoutSchema = yup.object().shape({
  city: yup.string().required('required'),
  country: yup.string().required('required'),
  street: yup.string().required('required'),
  phone: yup.string().required('required'),
});

AddressCreate.isOnlyUser = true;

export default AddressCreate;
