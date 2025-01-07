import { create } from "zustand";
import { persist } from "zustand/middleware";
import { subscribeWithSelector } from "zustand/middleware";
import { devtools } from "zustand/middleware";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  decrementAsync: () => Promise<void>;
};

export const useCounterStore = create<CounterStore>()(
  devtools(
    subscribeWithSelector(
      persist<CounterStore>(
        (
          set
          // , get
        ) => ({
          count: 0,
          increment: () => {
            // const newCount = get().count; // بدون نیاز به دسترسی خارجی به استیت، مقدار فعلی آن را خوانده و با شروط مد نظرتان مقدار را تغییر دهید
            // set({ count: newCount });
            // or ...
            set((state) => ({ count: state.count + 1 }));
          },
          decrement: () => {
            set((state) => ({ count: state.count - 1 }));
          },
          decrementAsync: async () => {
            await new Promise<void>((resolve) =>
              setTimeout(() => {
                set((state) => ({ count: state.count - 1 }));
                resolve();
              }, 1000)
            );
          },
        }),
        {
          name: "counterLS", // persist : sync state and local with name parameters
          // storage : ''
        }
      )
    ),
    { enabled: true, anonymousActionType: "unknown" }
  )
);

// import { produce } from 'immer' , https://www.npmjs.com/package/zustand  مطالع کن باحاله
// import { immer } from 'zustand/middleware/immer'
// https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en => نصب اکتنشن ریکت ریداکس
