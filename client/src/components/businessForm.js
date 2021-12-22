import { Card, Grid } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import MDBox from '../shared/MDBox';
import MDButton from '../shared/MDButton';
import MDInput from '../shared/MDInput';
import MDTypography from '../shared/MDTypography';



export const BusinessForm = () => {
    return (
        <MDBox mt={{ xs: 20, lg: 18 }} px={1} width="calc(100% - 2rem)" mx="auto">
            <Grid container spacing={1} justifyContent="center">
                <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
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
                            <MDBox component="form" role="form" >
                                <MDBox mb={2}>
                                    <MDInput type="email" label="Email" name="username" maxLength={50} fullWidth />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput type="password" label="Contraseña" name="password" minLength={6} fullWidth />
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
                </Grid>
            </Grid>
        </MDBox>
    )
}

export default BusinessForm;