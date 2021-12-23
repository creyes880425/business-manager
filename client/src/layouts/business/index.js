import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import MDBox from "../../shared/MDBox";

import DashboardLayout from "../../components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "../../components/Navbars";
import ProfileInfoCard from "../../components/Cards/InfoCards/ProfileInfoCard";

import Header from "../../layouts/business/components/Header";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user-context";
import axios from 'axios';
import Swal from 'sweetalert2';

const initialState = {
  name: 'Nombre de la empresa',
  description: 'Descripción de empresa',
  address: 'Descripción de la empresa',
  email: 'Correo',
  type: 'Tipo de empresa',
  phone: 'Teléfono'
}

const Overview = () => {

  const context = useContext(UserContext);

  const [business, setBusiness] = useState(initialState);
  const [businessAction, setBusinessAction] = useState('update');
  const [actualizar, setActualizar] = useState(false);

  useEffect(() => {
    axios.get(`/api/business/user/${context.user.id}`)
      .then(resp => {
        if (resp.data.data[0]) {
          setBusiness(resp.data.data[0]);
        }else{
          setBusinessAction('create');
        }
      })
      .catch(error =>
        Swal.fire('Error', error.message, 'error'));
  }, [actualizar]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header business={business}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="Datos de la Empresa"
                description={business.description}
                info={{
                  Teléfono: business.phone,
                  Email: business.email,
                  Dirección: business.address,
                }}
                action={{ route: "", tooltip: "Editar Datos de la Empresa" }}
                shadow={false}
                actualizar={actualizar}
                setActualizar={setActualizar}
                businessAction={businessAction}
                setBusinessAction={setBusinessAction}
                business={business}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
