import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import Recommended from "@/components/foryou/Recommended";
import Selected from "@/components/foryou/Selected";
import Suggested from "@/components/foryou/Suggested";
import fetchInitialBooks from "@/lib/fetchInitialBooks";
import React from "react";

export default async function ForYouPage() {
  const initialData = await fetchInitialBooks();


  return (
    <div id="__next">
      <div className="wrapper">
        <Search initialData={initialData} />
        <Sidebar />
        <div className="row">
          <div className="container">
            <div className="foryou__wrapper">
              <Selected books={initialData.selected} />
              <Recommended books={initialData.recommended} />
              <Suggested books={initialData.suggested} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const initialData = await fetchInitialBooksWithDelay();

//   return {
//     props: {
//       initialData,
//     },
//   };
// }

// async function fetchInitialBooksWithDelay() {
//   const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
//   await delay(2000); // 2 seconds delay
//   return fetchInitialBooks();
// }
