import type { CustomNextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { supabase } from "src/utils/supabase";

const Logout: CustomNextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      supabase.auth.signOut();
      router.push("/");
    };
    logout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p>Logout</p>
    </>
  );
};

export default Logout;
