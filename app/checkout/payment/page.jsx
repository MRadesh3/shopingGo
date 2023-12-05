import Payment from "@components/Payment";
import { ElementStripe } from "@app/redux/Elements";

const Page = () => {
  return (
    <section>
      <ElementStripe component={<Payment />} />
    </section>
  );
};

export default Page;
