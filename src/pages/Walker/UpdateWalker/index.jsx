import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import UpdateWalker from "../WalkerForms/UpdateWalker";
import MainCard from "../../../components/MainCard";
import { setEditWalkerDetails, changeLoadingStatus } from "../../../store/reducers/walker";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { endpoints } from "../../../config";

export default function UpdateCustomer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { walkerID }  = useParams();

  const getWalker = async (isMounted) => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(`${endpoints.WALKER}/${walkerID}`);
      console.log(response.data);
      isMounted && dispatch(setEditWalkerDetails({ walker: response.data || {} }));
    } catch (err) {
      console.error(err);
    }
    dispatch(changeLoadingStatus({ isDataLoading: false }));
  };


  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getWalker(isMounted);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <MainCard>
      <UpdateWalker/>
    </MainCard>
  );
}
