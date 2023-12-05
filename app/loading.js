import Image from "next/image";

export default function Loading() {
  return (
    <section className="md:mt-[140px] mt-[120px] h-[100vh]">
      <div className="flex justify-center items-center">
        <h1 className="text-2xl font-satoshi font-semibold text-red-500 ">
          Loading
        </h1>
        <Image
          src="/assets/icons/loadergif.gif"
          alt="loading"
          width={100}
          height={100}
        ></Image>
      </div>
      <p className="text-center text-slate-500 font-medium">
        Your shopping adventure is loading...
      </p>
    </section>
  );
}
