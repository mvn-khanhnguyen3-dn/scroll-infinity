import { useEffect, useRef, useState } from "react";
import Card from "../Card";

const Users = ({ data, setData }) => {
  const [loadMore, setLoadMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const [limit, setLimit] = useState(4);

  const containerRef = useRef(null);

  useEffect(() => {
    const getData = async (load) => {
      if (load) {
        await fetch(`https://reqres.in/api/users?page=${pageNumber}`)
          .then((response) => response.json())
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
  }, [data, loadMore, setData, pageNumber]);

  useEffect(() => {
    const containerElement = containerRef.current;

    const scrollDownAutoHeight = (e) => {
      const el = e.target;
      if (el.scrollTop + el.clientHeight === el.scrollHeight) {
        setLoadMore(true);
        pageNumber < totalPage && setPageNumber(pageNumber + 1);
        setLimit(limit + 4);
        if (pageNumber === totalPage) {
          setLoadMore(false);
        }
      }
    };

    containerElement.addEventListener("scroll", scrollDownAutoHeight);
    return () => {
      containerElement.removeEventListener("scroll", scrollDownAutoHeight);
    };
  }, [pageNumber, totalPage, limit]);

  return (
    <div ref={containerRef} className="container">
      <ul className="card-list">
        {data.slice(0, limit).map((item, index) => (
          <Card key={index} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default Users;
