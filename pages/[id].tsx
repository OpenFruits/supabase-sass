import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import { supabase } from "src/utils/supabase";

type Lesson = {
  id: number;
  title: string;
  description: string;
  created_at: any;
};

type Props = { lesson: Lesson };

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: lessons } = await supabase.from("lesson").select("id");
  const paths = lessons?.map(({ id }) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
  const { data: lesson } = await supabase.from("lesson").select("*").eq("id", id).single();

  return {
    props: {
      lesson,
    },
  };
};

const LessonDetails: CustomNextPage<Props> = (props) => {
  return (
    <div className="py-16 px-8 mx-auto w-full max-w-3xl">
      <h1 className="mb-6 text-3xl">{props.lesson.title}</h1>
      <p>{props.lesson.description}</p>
    </div>
  );
};

export default LessonDetails;
