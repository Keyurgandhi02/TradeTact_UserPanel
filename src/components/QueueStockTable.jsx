import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import TableBodyItem from "./TableBodyItem";
import { QUEUE_STOCK_COLUMNS } from "../constants/Columns";

function QueueStockTable({ updateData }) {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [updateData]);

  // Fetch Queue Stock Handler
  const fetchData = async () => {
    const ref = collection(db, "queue_stocks_data");
    const snapshot = await getDocs(ref);
    const dataArray = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFetchedData(dataArray);
  };

  // Delete Queue Stock Handler
  const deleteHandler = async (documentId) => {
    const reference = doc(db, "queue_stocks_data", documentId);
    await deleteDoc(reference);
    alert("Data Deleted Successfully!");
    fetchData();
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
                      {QUEUE_STOCK_COLUMNS.map((col) => (
                        <th class="text-uppercase text-primary text-xl font-weight-bolder opacity-10 text-center">
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fetchedData.map((data) => (
                      <tr>
                        <TableBodyItem data={data?.created_at} />
                        <TableBodyItem data={data?.scriptName} />
                        <TableBodyItem data={data?.strategyName} />
                        <TableBodyItem data={`₹${data?.stockPrice}`} />

                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-success">
                            {data?.status}
                          </span>
                        </td>

                        <td class="align-middle text-center">
                          <button
                            class="btn btn-link text-danger text-gradient px-3 mb-0"
                            onClick={() => deleteHandler(data?.id)}
                          >
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

export default QueueStockTable;
