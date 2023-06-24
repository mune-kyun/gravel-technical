import AppTitle from "@/components/AppTitle";
import Tabs from "@/components/Tabs";

export default function MyList() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 gap-4`}
    >
      <AppTitle />
      <Tabs currentLink={"mylist"} />
    </main>
  );
}
