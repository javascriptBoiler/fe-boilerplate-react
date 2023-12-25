import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CreatePet from "../WalkerForms/CreatePet";
import MainCard from "../../../components/MainCard";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

import { setPetCreateUserList, changeLoadingStatus } from "../../../store/reducers/user";

export default function CreateCustomer() {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const getUsers = async (isMounted, props = '') => {
    dispatch(changeLoadingStatus({ isDataLoading: true }));
    try {
      const response = await axiosPrivate.get("/user"+props);
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
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <MainCard>
      <CreatePet getUsers={getUsers}/>
    </MainCard>
  );
}
