import { useState, useEffect } from "react";
import { getCategories } from "../utils/api";

const DropDowns = ({ category, setCategory, setSortBy, setOrder }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.categories);
    });
  }, [category]);

  return (
    <section id="dropdowns">
      <p>
        To choose reviews by category, please pick from the drop down menu below
      </p>
      <p>pick options to order</p>
      <select id="dropdown_category" name="category" onChange={(e) => setCategory(e.target.value)}>
        <option value="">all reviews</option>
        {categories.map((cata) => {
          return (
            <option key={cata.slug} value={cata.slug}>
              {cata.slug}
            </option>
          );
        })}
      </select>
      <select id="dropdown_sort" name="sort_by" onChange={(e) => setSortBy(e.target.value)}>
        <option value="created_at">created at</option>
        <option value="title">title</option>
        <option value="votes">votes</option>
        <option value="comment_count">comment count</option>
        <option value="category">category</option>
        <option value="owner">author</option>
      </select>
      <select id="dropdown_order" name="order" onChange={(e) => setOrder(e.target.value)}>
        <option value="desc">desc</option>
        <option value="asc">asc</option>
      </select>
    </section>
  );
};

export default DropDowns;
