import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";


import MDBox from "../../shared/MDBox";
import MDTypography from "../../shared/MDTypography";

import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars";

import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import BusinessContext from "../../context/business-context";
import { Icon, Modal, Tab, Table, TableBody, TableContainer, TableRow, Tabs, TextField, Tooltip } from "@mui/material";
import MDButton from "../../shared/MDButton";
import MDInput from "../../shared/MDInput";


import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import DataTableHeadCell from "../../components/Tables/DataTable/DataTableHeadCell";
import DataTableBodyCell from "../../components/Tables/DataTable/DataTableBodyCell";

const { format } = require('date-fns');

const initialState = {
  name: '',
  date: '',
  persons: 0,
  phone: '',
  status: '',
  businessId: ''
}

const Reservations = () => {
  const [inputs, setInputs] = useState(initialState);
  const [date, setDate] = useState(new Date());
  const [businessAction, setBusinessAction] = useState('create');

  const context = useContext(BusinessContext);

  const [reservations, setReservations] = useState([]);
  const [actualizar, setActualizar] = useState(false);

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    if (sessionStorage.getItem('SESSION_BUSINESS')) {
      setDate(new Date());
      setTabValue(0);
      setOpen(true);
    }else{
      Swal.fire('Importante', 'Debe crear una Empresa antes de administrar las Reservaciones', 'info');
    }
    
    //setInputs(business);
  };

  const handleClose = () => {
    setOpen(false)
    setInputs(initialState);
  };

  const editReservation = (e, reservation) => {
    e.stopPropagation();
    switch (reservation.status) {
      case 'Reservado':
        setTabValue(0);
        break;
      case 'Confirmado':
        setTabValue(1);
        break;
      case 'Cancelado':
        setTabValue(2);
        break;
      default:
        break;
    }
    setDate(reservation.date);
    setInputs(reservation);
    setBusinessAction('update');
    setOpen(true);
  }

  const deleteReservation = (e, id) => {
    e.stopPropagation();
    if (id) {
      Swal.fire({
        title: 'Eliminar la Reservación',
        text: '¿Está seguro que desea eliminar permanentemente la Reservación',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!!!',
        cancelButtonText: 'No'
      }).then(resp => {
        if (resp.isConfirmed) {
          axios.delete(`/api/reservations/${id}`)
            .then(resp => {
              const reserv = [...reservations];
              reserv.splice(reserv.findIndex(e => e._id === id), 1);
              setReservations(reserv);
            }).catch(error => Swal.fire('Error al eliminar la reservación', error?.message, 'error'));
        }
      })
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('SESSION_BUSINESS')) {
      var _business = JSON.parse(sessionStorage.getItem('SESSION_BUSINESS'));
      context.setBusiness(_business);
      axios.get(`/api/reservations/business/${_business.id}`)
        .then(resp => {
          if (resp.data.data) {
            setReservations(resp.data.data);
          } else {
            //setBusinessAction('create');
          }
        })
        .catch(error =>
          Swal.fire('Error', error.message, 'error'));
    }

  }, [actualizar]);

  const formUpdate = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const formSubmit = (e) => {
    e.preventDefault();
    if (businessAction === 'update') {
      inputs.date = date;
      switch (tabValue) {
        case 0:
          inputs.status = 'Reservado';
          break;
        case 1:
            inputs.status = 'Confirmado';
            break;
        case 2:
          inputs.status = 'Cancelado';
          break;
        default:
          inputs.status = 'Error';
          break;
      }
      axios.put(`/api/reservations/${inputs._id}`, inputs)
        .then(resp => {
          if (resp.data.ok) {
            Swal.fire('Actualizar datos', resp.data.message, 'success');
            setInputs(initialState);
            setOpen(false);
            setActualizar(!actualizar)
            setBusinessAction('create');
          } else {
            Swal.fire('Actualizar datos', resp.data.message, 'error');
          }
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      inputs.businessId = context.business.id;
      inputs.date = date;
      switch (tabValue) {
        case 0:
          inputs.status = 'Reservado';
          break;
        case 1:
            inputs.status = 'Confirmado';
            break;
        case 2:
          inputs.status = 'Cancelado';
          break;
        default:
          inputs.status = 'Error';
          break;
      }
      axios.post('/api/reservations', inputs)
        .then(resp => {
          if (resp.data.ok) {
            Swal.fire('Reservar', resp.data.message, 'success');
            setInputs(initialState);
            setOpen(false);
            setActualizar(!actualizar)
          } else {
            Swal.fire('Actualizar datos', resp.data.message, 'error');
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  }

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDButton variant="outlined" endIcon={<Icon>add</Icon>} onClick={handleOpen}>
                  Agregar Reservación
                </MDButton>
              </MDBox>
              <MDBox pt={3}>
                <TableContainer sx={{ boxShadow: "none" }}>
                  <Table>
                    <MDBox component="thead">
                      <TableRow>
                        <DataTableHeadCell width={"auto"} align={"left"} sorted={false}>
                          nombre
                        </DataTableHeadCell>
                        <DataTableHeadCell width={"auto"} align={"center"} sorted={false}>
                          fecha
                        </DataTableHeadCell>
                        <DataTableHeadCell width={"auto"} align={"center"} sorted={false}>
                          personas
                        </DataTableHeadCell>
                        <DataTableHeadCell width={"auto"} align={"center"} sorted={false}>
                          telefono
                        </DataTableHeadCell>
                        <DataTableHeadCell width={"auto"} align={"center"} sorted={false}>
                          estado
                        </DataTableHeadCell>
                        <DataTableHeadCell width={"auto"} align={"right"} sorted={false}>
                          acciones
                        </DataTableHeadCell>
                      </TableRow>
                    </MDBox>
                    <TableBody>
                      {reservations && reservations.map((elem, i) => <TableRow key={i}>
                        <DataTableBodyCell noBorder={false} align={"left"}>
                          {elem.name}
                        </DataTableBodyCell>
                        <DataTableBodyCell noBorder={false} align={"center"}>
                          {format(new Date(elem.date), 'dd-MM-yyyy hh:mm a')}
                        </DataTableBodyCell>
                        <DataTableBodyCell noBorder={false} align={"center"}>
                          {elem.persons}
                        </DataTableBodyCell>
                        <DataTableBodyCell noBorder={false} align={"center"}>
                          {elem.phone}
                        </DataTableBodyCell>
                        <DataTableBodyCell noBorder={false} align={"center"}>
                          {elem.status}
                        </DataTableBodyCell>
                        <DataTableBodyCell noBorder={false} align={"right"}>
                          <Grid container>
                            <MDTypography style={{ cursor: "pointer", marginRight: '5px' }} color="success" onClick={e => editReservation(e, elem)}>
                              <Tooltip title={'Editar'} placement="top">
                                <Icon>edit</Icon>
                              </Tooltip>
                            </MDTypography>
                            <MDTypography style={{ cursor: "pointer" }} color="error" onClick={e => deleteReservation(e, elem._id)}>
                              <Tooltip title={'Eliminar'} placement="top">
                                <Icon>delete</Icon>
                              </Tooltip>
                            </MDTypography>
                          </Grid>
                        </DataTableBodyCell>
                      </TableRow>)}
                    </TableBody>
                  </Table>
                </TableContainer>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MDBox mt={{ xs: 20, lg: 10 }} px={1} width="calc(100% - 2rem)" mx="auto">
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={11} sm={9} md={5} lg={4} xl={6}>
              <Card>
                <MDBox pt={4} pb={3} px={3}>
                  <MDBox component="form" role="form" onSubmit={formSubmit}>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Nombre" name="name" value={inputs.name} onChange={formUpdate} minLength={3} fullWidth />
                    </MDBox>
                    <MDBox mb={2} >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          label="Fecha"
                          value={date}
                          onChange={(newValue) => {
                            setDate(newValue);
                          }}
                          minDate={new Date()}
                          inputFormat="dd-MM-yyyy hh:mm a"
                        />
                      </LocalizationProvider>
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="number" label="Personas" name="persons" value={inputs.persons} onChange={formUpdate} minLength={3} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="tel" label="Teléfono" name="phone" value={inputs.phone} onChange={formUpdate} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                    <Tabs orientation={'horizontal'} value={tabValue} onChange={handleSetTabValue}>
                      <Tab label="Reservado"/>
                      <Tab label="Confirmado" />
                      <Tab label="Cancelado" />
                    </Tabs>
                    </MDBox>
                    <MDBox mt={4} mb={1} >
                      <MDButton style={{ marginRight: '10px' }} variant="gradient" color="success" type="submit">
                        {businessAction === 'create'? 'Crear': 'Actualizar'}
                      </MDButton>
                      <MDButton variant="gradient" color="error" onClick={handleClose}>
                        Cancelar
                      </MDButton>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Modal>
    </DashboardLayout>
  );
}

export default Reservations;
