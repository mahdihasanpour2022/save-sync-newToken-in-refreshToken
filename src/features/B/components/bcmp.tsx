"use client";
import { useCounterStore } from "@/stores/counterStore";
import { useShallow } from "zustand/shallow";

const Bcmp = () => {
  // const count = useCounterStore((state) => state.count);
  // useShallow میان‌افزاری است که برای مقایسه ساده‌تر و بهینه‌تر استفاده می‌شود. این میان‌افزار به شما این امکان را می‌دهد که هنگام دسترسی به استیت، تنها زمانی که مقادیر خاص تغییر می‌کنند، کامپوننت را ری‌رندر کنید.
  const count = useCounterStore(useShallow((state) => state.count)); // از ری رندر غیر ضروری جلوگیری میکند.
  // const {increment} = useCounterStore((state) => state); //  با هر تغییری در هر بخشی از استور کامپوننت ری رندر میشود
  const increment = useCounterStore((state) => state.increment); //روشش بهتر :   کامپوننت فقط زمانی ری‌رندر می‌شود که این مقدار تغییر کند چون فقط این مقدار از استور گرفته میشود.
  const decrement = useCounterStore((state) => state.decrement);
  const decrementAsync = useCounterStore((state) => state.decrementAsync);

  // subscribeWithSelector : برای گوش دادن به تغییرات بخش‌های خاص استیت به صورت انتخابی مفید است و به شما این امکان را می‌دهد که به تغییرات خاصی از استیت توجه کنید.
  useCounterStore.subscribe(
    (state) => state.count,
    (count, previousCount) =>
      console.log("previousCount :", previousCount, "count", count)
  );

  return (
    <>
      <div>{count} : in B</div>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => decrement()}>decrement</button>
      <button onClick={() => decrementAsync()}>decrementAsync</button>
    </>
  );
};

export default Bcmp;
