import HouseList from "@/component/houseList";
import TopHeaderMain from "@/component/topHeaderMain";

export default function Home() {
  return (
    <div>
      <TopHeaderMain/>
      <main className="pt-26 m-auto xl:max-w-6xl lg:max-w-4xl">
        <HouseList/>
      </main>
      { /* 
        TODO: 추후 회원 기능과 함께 구현 필요
        <BottomFooter/>
      */ }
    </div>
  );
};
