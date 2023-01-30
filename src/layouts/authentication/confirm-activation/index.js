/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
// @mui material components
import Card from "@mui/material/Card";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { confirmarUsuario } from "./controller/confirmarUsuarioController";
import If from "components/If/if";
// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  const [activation_code, setActivation_code] = useState("");
  const [statusCofirmacao, setStatusConfirmacao] = useState(null);
  
  const windowUrl = window.location.search;
  const params = new URLSearchParams(windowUrl);
  const email = params.get("email");

  useEffect(() => {
    if (statusCofirmacao){
      setTimeout(() => {
          location.href = "/authentication/sign-in";
        },3000)
    }
 },[statusCofirmacao]);

  return (
    <CoverLayout
      title="Bem vindos!"
      description="Use o formulário abaixo para se cadastrar"
      image={bgImage}
      imgPosition="top"
      button={{ color: "dark", variant: "gradient" }}
    >
      <Card>
        <ArgonBox p={3} mb={1} textAlign="center">
          <ArgonTypography variant="h5" fontWeight="medium">
            Confirmar o cadastro
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Codigo de ativação" value={activation_code} onChange={(e)=>setActivation_code(e.target.value)}/>
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton onClick={()=>confirmarUsuario({activation_code,email},setStatusConfirmacao)} variant="gradient" color="dark" fullWidth>
                Confirmar
              </ArgonButton>
            </ArgonBox>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <If test={statusCofirmacao != null && !statusCofirmacao}>
                <Alert variant="filled" severity="error">
                  Código de confirmação incorreto!
                </Alert>

              </If>
              <If test={statusCofirmacao != null && statusCofirmacao}>
                <Alert variant="filled" severity="success">
                  Confirmação realizada com sucesso!
                </Alert>
              </If>
            </Stack>
            <ArgonBox mt={2}>
              <ArgonTypography variant="button" color="text" fontWeight="regular">
                Já tem uma conta?&nbsp;
                <ArgonTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Entrar
                </ArgonTypography>
              </ArgonTypography>
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
