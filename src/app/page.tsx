import { auth } from "@/auth";
import SignIn from "@/components/sign-in";

export default async function Home() {

  const session = await auth()

  console.log(session?.user)
  return (
    <SignIn />
  );
}
