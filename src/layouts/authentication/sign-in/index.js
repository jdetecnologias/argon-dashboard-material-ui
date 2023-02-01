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

import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import fundo from "assets/images/img-2.jpg";
import { logarUsuario } from "./controller/logarUsuarioController";
import { setCookie } from "helper/cookies";
import { getCookie } from "helper/cookies";
import { hasValidDadosLogin } from "helper/dadosLoginCheck";

function Illustration() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const dadosLogin = getCookie("dadosLogin");

  if(hasValidDadosLogin()){
    location.href = "/meus_indices";
  }
  
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleLogin = (status, token, id_usuario)=>{

    if(status){
      const dadosLogin ={
        token,
        email: email,
        id_usuario
      }
      setCookie("dadosLogin",JSON.stringify(dadosLogin),300)

    }

    setLoginStatus(status);
  }

  useEffect(() => {
    if (loginStatus){
      setTimeout(() => {
          location.href = "/meus_indices";
        },1000)
    }
 },[loginStatus]);
  return (
    <IllustrationLayout
      title="Entrar"
      description="Digite com seu email e senha para entrar no sistema"
      illustration={{
        image: fundo,
        title: '"Atenção a sua saúde"',
        description:
          "Tenha mais qualidade de vida cuidando de sua saúde para poder desfrutar de uma vida .",
      }}
    >
      <ArgonBox component="form" role="form">
        <ArgonBox mb={2}>
          <ArgonInput type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" size="large" />
        </ArgonBox>
        <ArgonBox mb={2}>
          <ArgonInput type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} placeholder="Password" size="large" />
        </ArgonBox>
        <ArgonBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <ArgonTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox mt={4} mb={1}>
          <ArgonButton onClick={()=>logarUsuario({email, senha},handleLogin)} color="info" size="large" fullWidth>
            Sign In
          </ArgonButton>
        </ArgonBox>
        <ArgonBox mt={3} textAlign="center">
          <ArgonTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <ArgonTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
            >
              Sign up
            </ArgonTypography>
          </ArgonTypography>
        </ArgonBox>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Illustration;
