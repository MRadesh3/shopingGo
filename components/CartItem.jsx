import { shortenText } from "@functions";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ item }) => {
  return (
    <section className="grid grid-cols-2 gap-5 text-center">
      <div className="flex justify-center items-center max-md:col-span-2">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="object-contain w-full h-[100px] rounded-xl"
        />
      </div>
      <div className="flex justify-center items-center max-md:col-span-2">
        <Link href={`/products/Id/${item._id}`}>
          {shortenText(item.name, 30)}
        </Link>
      </div>
    </section>
  );
};

export default CartItem;
