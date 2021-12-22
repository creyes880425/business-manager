import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import MDBox from "../../../shared/MDBox";
import PageLayout from "../../../components/LayoutContainers/PageLayout";

function CoverLayout({ children }) {
  return (
    <PageLayout>
      <MDBox mt={{ xs: 20, lg: 18 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

CoverLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
