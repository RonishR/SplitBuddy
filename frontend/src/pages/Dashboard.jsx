import Sidebar from "../components/Sidebar";
import { WidgetElement } from "../components/WidgetElement";

export function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main
        className="grid grid-cols-5 p-5 gap-4"
        // style={{
        //   gridTemplateColumns: "1fr 2fr 2fr", // Custom column sizes: first column takes 1 fraction, second and third columns take 2 fractions each
        //   gridAutoRows: "minmax(0, auto)",
        // }}
      >
        <div className="bg-yellow-200 rounded-lg w-52 h-32  text-center text-black items-center justify-center relative">
          <div className="absolute top-4 w-full text-center">
            <div className="text-lg font-semibold">You Owe</div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-md">-$2000</span>
          </div>
        </div>

        <div className="w-full col-span-2 h-96 bg-yellow-200 text-center text-4xl font-semibold pt-4 rounded-lg">
          Groups
          <div className="p-2 scroll-smooth h-80 overflow-scroll relative">
            <WidgetElement label="Paris Trip" />
            <WidgetElement label="Manali Trip" />
            <WidgetElement label="Lunch" />
            <WidgetElement label="Cab" />
            <WidgetElement label="Go Karting" />
            <WidgetElement label="Lazer Tag" />
            <WidgetElement label="Party" />
            <WidgetElement label="Cab" />
          </div>
        </div>

        <div className="w-full h-96 col-span-2 bg-yellow-200 text-center text-4xl font-semibold pt-4 rounded-lg ">
          Friends
          <WidgetElement label="Ronish" />
          <WidgetElement label="Raj" />
          <WidgetElement label="Shyam" />
          <WidgetElement label="Kokila" />
          <WidgetElement label="Devi" />
        </div>
      </main>
    </div>
  );
}
