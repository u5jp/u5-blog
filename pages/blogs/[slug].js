import PageLayout from "components/PageLayout";
import BlogHeader from "components/BlogHeader";
// import { useRouter } from "next/router";
import { getBlogBySlug, getAllBlogs } from "lib/api";
import { Row, Col } from "react-bootstrap";
import { urlFor } from "lib/api";

import BlogContent from "components/BlogContent";

const BlogDetail = ({ blog }) => {
  // const { query } = useRouter();
  return (
    <PageLayout>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <BlogHeader
            title={blog.title}
            subtitle={blog.subtitle}
            coverImage={urlFor(blog.coverImage).height(600).url()}
            author={blog.author}
            date={blog.date}
          />
          <hr />
          {/* Blog Content Here */}
          <BlogContent content={blog.content} />
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
  return {
    // paths: [
    //   {params: { slug: "my-first-blog" },},
    //   {params: { slug: "my-second-blog" },},
    //   {params: { slug: "my-third-blog" },},
    // ],
    paths: blogs?.map((b) => ({ params: { slug: b.slug } })),
    fallback: false,
  };
}

export default BlogDetail;
