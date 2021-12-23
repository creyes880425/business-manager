import Grid from "@mui/material/Grid";

import MDBox from "../../shared/MDBox";

import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars";
import ReportsLineChart from "../../components/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "../../components/Cards/StatisticsCards/ComplexStatisticsCard";

import { useContext, useEffect, useState } from "react";

import axios from 'axios';
import Swal from 'sweetalert2';

import BusinessContext from "../../context/business-context";

const initialIncomes = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiempre", "Octubre", "Noviembre", "Diciembre"],
  datasets: { label: "Monto", data: [0,0,0,0,0,0,0,0,0,0,0,0] },
}

const Dashboard = () => {
  const [reservations, setReservations] = useState(0);
  const [incomes, setIncomes] = useState(initialIncomes);
  const context = useContext(BusinessContext);

  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('SESSION_BUSINESS')) {
      var _business = JSON.parse(sessionStorage.getItem('SESSION_BUSINESS'));
      context.setBusiness(_business);
      //console.log('buscar resrvaciones del dia');
      axios.get(`/api/reservations/business/today/${_business.id}`)
        .then(resp => {
          if (resp.data.data) {
            setReservations(resp.data.data.length);
          } else {
            //setBusinessAction('create');
          }
        })
        .catch(error =>
          Swal.fire('Error', error.message, 'error'));

        // //console.log('buscar ingresos');
        // axios.get(`/api/incomes/business/${_business.id}`)
        //   .then(resp => {
        //     if (resp.data.data) {
        //       let _incomes = {...incomes};
        //       let _datasets = {..._incomes.datasets};
        //       let _data = [..._datasets.data];
        //       resp.data.data.map((elem, i) => {
        //         _data[elem.month - 1] = elem.income;
        //       })
        //       _datasets.data = _data;
        //       _incomes.datasets = _datasets;
        //       setIncomes(_incomes);
        //     }
        //   })
        //   .catch(error =>
        //     Swal.fire('Error', error.message, 'error'));
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('SESSION_BUSINESS')) {
      var _business = JSON.parse(sessionStorage.getItem('SESSION_BUSINESS'));
      context.setBusiness(_business);

      //console.log('buscar ingresos');
      axios.get(`/api/incomes/business/${_business.id}`)
        .then(resp => {
          if (resp.data.data) {
            let _incomes = {...incomes};
            let _datasets = {..._incomes.datasets};
            let _data = [..._datasets.data];
            resp.data.data.map((elem, i) => {
              _data[elem.month - 1] = elem.income;
            })
            _datasets.data = _data;
            _incomes.datasets = _datasets;
            setIncomes(_incomes);
          }
        })
        .catch(error =>
          Swal.fire('Error', error.message, 'error'));
    }
  }, [actualizar]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Reservaciones para hoy"
                count={reservations}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Ingresos"
                  date=""
                  chart={incomes}
                  actualizar={actualizar}
                  setActualizar={setActualizar}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
