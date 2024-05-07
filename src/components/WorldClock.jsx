import React from "react";
import Clock from "react-live-clock";

function WorldClock() {
  return (
    <div class="col-lg-2 col-md-4">
      <div class="card h-100">
        <div class="card-header pb-0 mt-3">
          <h6>World Clock</h6>
        </div>
        <div class="card-body p-3">
          <div class="timeline timeline-one-side">
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-success text-gradient">
                  notifications
                </i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">USA</h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  <Clock
                    format={"M/D/YYYY h:mm a"}
                    ticking={true}
                    timezone={"America/New_York"}
                  />
                </p>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  Open at 9:30 am and close at 4 pm
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-danger text-gradient">code</i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  New order #1832412
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  21 DEC 11 PM
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-info text-gradient">
                  shopping_cart
                </i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Server payments for April
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  21 DEC 9:34 PM
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-warning text-gradient">
                  credit_card
                </i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  New card added for order #4395133
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  20 DEC 2:20 AM
                </p>
              </div>
            </div>
            <div class="timeline-block mb-3">
              <span class="timeline-step">
                <i class="material-icons text-primary text-gradient">key</i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  Unlock packages for development
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  18 DEC 4:54 AM
                </p>
              </div>
            </div>
            <div class="timeline-block">
              <span class="timeline-step">
                <i class="material-icons text-dark text-gradient">payments</i>
              </span>
              <div class="timeline-content">
                <h6 class="text-dark text-sm font-weight-bold mb-0">
                  New order #9583120
                </h6>
                <p class="text-secondary font-weight-bold text-xs mt-1 mb-0">
                  17 DEC
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorldClock;
