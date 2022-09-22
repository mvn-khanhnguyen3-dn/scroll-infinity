import { useEffect, useRef, useState } from "react";
import Loading from "../../Modules/Loading";
import Card from "../Card";

const Users = ({ data, setData }) => {
  const [loadMore, setLoadMore] = useState(true);

  const listRef = useRef(null);

  useEffect(() => {
    const getData = async (load) => {
      if (load) {
        await fetch("https://reqres.in/api/users?page=1")
          .then((response) => response.json())
          .then((results) => setData([...data, ...results.data]))
          .catch((error) => {
            throw error;
          })
          .finally(() => {
            setLoadMore(false);
          });
      }
    };
    getData(loadMore);
  }, [data, loadMore, setData]);

  useEffect(() => {
    const listElement = listRef.current;

    const scrollDownAutoHeight = () => {
      if (
        window.scrollY + window.innerHeight ===
        listElement.clientHeight + listElement.offsetTop
      ) {
        setLoadMore(true);
      }
    };

    window.addEventListener("scroll", scrollDownAutoHeight);
    return () => {
      window.removeEventListener("scroll", scrollDownAutoHeight);
    };
  }, []);

  return (
    <ul ref={listRef} className="card-list container">
      {loadMore ? (
        <Loading />
      ) : (
        data.map((item, index) => (
          <Card key={index} item={item} index={index} />
        ))
      )}
    </ul>
  );
};

export default Users;
