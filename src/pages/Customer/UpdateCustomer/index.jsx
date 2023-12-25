import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import UpdateCustomerForm from "../CustomerForms/UpdateCustomer";
import MainCard from "../../../components/MainCard";
import { setEditUserDetails, changeLoadingStatus } from "../../../store/reducers/user";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function UpdateCustomer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { customerId }  = useParams();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      dispatch(changeLoadingStatus({ isDataLoading: true }));
      try {
        const response = await axiosPrivate.get(`/user/${customerId}`);
        console.log(response.data);
        isMounted && dispatch(setEditUserDetails({ user: response.data || {} }));
      } catch (err) {
        console.error(err);
      }
      dispatch(changeLoadingStatus({ isDataLoading: false }));
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);



  return (
    <MainCard>
      <UpdateCustomerForm/>
    </MainCard>
  );
}
