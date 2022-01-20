import type { CustomNextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Button } from "src/component/Button";
import { FluidLayout } from "src/layout/FluidLayout";
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
  const handleClick = () => {
    alert("Hello World!");
  };

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>

      <div className="space-y-4">
        <h2>Index</h2>
        <Button variant="solid-blue" className="p-2 rounded" onClick={handleClick}>
          show alert!
        </Button>
      </div>
      <div>
        {props.lessons.map((lesson) => {
          return (
            <div key={lesson.id}>
              <Link href={`/${lesson.id}`}>
                <a>{lesson.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

Home.getLayout = FluidLayout;

export default Home;
