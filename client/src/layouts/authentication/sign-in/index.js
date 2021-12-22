import { useContext, useState } from "react";

import { Link } from "react-router-dom";

import Card from "@mui/material/Card";

import MDBox from "../../../shared/MDBox";
import MDTypography from "../../../shared/MDTypography";
import MDInput from "../../../shared/MDInput";
import MDButton from "../../../shared/MDButton";

import CoverLayout from "../CoverLayout";
import UserContext from "../../../context/user-context";

const initialState = {
  username: '',
  password: ''
}

const Basic = (props) => {

  const [inputs, setInputs] = useState(initialState);
  const context = useContext(UserContext);

  const formUpdate = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const formSubmit = (e) => {
    e.preventDefault();
    context.login(inputs);
    setInputs(initialState);
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
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Bienvenido
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formSubmit}>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name="username" value={inputs.username} onChange={formUpdate} maxLength={50} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Contraseña" name="password" value={inputs.password} onChange={formUpdate} minLength={6} fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="success" type="submit" fullWidth>
                Iniciar sesión
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿No tienes una cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="success"
                  fontWeight="medium"
                  textGradient
                >
                  Inscribirse
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Basic;
