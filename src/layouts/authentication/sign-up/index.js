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
import { Link, Navigate } from "react-router-dom";
import {useState, useEffect} from "react";
// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonInput from "components/ArgonInput";
import ArgonButton from "components/ArgonButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import { cadastrarUsuario } from "./controller/cadastrarUsuarioController";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import If from "components/If/if";
// Images
const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg";

function Cover() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dt_nasc, setDataNasc] = useState("");
  const [genero, setGenero] = useState("");
  const [statusCadastro, setStatusCadastro] = useState(null);
  const [messageErrorList, setMessageErrorList] = useState([]);

  const handleCadastro = (statusCadastro, messageErrorList = [])=>{
    setStatusCadastro(statusCadastro)
    if(messageErrorList.length>0) setMessageErrorList(messageErrorList)
  }

  useEffect(() => {
    if (statusCadastro){
      setTimeout(() => {
          location.href = "/authentication/confirm-user?email=" + email;
        },3000)
    }
 },[statusCadastro]);


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
            Cadastrar
          </ArgonTypography>
        </ArgonBox>
        <ArgonBox pt={2} pb={3} px={3}>
          <ArgonBox component="form" role="form">
            <ArgonBox mb={2}>
              <ArgonInput placeholder="Nome" value={nome} onChange={(e)=>setNome(e.target.value)}/>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="date"  value={dt_nasc} onChange={(e)=>setDataNasc(e.target.value)} placeholder="Data nascimento" />
            </ArgonBox>
            <ArgonBox mb={2}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">Gênero</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={genero}
                onChange={(e)=>setGenero(e.target.value)}
              >
                <FormControlLabel value="F" control={<Radio />} label="Feminino" />
                <FormControlLabel value="M" control={<Radio />} label="Masculino" />
                <FormControlLabel value="O" control={<Radio />} label="Outros" />
              </RadioGroup>
            </FormControl>
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="E-mail" />
            </ArgonBox>
            <ArgonBox mb={2}>
              <ArgonInput type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} placeholder="Senha" />
            </ArgonBox>
            <ArgonBox display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <ArgonTypography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Eu aceito os&nbsp;
              </ArgonTypography>
              <ArgonTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                textGradient
              >
                Termos e condições
              </ArgonTypography>
            </ArgonBox>

            <ArgonBox mt={4} mb={1}>
              <ArgonButton onClick={()=>cadastrarUsuario({nome, dt_nasc, email, senha, genero},handleCadastro)} variant="gradient" color="dark" fullWidth>
                Cadastrar
              </ArgonButton>
            </ArgonBox>
            <Stack sx={{ width: '100%' }} spacing={2}>
              <If test={statusCadastro != null && !statusCadastro}>
                <Alert variant="filled" severity="error">
                  {
                    messageErrorList.map((item, index) => <p key={index}>{index+1} - {item}</p>)
                  }
                </Alert>

              </If>
              <If test={statusCadastro != null && statusCadastro}>
                <Alert variant="filled" severity="success">
                  Cadastrado com sucesso!
                  Enviamos um email com o código de ativação.
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
