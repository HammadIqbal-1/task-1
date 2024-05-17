export const useAuth = () => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      return true;
    } else {
      return false;
    }
  };
  