import { useState } from "react";

import { Row, Button } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import FilteringMenu from "components/FilteringMenu";
import PreviewAlert from "components/PreviewAlert";

import { useGetBlogsPages } from "actions/pagination";
import { getPaginatedBlogs } from "lib/api";
// import { useGetBlogs } from "actions";

export default function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 0 },
    date: { asc: 0 },
  });

  //loadMore:to lead more data
  //isLoadingMore:is true whenever we are making request to fetch data
  //isReachingEnd: is true when we loaded all of the data, data is empty(empty array)

  // const { data: blogs, error } = useGetBlogs(initialData);
  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogsPages({
    blogs,
    filter,
  });

  return (
    <PageLayout>
      {preview && <PreviewAlert />}
      <AuthorIntro />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => setFilter({ ...filter, [option]: value })}
      />
      <hr />
      {/* {JSON.stringify(blogs)} */}
      <Row className="mb-5">{pages}</Row>
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={loadMore}
          disabled={isReachingEnd || isLoadingMore}
          size="lg"
          variant="outline-secondary"
        >
          {isLoadingMore
            ? "..."
            : isReachingEnd
            ? "no more blog"
            : "More Blogs"}
        </Button>
      </div>
    </PageLayout>
  );
}

// This function is called during the build (build time)
// Provides props to your page
// It will create static page
export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
      preview,
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
