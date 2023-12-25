import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import UpdatePet from "../PetForms/UpdatePet";
import MainCard from "../../../components/MainCard";
import { setPetCreateUserList, changeLoadingStatus } from "../../../store/reducers/user";
import { setEditPetDetails, changeLoadingStatus as petLoadingState } from "../../../store/reducers/pet";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { endpoints } from "../../../config";

export default function UpdateCustomer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { petID }  = useParams();

  const getPet = async (isMounted) => {
    dispatch(petLoadingState({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(`${endpoints.PET}/${petID}`);
      console.log(response.data);
      isMounted && dispatch(setEditPetDetails({ pet: response.data || {} }));
    } catch (err) {
      console.error(err);
    }
    dispatch(petLoadingState({ isDataLoading: false }));
  };

  const getUsers = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get(endpoints.USER+props);
      console.log(response.data);
      isMounted &&
        dispatch(
          setPetCreateUserList({
            users: response.data?.users || []
          })
        );
    } catch (err) {
      console.error(err);
    }
    dispatch(changeLoadingStatus({ isDataLoading: false }));
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    getUsers(isMounted);
    getPet(isMounted);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <MainCard>
      <UpdatePet getUsers={getUsers}/>
    </MainCard>
  );
}
