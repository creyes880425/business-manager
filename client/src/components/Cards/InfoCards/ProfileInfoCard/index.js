import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

import MDBox from "../../../../shared/MDBox";
import MDTypography from "../../../../shared/MDTypography";
import { Grid, Modal } from "@mui/material";
import { useState } from "react";
import MDButton from "../../../../shared/MDButton";
import MDInput from "../../../../shared/MDInput";

import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  name: '',
  description: '',
  address: '',
  email: '',
  type: '',
  phone: ''
}

const ProfileInfoCard = ({ title, description, info, action, shadow }) => {
  const labels = [];
  const values = [];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setInputs(initialState);
  };

  const [inputs, setInputs] = useState(initialState);

  Object.keys(info).forEach((el) => {
    if (el.match(/[A-Z\s]+/)) {
      const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
      const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

      labels.push(newElement);
    } else {
      labels.push(el);
    }
  });

  Object.values(info).forEach((el) => values.push(el));

  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  const formUpdate = (e) => {
    const { name, value } = e.target;
    setInputs({
        ...inputs,
        [name]: value
    });
}

  const formSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/business', inputs)
      .then(resp => {
        if (resp.data.ok) {
          Swal.fire('Actualizar datos de Empresa', resp.data.message, 'success');
          //setInputs(initialState);
        } else {
          Swal.fire('Actualizar datos de Empresa', resp.data.message, 'error');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
        <MDTypography style={{ cursor: "pointer" }} variant="body2" color="success" onClick={handleOpen}>
          <Tooltip title={action.tooltip} placement="top">
            <Icon>edit</Icon>
          </Tooltip>
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
        </MDBox>
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
                    <MDBox mb={2}>
                      <MDInput type="text" label="Descripción" name="description" value={inputs.description} onChange={formUpdate} minLength={3} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="text" label="Dirección" name="address" value={inputs.address} onChange={formUpdate} minLength={3} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="email" label="Email" name="email" value={inputs.email} onChange={formUpdate} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="string" label="Tipo de Empresa" name="type" value={inputs.type} onChange={formUpdate} fullWidth />
                    </MDBox>
                    <MDBox mb={2}>
                      <MDInput type="string" label="Teléfono" name="phone" value={inputs.phone} onChange={formUpdate} fullWidth />
                    </MDBox>
                    <MDBox mt={4} mb={1} >
                      <MDButton style={{ marginRight: '10px' }} variant="gradient" color="success" type="submit">
                        Crear/Actializar
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
    </Card >

  );
}

ProfileInfoCard.defaultProps = {
  shadow: true,
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  action: PropTypes.shape({
    route: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
  }).isRequired,
  shadow: PropTypes.bool,
};

export default ProfileInfoCard;
