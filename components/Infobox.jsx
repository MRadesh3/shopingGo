import { inforBoxData } from "@constants";

const Infobox = () => {
  return (
    <section className="flex justify-center items-center mx-3 gap-10 my-10 max-lg:flex-col">
      {inforBoxData.map((box) => (
        <div key={box.title} className="shadow-xl rounded-lg p-9 max-lg:w-full">
          <div className="flex justify-center gap-3 items-center py-4 mb-4">
            <span className="text-4xl">{box.icon}</span>
            <h1 className="text-xl text-[#4b077c] font-semibold">
              {box.title}
            </h1>
          </div>
          <p className="text-center text-slate-500">{box.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default Infobox;
