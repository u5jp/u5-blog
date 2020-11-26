import { useState } from "react";

import { Row, Col } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import CardItem from "components/CardItem";
import CardListItem from "components/CardListItem";
import FilteringMenu from "components/FilteringMenu";

import { useGetBlogsPages } from "actions/pagination";
import { getAllBlogs } from "lib/api";
import { useGetBlogs } from "actions";

export default function Home({ blogs: initialData }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
  });

  const { data: blogs, error } = useGetBlogs(initialData);

  return (
    <PageLayout>
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          debugger;
          setFilter({ ...filter, [option]: value });
        }}
      />
      <hr />
      {/* {JSON.stringify(blogs)} */}
      <Row className="mb-5">
        {blogs.map((blog) =>
          filter.view.list ? (
            <Col key={`${blog.slug}-list`} md="9">
              <CardListItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                slug={blog.slug}
                link={{
                  href: "blogs/[slug]",
                  as: `/blogs/${blog.slug}`,
                }}
              />
            </Col>
          ) : (
            <Col key={blog.slug} md="4">
              <CardItem
                author={blog.author}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                image={blog.coverImage}
                slug={blog.slug}
                link={{
                  href: "blogs/[slug]",
                  as: `/blogs/${blog.slug}`,
                }}
              />
            </Col>
          )
        )}
      </Row>
    </PageLayout>
  );
}

// This function is called during the build (build time)
// Provides props to your page
// It will create static page
export async function getStaticProps() {
  const blogs = await getAllBlogs({ offset: 0 });
  return {
    props: {
      blogs,
    },
  };
}

// export async function getServerSideProps() {
//   const randomNumber = Math.random();
//   const blogs = await getAllBlogs();
//   return {
//     props: {
//       blogs,
//       randomNumber,
//     },
//   };
// }

//Static Page
//Faster,can be cached using CDN
//Created at build time
//When we making the request we are always receiving the some html document

//Dynamic Page
//Created at request time (we can fetch data on server)
//Little bit slower, the time depends on data you are fetching
