import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "../../../../shared/MDBox";
import MDTypography from "../../../../shared/MDTypography";

// ReportsLineChart configurations
import configs from "../../../../components/Charts/LineCharts/ReportsLineChart/configs";
import MDButton from "../../../../shared/MDButton";

import axios from 'axios';
import Swal from 'sweetalert2';
//import BusinessContext from "../../context/business-context";

function ReportsLineChart({ color, title, chart, actualizar, setActualizar }) {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  const incomes = () => {
    if (sessionStorage.getItem('SESSION_BUSINESS')) {
      let _month = Math.floor(Math.random() * (12 - 1 + 1) + 1);
      let _income = Math.floor(Math.random() * (500 - 0 + 1) + 0);
      const _business = JSON.parse(sessionStorage.getItem('SESSION_BUSINESS'));
      const incomesObj = {
        month: _month,
        income: _income,
        businessId: _business.id
      };
      axios.post('/api/incomes/upsert', incomesObj)
          .then(resp => {
            if (resp.data.ok) {
              Swal.fire('Se han actualizado los ingresos', resp.data.message, 'success');
              // setInputs(initialState);
              // setOpen(false);
              setActualizar(!actualizar)
            }
          })
          .catch(err => {
            console.log(err);
            Swal.fire('Error al actualizar ingresos', err.message, 'error');
          })
    } else {
      Swal.fire('Importante', 'Debe crear una Empresa antes de generar Ingresos', 'info');
    }
  };

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
        {useMemo(
          () => (
            <MDBox
              variant="gradient"
              bgColor={color}
              borderRadius="lg"
              coloredShadow={color}
              py={2}
              pr={0.5}
              mt={-5}
              height="12.5rem"
            >
              <Line data={data} options={options} />
            </MDBox>
          ),
          [chart, color]
        )}
        <MDBox pt={3} pb={1} px={1}>
          {/* <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography> */}
          <MDButton variant="gradient" color="success" onClick={incomes}>
            Generar Ingresos aleatorios
          </MDButton>
          <Divider />
        </MDBox>
      </MDBox>
    </Card>
  );
}

ReportsLineChart.defaultProps = {
  color: "dark",
  description: "",
};


ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;
