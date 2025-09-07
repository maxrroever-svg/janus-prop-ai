import { useEffect } from "react";

const InvestorRedirect = () => {
  useEffect(() => {
    window.location.href = '/dashboard';
  }, []);

  return null;
};

export default InvestorRedirect;