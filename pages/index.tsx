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

      <div className="px-2 my-16 mx-auto w-full max-w-3xl">
        {props.lessons.map((lesson) => (
          <Link key={lesson.id} href={`/${lesson.id}`}>
            <a className="flex p-8 mb-4 h-40 text-xl rounded shadow">{lesson.title}</a>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Home;
