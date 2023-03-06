import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} -Mobile resale market`;
  }, [title]);
};
export default useTitle;
