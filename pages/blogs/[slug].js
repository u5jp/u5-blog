import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";
import ErrorPage from "next/error";
// import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs } from "lib/api";
import { Row, Col } from "react-bootstrap";
import { urlFor } from "lib/api";
import moment from "moment";
import { useRouter } from "next/router";

import BlogContent from "components/BlogContent";

const BlogDetail = ({ blog }) => {
  // const { query } = useRouter();
  const router = useRouter();

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode="404" />;
  }

  if (router.isFallback) {
    console.log("loading fallback page");
    return <PageLayout className="blog-detail-page">Loading...</PageLayout>;
  }

  return (
    <PageLayout className="blog-detail-page">
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={moment(blog.date).format("LLL")}
          />
          <hr />
          {/* Blog Content Here */}
          {blog.content && <BlogContent content={blog.content} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

export async function getStaticProps({ params }) {
  const blog = await getBlogBySlug(params.slug);
  return {
    props: { blog },
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => ({ params: { slug: b.slug } }));
  console.log(paths);
  return {
    // paths: [
    //   {params: { slug: "my-first-blog" },},
    //   {params: { slug: "my-second-blog" },},
    //   {params: { slug: "my-third-blog" },},
    // ],
    paths,
    fallback: true,
  };
}

export default BlogDetail;
