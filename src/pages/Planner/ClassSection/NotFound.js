import React from "react";

export default function NotFound() {
  return (
    <div className="flex items-end uppercase h-full text-center p-4">
      <div className="h-2/3 xl:1/2 2xl:h-1/3 w-full flex flex-col justify-between">
        <div>
          <h2 className="font-black text-sm xl:text-lg">no results found!</h2>
          <p className="text-xs xl:text-sm">
            nothing matched your search terms
          </p>
        </div>
        <div>
          <p className="text-xs">
            tip: broaden your search terms for more results
          </p>
        </div>
      </div>
    </div>
  );
}
