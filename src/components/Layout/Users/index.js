import React, { useEffect, useRef, useState } from "react";
import Loading from "../../Modules/Loading";
import Card from "../Card";

const Users = (props) => {
  const [loadMore, setLoadMore] = useState(true);

  const listRef = useRef(null);

  const { data, setData } = props;

  useEffect(() => {
    const getData = async (load) => {
      if (load) {
        await fetch("https://reqres.in/api/users?page=2")
          .then((response) => response.json())
          .then((results) => setData([...data, ...results.data]))
          .catch((error) => {
            throw error;
          });
      }
    };
    getData(loadMore);
    setLoadMore(false);
  }, [data, loadMore, setData]);

  useEffect(() => {
    const listElement = listRef.current;

    const scrollDown = (e) => {
      const target = e.target;
      if (target.scrollTop + target.clientHeight === target.scrollHeight) {
        setLoadMore(true);
      }
    };

    const scrollDownAutoHeight = () => {
      if (
        window.scrollY + window.innerHeight ===
        listElement.clientHeight + listElement.offsetTop
      ) {
        setLoadMore(true);
      }
    };

    if (data.scrollable) {
      listElement.addEventListener("scroll", scrollDown);
    } else {
      window.addEventListener("scroll", scrollDownAutoHeight);
    }

    return () => {
      listElement.removeEventListener("scroll", scrollDown);
      window.removeEventListener("scroll", scrollDownAutoHeight);
    };
  }, [data]);

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
