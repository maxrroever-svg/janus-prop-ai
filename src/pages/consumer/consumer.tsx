import { useEffect } from "react";

const ConsumerRedirect = () => {
  useEffect(() => {
    window.location.href = '/consumer';
  }, []);

  return null;
};

export default ConsumerRedirect;