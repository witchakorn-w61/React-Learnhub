import { useEffect, useState } from "react";

const useData = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch("https://api.learnhub.thanayut.in.th/content");
        const data = await res.json();
        setData(data.data);
        console.log(data.data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return { data, setData };
};

export default useData;
