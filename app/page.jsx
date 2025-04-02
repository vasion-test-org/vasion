import ClientStory from "@/components/ClientStory";
import { fetchData } from "@/lib/fetchData";
import { draftMode } from "next/headers";

export default async function Home() {
  const { isEnabled } = draftMode();
  const initialStory = await fetchData("home", isEnabled);

  if (!initialStory) {
    return <div>404 – Story not found</div>;
  }

  return <ClientStory initialStory={initialStory} />;
}
