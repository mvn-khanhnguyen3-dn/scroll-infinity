import { useEffect, useRef, useState } from "react";
import Card from "../Card";

let limitNumber = 2;
const Users = ({ data, setData }) => {
  const [loadMore, setLoadMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [limit, setLimit] = useState(limitNumber);

  const containerRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    const getData = async (load) => {
      if (load && !isCancelled) {
        await fetch(`https://reqres.in/api/users?page=${pageNumber}`)
          .then((response) => {
            return !response.ok
              ? response.json().then((e) => Promise.reject(e))
              : response.json();
          })
          .then((results) => {
            setData([...data, ...results.data]);
            setTotalPage(results.total_pages);
          })
          .catch((error) => {
            throw error;
          })
          .finally(() => {
            setLoadMore(false);
          });
      }
    };
    getData(loadMore);
    return () => {
      isCancelled = true;
    };
  }, [data, loadMore, setData, pageNumber]);

  useEffect(() => {
    const containerElement = containerRef.current;

    const scrollDownToLoadMore = (e) => {
      const el = e.target;

      if (el.scrollTop + el.clientHeight === el.scrollHeight) {
        setLimit(limit + limitNumber);
        if (limit === data.length) {
          pageNumber < totalPage && setPageNumber(pageNumber + 1);
          setLoadMore(true);
        }

        limit > data.length && setLimit(data.length);

        pageNumber === totalPage && setLoadMore(false);
      }
    };
    containerElement.addEventListener("scroll", scrollDownToLoadMore);

    return () => {
      containerElement.removeEventListener("scroll", scrollDownToLoadMore);
    };
  }, [pageNumber, totalPage, limit, data.length]);

  return (
    <div ref={containerRef} className="container">
      <h3 className="title">Scroll Down To Load More</h3>
      <ul className="card-list">
        {data?.slice(0, limit)?.map((item, index) => (
          <Card key={index} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
