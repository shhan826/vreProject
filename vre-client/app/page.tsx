import HouseList from "@/component/houseList";
import TopHeaderMain from "@/component/topHeaderMain";

export default function Home() {
  return (
    <div>
      <TopHeaderMain/>
      <main className="pt-15 m-auto xl:max-w-5xl lg:max-w-4xl">
        <HouseList/>
      </main>
      { /* <BottomFooter/> */ }
    </div>
  );
};
