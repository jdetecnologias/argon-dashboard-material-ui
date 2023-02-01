export const  isValidEmail = (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

export const  isValidDate = (date) => /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/.test(date);

export const  isValidGenero = (genero) =>   genero === "M" || genero === "O" || genero === "F";

export const  isValidPasswordLenght = (password) => password.trim().length >= 6