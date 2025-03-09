import HouseList from "@/component/houseList";
import TopHeader from "@/component/topHeader";

export default function Home() {
  return (
    <div>
      <TopHeader/>
      <main className="pt-15 m-auto xl:max-w-5xl lg:max-w-4xl">
        <HouseList/>
      </main>
      { /* <BottomNaviTab/> */ }
    </div>
  );
};
