export const getAuthErrorMessage = (error: any): string => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Цей email вже зареєстрований";
    case "auth/invalid-email":
      return "Невірний email";
    case "auth/weak-password":
      return "Пароль занадто слабкий";
    case "auth/user-not-found":
      return "Користувача не знайдено";
    case "auth/wrong-password":
      return "Невірний пароль";
    default:
      return "Щось пішло не так. Спробуйте ще раз.";
  }
};