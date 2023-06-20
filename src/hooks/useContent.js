import { useEffect, useState } from "react";

const useContent = (id) => {
  const [content, setContent] = useState(null);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await fetch(
          `https://api.learnhub.thanayut.in.th/content/${id}`
        );
        const data = await res.json();
        setContent(data);
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { content, setContent };
};

export default useContent;
