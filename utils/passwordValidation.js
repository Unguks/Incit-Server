const passwordValidator = (password) => {
    const lowerCaseRegExp = /(?=.*[a-z])/;
    const upperCaseRegExp = /(?=.*[A-Z])/;
    const digitRegExp = /(?=.*[0-9])/;
    const specialCharRegExp = /(?=.*[!@#$%^&*])/;
    const minLengthRegExp = /(?=.{8,})/;
  
    return lowerCaseRegExp.test(password) &&
           upperCaseRegExp.test(password) &&
           digitRegExp.test(password) &&
           specialCharRegExp.test(password) &&
           minLengthRegExp.test(password);
  };
  
  module.exports = passwordValidator;
  