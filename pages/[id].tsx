import type { CustomNextPage, GetStaticPaths, GetStaticProps } from "next";
import type { Lesson } from "src/type/lesson";
import { supabase } from "src/utils/supabase";

const LessonDetails: CustomNextPage<{ lesson: Lesson }> = (props) => {
  return (
    <div className="py-16 px-8 mx-auto w-full max-w-3xl">
      <h1 className="mb-6 text-3xl">{props.lesson.title}</h1>
      <p>{props.lesson.description}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase.from<{ id: number }>("lesson").select("id");
  const paths = data?.map(({ id }) => ({
    params: {
      id: id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params?.id as string;
  const { data: lesson } = await supabase.from<Lesson>("lesson").select("*").eq("id", id).single();

  return {
    props: {
      lesson,
    },
  };
};

export default LessonDetails;
