import React from "react";
import { Link } from "react-router-dom";

function CalcCards({ title, btntitle, route }) {
  return (
    <div class="card">
      <div class="card-body mx-3 p-3 text-center">
        <h6 class="text-center mb-0">{title}</h6>
        <span class="text-xs">Belong Interactive</span>
        <hr class="horizontal dark my-3" />
        <Link class="btn bg-gradient-dark mb-0" to={route}>
          {btntitle}
        </Link>
      </div>
    </div>
  );
}

export default CalcCards;
