import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Unstable_Grid2 as Grid,
  IconButton,
  Stack,
} from "@mui/material";
import moment from 'moment';
import { useTheme } from "@mui/material/styles";
import { EditCalendar, DeleteForever } from "@mui/icons-material";
import axios from "../../api/axios";
import { endpoints } from "../../config";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import AddEditEventPopup from "./AddEditForm";
import "./style.css";
import { useEffect } from "react";

export const ModalType = {
  CREATE: "create",
  EDIT: "edit",
};

const Calendar = () => {
  const theme = useTheme();
  const calendarRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const colors = theme.palette;
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalType, setModal] = useState(ModalType.CREATE);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [eventData, setSelectedEventData] = useState({});
  const [, setAppointmentCount] = useState(0);
  const [appointmentList, setAppointmentList] = useState([]);
  const [currentMonthEvent, setCurrentMonthEvent] = useState([]);

  const confirmAddEvent = (data) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.unselect();

    if (data) {
      calendarApi.addEvent({
        id: `${data.dateStr}-${data?.title}`,
        title: data?.data,
        start: data.startStr,
        end: data.endStr,
        allDay: data.allDay,
      });
    }
    // add into the DB aswell
    // when success set selectedDate to undefiend
    setOpen(false);
  };

  const confirmUpdateEvent = (data) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.unselect();
    const currentEvent = calendarApi.getEventById(eventData?.publicId);
    console.log(
      "data?.title::::::::::::::",
      eventData?.publicId,
      currentEvent,
      data?.title
    );

    if (data) {
      currentEvent.setProp("title", data?.title);
      currentEvent.setDates(new Date(), null, { allDay: true });
    }
    // add into the DB aswell
    // when success set event id to undefiend
    setOpen(false);
  };

  const confirmDeleteEvent = () => {
    const calendarApi = calendarRef.current.getApi();
    const currentEvent = calendarApi.getEventById(eventData?.publicId);
    currentEvent.remove();
    // add into the DB aswell
    // when success set event id to undefiend
    setOpen(false);
  };

  const handleDateClick = (selected) => {
    setModal(ModalType.CREATE);
    setSelectedDate(selected.dateStr);
    setOpen(true);
  };

  const handleEventClick = (selected) => {
    navigate(`/appointment/${selected.event._def.publicId}`)
    // setModal(ModalType.EDIT);
    // setSelectedEventData(selected.event._def);
    // setOpen(true);
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete the event '${selected.event.title}'`
    //   )
    // ) {
    //   selected.event.remove();
    // }
  };

  const deleteEventFromList = async (publicID) => {
    const calendarApi = calendarRef.current.getApi();
    const currentEvent = calendarApi.getEventById(publicID);
    await axiosPrivate.patch(`${endpoints.APPOINTMENT}/${publicID}`, JSON.stringify({ status: 'deleted' }), {
      headers: { "Content-Type": "application/json" },
    });
    currentEvent.remove();
  };

  const openEventFromList = (event) => {
    setModal(ModalType.EDIT);
    setSelectedEventData(event._def);
    setOpen(true);
  };

  function eventRender(info) {
    // Assuming your events have an "image" property with the image URL.
    const imageUrl =
      info.event.extendedProps.image ||
      "https://raw.githubusercontent.com/javascriptBoiler/assest/main/users/man.png";

    // Create a custom event element with the image.
    const eventElement = document.createElement("div");
    eventElement.classList.add("custom-event");

    const eventImage = document.createElement("div");
    eventImage.classList.add("custom-event-img-container");
    eventImage.style.backgroundImage = `url(${imageUrl})`;
    eventElement.appendChild(eventImage);
    // Append any other event content or text if needed.
    const eventText = document.createElement("div");
    eventText.innerText = info.event.title;
    eventElement.appendChild(eventText);

    // Return the custom event element.
    return { domNodes: [eventElement] };
  }

  useEffect(() => {
    if (appointmentList?.length) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.unselect();
      appointmentList?.map((eachApointment)=>{
        calendarApi.addEvent(eachApointment);
      })
    }
  }, [appointmentList?.length]);

  const listEvents = async (query) => {
    const response = await axios.get(endpoints.APPOINTMENT+query, {
      headers: { "Content-Type": "application/json" },
    });

    const formatAppointmentList = response?.data?.appointments?.map(({startAt: start, endAt: end, id, hostedBy, pet}) => {
      const eventObject = {
        start: moment(start).format('YYYY-MM-DD'),
        end: moment(end).format('YYYY-MM-DD'),
        id,
        image: hostedBy?.image,
        title: `Appointment for ${pet?.name}(${pet?.type}) by ${hostedBy?.firstName || ''} ${hostedBy?.lastName || ''}`
      }
      return(eventObject);
    })
    const currentDate = moment();
    const filterCurrentMonthEvent = formatAppointmentList.filter((each) => {
      const dateToCheck = moment(each?.start)
      if(dateToCheck.isSame(currentDate, 'month')){
        return each
      } else {
        return null
      }
    })
    setCurrentMonthEvent(filterCurrentMonthEvent);
    setAppointmentList(formatAppointmentList || []);
    setAppointmentCount(response?.data?.appointmentCount || 0)
  };

  useEffect(() => {
    listEvents(`?paginate=false`);
  }, []);

  return (
    <>
      <Box m="20px">
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Box
              backgroundColor={"white"}
              p="15px"
              borderRadius="4px"
              boxShadow="0px 0px 1px 0px gray"
            >
              <Typography variant="h5">Events On {moment().format('MMMM')}</Typography>
              <List>
                {currentMonthEvent.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      backgroundColor: colors.primary[100],
                      margin: "10px 0",
                      borderRadius: "2px",
                    }}
                    secondaryAction={
                      <Stack direction={"row"} spacing={0}>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          sx={{ ml: "5px" }}
                          onClick={() => deleteEventFromList(event.id)}
                        >
                          <DeleteForever style={{ fontSize: 15, color:'#b11d1d' }} />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={
                        <span style={{ fontWeight: 700 }}>{event.title}</span>
                      }
                      secondary={
                        <Typography style={{ color: colors.secondary[600] }}>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Grid xs={12} md={8}>
            <Box ml="15px">
              <FullCalendar
                ref={calendarRef}
                height="75vh"
                plugins={[
                  dayGridPlugin,
                  timeGridPlugin,
                  interactionPlugin,
                  listPlugin,
                ]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                // select={handleDateClick}
                eventClick={handleEventClick}
                eventsSet={(events) => setCurrentEvents(events)}
                eventContent={eventRender}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <AddEditEventPopup
        confirmAddEvent={confirmAddEvent}
        confirmUpdateEvent={confirmUpdateEvent}
        confirmDeleteEvent={confirmDeleteEvent}
        open={open}
        setOpen={setOpen}
        modalType={modalType}
        selectedDate={selectedDate}
        eventData={eventData}
      />
    </>
  );
};

export default Calendar;
