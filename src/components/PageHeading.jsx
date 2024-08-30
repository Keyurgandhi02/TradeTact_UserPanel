import React from "react";

function PageHeading({ title }) {
  return (
    <div class="px-2 py-2 md:px-4 xl:px-3.5">
      <h3 class="text-3xl font-bold text-primary-400">{title}</h3>
    </div>
  );
}

export default PageHeading;
