module.exports.signUpErrors = (err) => {
  let errors = {
    userName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
  };

  if (err.message.includes("userName"))
    errors.userName = "userName incorrect ou déjà pris";

  if (err.message.includes("userLastName"))
    errors.userLastName = "userLastName incorrect ou déjà pris";

  if (err.message.includes("userEmail"))
    errors.userEmail = "userEmail incorrect";

  if (err.message.includes("userPassword"))
    errors.userPassword = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("userName"))
    errors.userName = "Ce userName est déjà pris";

  if (
    err.code === 11000 &&
    Object.keys(err.keyValue)[0].includes("userLastName")
  )
    errors.userLastName = "Ce userLastName est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("userEmail"))
    errors.userEmail = "Cet userEmail est déjà enregistré";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { userEmail: "", userPassword: "" };

  if (err.message.includes("userEmail"))
    errors.userEmail = "userEmail incorrect";

  if (err.message.includes("userPassword"))
    errors.userPassword = "Le mot de passe ne correspond pas";

  return errors;
};

//uploadErrors
// module.exports.uploadErrors = (err) => {
//   let errors = { format: "", maxSize: "" };

//   if (err.message.includes("invalid file"))
//     errors.format = "Format incompatabile";

//   if (err.message.includes("max size"))
//     errors.maxSize = "Le fichier dépasse 500ko";

//   return errors;
// };
