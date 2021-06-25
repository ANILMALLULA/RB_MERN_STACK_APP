import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "../blog/Blog";
import Loader from "react-loader-spinner";
import "./blogs.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { getBlogsList, postBlogItem } from "../../redux/actions/blogsAction";

const Blogs = () => {
  const [blog, setblog] = useState({ blog: "" });
  const { blogs, loading } = useSelector((state) => state.blogReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogsList());
  }, [dispatch]);

  const onChange = (e) => {
    setblog({ blog: e.target.value });
  };

  const onSubmit = (e) => {
    if (blog.blog === "") {
      return;
    }
    e.preventDefault();
    dispatch(postBlogItem(blog));
    resetForm();
  };

  const resetForm = () => {
    setblog({ blog: "" });
  };

  return loading ? (
    <div style={{ textAlign: "center", margin: "auto 0" }}>
      <Loader type='TailSpin' color='#00BFFF' height={50} width={50} />
    </div>
  ) : (
    <div className='main-container'>
      <h4>List of all BLOGS</h4>
      <ul className='list-container'>
        {blogs?.map((b) => {
          return <Blog key={b._id} blog={b} />;
        })}
      </ul>
      <br />
      <form onSubmit={onSubmit}>
        <label htmlFor='blog' className='labell'>
          Blog information
        </label>
        <input
          type='text'
          name='blog'
          value={blog.blog}
          onChange={onChange}
          className='inputBox'
          placeholder='Please Enter the Blog info'
        />
        <button className='buttonn' type='submit'>
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default Blogs;
