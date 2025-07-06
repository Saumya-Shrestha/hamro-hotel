import React from "react";
import SmallBanner from "../components/common/SmallBanner";
import BlogCards from "../components/cards/BlogCards";

const Blog = ({ mode }) => {
  return (
    <>
      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <SmallBanner title="Blogs" />
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="150"
        data-aos-duration="1200"
        data-aos-easing="ease-out-cubic"
      >
        <BlogCards mode={mode} />
      </div>
    </>
  );
};

export default Blog;
