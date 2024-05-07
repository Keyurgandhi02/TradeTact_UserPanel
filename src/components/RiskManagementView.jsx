import React, { useState, useEffect } from "react";
import RMList from "./RMList";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

function RiskManagementView() {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ref = collection(db, "rm_data");
    const snapshot = await getDocs(ref);
    const dataArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchedData(dataArray);
  };

  return (
    <div className="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card-header pb-0 px-3">
            <h6 class="mb-0">Risk Management Information</h6>
          </div>
          <div class="card-body pt-4 p-3">
            <ul class="list-group">
              <RMList rm_data={fetchedData} />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskManagementView;
