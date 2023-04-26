import { cleanDadosLogin } from "./dadosLoginCheck"

export function loginRedirect(){
    alert("Favor autenticar novamente no sistema, você será redirecionado para a página de login!")
    cleanDadosLogin();
    location.href = "/sign-in"
}