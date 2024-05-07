import React from "react";

function TableBodyItem({ data }) {
  return (
    <td class="align-middle text-center">
      <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">{data}</h6>
      </div>
    </td>
  );
}

export default TableBodyItem;
