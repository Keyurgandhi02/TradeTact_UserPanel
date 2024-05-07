import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { JOURNALS_COLUMNS } from "../constants/Columns";
import TableBodyItem from "./TableBodyItem";

function JournalTable() {
  const [fetchedData, setFetchedData] = useState([]);
  const [positiveTotal, setPositiveTotal] = useState(0);
  const [negativeTotal, setNegativeTotal] = useState(0);
  const [combinedTotal, setCombinedTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const ref = collection(db, "journal_data");
    const snapshot = await getDocs(ref);
    const dataArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchedData(dataArray);

    let positiveSum = 0;
    let negativeSum = 0;

    dataArray.forEach((item) => {
      const price = parseFloat(item.profitLossPrice);
      if (!isNaN(price)) {
        if (price > 0) {
          positiveSum += price;
        } else {
          negativeSum += price;
        }
      }
    });

    setPositiveTotal(positiveSum);
    setNegativeTotal(negativeSum);
    setCombinedTotal(positiveSum + negativeSum);
  };

  return (
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body px-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0">
                  <thead>
                    <tr>
                      {JOURNALS_COLUMNS.map((col) => (
                        <th class="text-uppercase text-primary text-xl font-weight-bolder opacity-10 text-center">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData.map((data) => (
                      <tr>
                        <TableBodyItem data={data?.buyDate} />
                        <TableBodyItem data={data?.scriptName} />
                        <TableBodyItem data={data?.strategyName} />
                        <TableBodyItem data={`₹${data?.entryPrice}`} />
                        <TableBodyItem data={`₹${data?.slPrice}`} />
                        <TableBodyItem data={`₹${data?.targetPrice}`} />
                        <TableBodyItem data={`₹${data?.exitPrice}`} />
                        <TableBodyItem data={data?.quantity} />
                        <TableBodyItem
                          data={Math.floor(data?.profitLossPrice)}
                        />
                        <TableBodyItem data={data?.emotionsWhenEnter} />
                        <TableBodyItem data={data?.emotionsWhenExit} />
                        <TableBodyItem data={data?.learning} />
                        <TableBodyItem data={data?.mistake} />
                        <TableBodyItem data={data?.rating} />
                        <TableBodyItem data={data?.chart} />

                        <td class="align-middle text-center">
                          <button class="btn btn-link text-danger text-gradient px-3 mb-0">
                            <i class="material-icons text-sm me-2">delete</i>
                            Delete
                          </button>
                          <button class="btn btn-link text-dark px-3 mb-0">
                            <i class="material-icons text-sm me-2">edit</i>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JournalTable;
