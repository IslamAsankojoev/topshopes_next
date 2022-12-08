import { Done, ShoppingBag } from '@mui/icons-material';
import { Avatar, Box, Button, Card, Divider, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { OrdersService } from 'api/services/orders/orders.service';
import { FlexBetween, FlexBox } from 'components/flex-box';
import UserDashboardHeader from 'components/header/UserDashboardHeader';
import Delivery from 'components/icons/Delivery';
import PackageBox from 'components/icons/PackageBox';
import TruckFilled from 'components/icons/TruckFilled';
import CustomerDashboardLayout from 'components/layouts/customer-dashboard';
import CustomerDashboardNavigation from 'components/layouts/customer-dashboard/Navigations';
import TableRow from 'components/TableRow';
import { H5, H6, Paragraph } from 'components/Typography';
import productDatabase from 'data/product-database';
import { format } from 'date-fns';
import { useTypedSelector } from 'hooks/useTypedSelector';
import useWindowSize from 'hooks/useWindowSize';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { Fragment } from 'react';
import { useQuery } from 'react-query';
import { NextPageAuth } from 'shared/types/auth.types';
import { IOrder } from 'shared/types/order.types';

const StyledFlexbox = styled(FlexBetween)(({ theme }) => ({
  flexWrap: 'wrap',
  marginTop: '2rem',
  marginBottom: '2rem',
  [theme.breakpoints.down('sm')]: { flexDirection: 'column' },

  '& .line': {
    height: 4,
    minWidth: 50,
    flex: '1 1 0',
    [theme.breakpoints.down('sm')]: { flex: 'unset', height: 50, minWidth: 4 },
  },
}));

type OrderStatus = 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'CANCELLED';

const OrderDetails: NextPageAuth = () => {
  const router = useRouter();

  const { isLoading, data: order } = useQuery(
    'Get one order',
    () => OrdersService.getOrder(router.query.id as string),
    {
      enabled: !!router?.query?.id,
      select: (data) => data as IOrder,
    },
  );

  const orderStatus: OrderStatus = order?.status || 'PENDING';

  const orderStatusList = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELED'];
  const stepIconList = [PackageBox, TruckFilled, Delivery];

  const statusIndex = orderStatusList.indexOf(orderStatus);
  const width = useWindowSize();
  const theme = useTheme();
  const breakpoint = 350;

  return order ? (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={ShoppingBag}
        title="Order Details"
        navigation={<CustomerDashboardNavigation />}
        button={
          <Button color="primary" sx={{ bgcolor: 'primary.light', px: 4 }}>
            Order Again
          </Button>
        }
      />

      <Card sx={{ p: '2rem 1.5rem', mb: '30px' }}>
        <StyledFlexbox>
          {stepIconList.map((Icon, ind) => (
            <Fragment key={ind}>
              <Box position="relative">
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: ind <= statusIndex ? 'primary.main' : 'grey.300',
                    color: ind <= statusIndex ? 'grey.white' : 'primary.main',
                  }}>
                  <Icon color="inherit" sx={{ fontSize: '32px' }} />
                </Avatar>
                {ind < statusIndex && (
                  <Box position="absolute" right="0" top="0">
                    <Avatar
                      sx={{
                        width: 22,
                        height: 22,
                        bgcolor: 'grey.200',
                        color: 'success.main',
                      }}>
                      <Done color="inherit" sx={{ fontSize: '1rem' }} />
                    </Avatar>
                  </Box>
                )}
              </Box>
              {ind < stepIconList.length - 1 && (
                <Box className="line" bgcolor={ind < statusIndex ? 'primary.main' : 'grey.300'} />
              )}
            </Fragment>
          ))}
        </StyledFlexbox>

        {order.delivered_at ? (
          <FlexBox justifyContent={width < breakpoint ? 'center' : 'flex-end'}>
            <Typography
              p="0.5rem 1rem"
              textAlign="center"
              borderRadius="300px"
              color="primary.main"
              bgcolor="primary.light">
              Estimated Delivery Date <b>{format(new Date(order.delivered_at), 'dd MMM, yyyy')}</b>
            </Typography>
          </FlexBox>
        ) : null}
      </Card>

      <Card sx={{ p: 0, mb: '30px' }}>
        <TableRow
          sx={{
            p: '12px',
            borderRadius: 0,
            boxShadow: 'none',
            bgcolor: 'grey.200',
          }}>
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Order ID:
            </Typography>
            <Typography fontSize={14}>{order.id.slice(0, 8)}</Typography>
          </FlexBox>

          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize={14} color="grey.600" mr={0.5}>
              Placed on:
            </Typography>
            <Typography fontSize={14}>
              {format(new Date(order.created_at), 'dd MMM, yyyy')}
            </Typography>
          </FlexBox>

          {order.delivered_at ? (
            <FlexBox className="pre" m={0.75} alignItems="center">
              <Typography fontSize={14} color="grey.600" mr={0.5}>
                Delivered on:
              </Typography>
              <Typography fontSize={14}>
                {format(new Date(order.delivered_at), 'dd MMM, yyyy')}
              </Typography>
            </FlexBox>
          ) : null}
        </TableRow>

        <Box py={1}>
          {order.items.length &&
            order.items.map((item) => (
              <FlexBox
                px={2}
                py={1}
                flexWrap="wrap"
                alignItems="center"
                key={item.product_name + item.product_image}>
                <FlexBox flex="2 2 260px" m={0.75} alignItems="center">
                  <Avatar src={item.product_image} sx={{ height: 64, width: 64 }} />
                  <Box ml={2.5}>
                    <H6 my="0px">{item.product_name}</H6>
                    <Typography fontSize="14px" color="grey.600">
                      {item.product_price}c x {item.product_quantity}
                    </Typography>
                  </Box>
                </FlexBox>

                <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                  <Typography fontSize="14px" color="grey.600">
                    Product properties: Black, L
                  </Typography>
                </FlexBox>

                <FlexBox flex="160px" m={0.75} alignItems="center">
                  <Button variant="text" color="primary">
                    <Typography fontSize="14px">Write a Review</Typography>
                  </Button>
                </FlexBox>
              </FlexBox>
            ))}
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: '20px 30px' }}>
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>

            <Paragraph fontSize={14} my={0}>
              {order.shipping_address}
            </Paragraph>
          </Card>
        </Grid>

        <Grid item lg={6} md={6} xs={12}>
          <Card sx={{ p: '20px 30px' }}>
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Subtotal:
              </Typography>
              <H6 my="0px">{order.total_price}c</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Shipping fee:
              </Typography>
              <H6 my="0px">0c</H6>
            </FlexBetween>

            <FlexBetween mb={1}>
              <Typography fontSize={14} color="grey.600">
                Discount:
              </Typography>
              <H6 my="0px">{order.discount}c</H6>
            </FlexBetween>

            <Divider sx={{ mb: 1 }} />

            <FlexBetween mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">
                {parseInt(order.total_price) * (order.discount ? 1 - order.discount * 0.1 : 1)}c
              </H6>
            </FlexBetween>

            <Typography fontSize={14}>Paid by Credit/Debit Card</Typography>
          </Card>
        </Grid>
      </Grid>
    </CustomerDashboardLayout>
  ) : null;
};

OrderDetails.isOnlyUser = true;

export default OrderDetails;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { params } = context;
//   const { id } = params;

//   const order = await OrdersService.getOrder(id as string);

//   return {
//     props: {
//       order,
//     },
//   };
// };
