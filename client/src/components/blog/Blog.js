import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlogItem } from "../../redux/actions/blogsAction";
import "./blog.css";

const Blog = (props) => {
  const { role } = useSelector((state) => state.authUser.user);
  const dispatch = useDispatch();

  const { blog } = props;

  // useEffect(() => {
  //   dispatch(getBlogsList());
  // }, []);

  const onClickHandler = () => {
    dispatch(deleteBlogItem(blog));
  };

  return (
    <li className='list-items'>
      <p>{props.blog.blog}</p>
      {role === "admin" ? (
        <div>
          <button
            className='buttonn'
            style={{ backgroundColor: "red", color: "white" }}
            onClick={onClickHandler}
          >
            Delete
          </button>
          <button
            className='buttonn'
            style={{ backgroundColor: "Green", color: "white" }}
          >
            {" "}
            Approve
          </button>
        </div>
      ) : null}
    </li>
  );
};

export default Blog;
