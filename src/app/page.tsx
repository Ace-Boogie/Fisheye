
import PhotographersPage from "@/components/PhotographersPage/PhotographersPage";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <>
        <Header title="Nos Photographes" />
      <main>
        <PhotographersPage/>
      </main>
    </>
  );
}
