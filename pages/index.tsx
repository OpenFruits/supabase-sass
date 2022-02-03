import type { CustomNextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "src/utils/supabase";

export const getStaticProps: GetStaticProps = async () => {
  const { data: lessons } = await supabase.from("lesson").select("*");

  return {
    props: { lessons },
  };
};

type Lesson = {
  id: number;
  title: string;
  description: string;
  created_at: any;
};

type Props = { lessons: Lesson[] };

const Home: CustomNextPage<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>

      <div>
        {props.lessons.map((lesson) => (
          <div key={lesson.id}>
            <Link href={`/${lesson.id}`}>
              <a>{lesson.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
