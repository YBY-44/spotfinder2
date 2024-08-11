import { signIn } from "next-auth/react";

export const GoogleButton = () => {
  return (
    <button
      onClick={() => {
        signIn("google", { callbackUrl: "/" });
      }}
      className="text-lg hover:font-bold transition-shadow flex items-center justify-center w-full h-10 border rounded-full bg-white text-black"
    >
      Google
    </button>
  );
};
