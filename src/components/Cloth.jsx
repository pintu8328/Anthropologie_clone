import { useEffect, useState } from "react";
import Clothdetail from "./Clothdetail";
import styles from "./Cloth.module.css";

const Cloth = ({ products }) => {
  const [cloths, setCloths] = useState([]);

  const getData = () => {
    // fetch(`http://localhost:3001/${products}`)
    fetch(`https://talented-rose-panda.cyclic.app/api/user/cloth`)
      .then((res) => res.json())
      .then((d) => setCloths(d));
  };

  useEffect(() => {
    getData();
  }, [products]);

  const filterProducts = (filterType) => {
    switch (filterType) {
      case "feature":
        break;
      case "price_lToh":
        sortByPrice("price_lToh");
        break;
      case "price_hTol":
        sortByPrice("price_hTol");
        break;
      case "newest":
        break;
      case "bestselling":
        break;
      case "rating_hTol":
        break;
      case "aToz":
        sortByTitle("aToz");
        break;
      case "zToa":
        sortByTitle("zToa");
        break;
      default:
        break;
    }
  };

  const sortByPrice = (priceSortType) => {
    let newCloths = [];
    if (priceSortType === "price_lToh") {
      // sort asc
      newCloths = cloths.sort(function (a, b) {
        return Number(a.price) - Number(b.price);
      });
    } else {
      // sort desc
      newCloths = cloths.sort(function (a, b) {
        return Number(b.price) - Number(a.price);
      });
    }
    setCloths([...newCloths]);
  };
  const sortByTitle = (titleSortType) => {
    let newCloths = [];
    if (titleSortType === "aToz") {
      // sort asc
      newCloths = cloths.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else {
      // sort desc
      newCloths = cloths.sort((a, b) => (b.title > a.title ? 1 : -1));
    }
    setCloths([...newCloths]);
  };

  useEffect(() => {
    console.log("Cloths: ", cloths);
  }, [cloths]);
  return (
    <div>
      <div className={styles.flex}>
        <div className={styles.h}>Women's {products}</div>
        <div>
          <label>Sort: </label>
          <select onChange={(e) => filterProducts(e.target.value)}>
            <option value="feature">Fetured</option>
            <option value="price_lToh">Price: low to high</option>
            <option value="price_hTol">Price: high to low</option>
            <option value="newest">Newest</option>
            <option value="bestselling">Bestselling</option>
            <option value="rating_hTol">Rating: high to low</option>
            <option value="aToz">A-Z</option>
            <option value="zToa">Z-A</option>
          </select>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "40px",
          marginRight: "40px",
        }}
      >
        {cloths.map((item) => {
          return <Clothdetail key={item.id} item={item} location={products} />;
        })}
      </div>
    </div>
  );
};

export default Cloth;