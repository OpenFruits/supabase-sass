import type { CustomNextPage } from "next";
import { useEffect } from "react";
import { supabase } from "src/utils/supabase";

const Login: CustomNextPage = () => {
  useEffect(() => {
    supabase.auth.signIn({
      provider: "github",
    });
  }, []);

  return (
    <>
      <p>Login</p>
    </>
  );
};

export default Login;
