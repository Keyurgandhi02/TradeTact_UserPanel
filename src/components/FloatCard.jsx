import React from "react";

function FloatCard({ setShowHandler }) {
  return (
    <div class="card shadow-lg">
      <div class="card-header pb-0 pt-3">
        <div class="float-start">
          <h5 class="mt-3 mb-0">Material UI Configurator</h5>
          <p>See our dashboard options.</p>
        </div>
        <div class="float-end mt-4">
          <button
            class="btn btn-link text-dark p-0 fixed-plugin-close-button"
            onClick={() => setShowHandler(false)}
          >
            <i class="material-icons">clear</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatCard;
