import { Link } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "../../../shared/MDBox";
import MDTypography from "../../../shared/MDTypography";
import MDInput from "../../../shared/MDInput";
import MDButton from "../../../shared/MDButton";

import CoverLayout from "../../../layouts/authentication/CoverLayout";

import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const initialState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Cover = () => {

  const [inputs, setInputs] = useState(initialState);

  const formUpdate = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', inputs)
      .then(resp => {
        if (resp.data.ok) {
          Swal.fire('Registro de Usuarios', resp.data.message, 'success');
          setInputs(initialState);
        } else {
          Swal.fire('Registro de Usuarios', resp.data.message, 'error');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <CoverLayout>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="success"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Únete a nosotros hoy
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingrese su correo electrónico y contraseña para registrarse
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formSubmit}>
            <MDBox mb={2}>
              <MDInput type="text" label="Nombre" name="name" variant="standard" value={inputs.name} onChange={formUpdate} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name="email" variant="standard" value={inputs.email} onChange={formUpdate} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" name="password" variant="standard" value={inputs.password} onChange={formUpdate} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Confirmar Contraseña" name="confirmPassword" variant="standard" value={inputs.confirmPassword} onChange={formUpdate} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="success" type="submit" fullWidth>
                Inscribirse
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Ya tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="success"
                  fontWeight="medium"
                  textGradient
                >
                  Iniciar Sesión
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
