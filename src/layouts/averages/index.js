import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Grid from "@mui/material/Grid";




function Averages(){

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3} mb={3}>
          <Grid item style={{marginTop:"300px"}} >
            Médias diárias
          </Grid>
        </Grid>
    </DashboardLayout>
  );
}

export default Averages;
