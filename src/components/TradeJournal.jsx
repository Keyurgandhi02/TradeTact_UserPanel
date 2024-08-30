import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FIREBASE_ENDPOINTS } from "../constants/apiConstants";
import { GENERAL_DELETE_ERROR } from "../constants/Strings";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/AuthContext";
import NoRecordFound from "./NoRecordFound";
import {
  deleteFirebaseData,
  fetchPaginatedData,
} from "../config/firestoreOperations";
import { useLoading } from "../store/LoadingContext";
import LoadMore from "./LoadMore";
import DataCard from "./DataCard";
import ModalDialog from "./ModalDialog";
import DataCardItem from "./DataCardItem";
import GeneralModalContent from "./GeneralModalContent";
import SearchBar from "./SearchBar";
import { handleExport } from "./ExportCSVButton";
import { filterData } from "../config/helper";

function TradeJournal() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [fetchedData, setFetchedData] = useState([]);
  const [isViewModal, setViewModal] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [isModalData, setModalData] = useState([]);
  const { startLoading, stopLoading, isLoading } = useLoading();
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState(fetchedData);
  const pageSize = 20;

  const lastVisibleRef = useRef(null);

  // Fetch Trade Journal
  const fetchData = useCallback(
    async (isLoadMore = false) => {
      startLoading();
      const { data, lastDoc } = await fetchPaginatedData(
        FIREBASE_ENDPOINTS.MASTER_DATA,
        currentUser.uid,
        FIREBASE_ENDPOINTS.USER_TRADE_JOURNAL,
        pageSize,
        isLoadMore ? lastVisibleRef.current : null,
        "desc",
        "buyDate"
      );
      console.log("data",data)

      setFetchedData((prevData) =>
        isLoadMore ? [...prevData, ...data] : data
      );
      lastVisibleRef.current = lastDoc;
      setHasMore(data.length === pageSize);
      stopLoading();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser.uid]
  );

  // Input Change Handler
  const onChangeHandler = (value) => {
    setSearchTerm(value);
  };

  const deleteHandler = (documentId) => {
    setSelectedDocumentId(documentId);
    setDeleteModal(true);
  };

  // Trade Journal Delete Handler
  const confirmDeleteHandler = async () => {
    if (!selectedDocumentId) {
      toast.error(GENERAL_DELETE_ERROR);
      return;
    }

    try {
      await deleteFirebaseData(
        FIREBASE_ENDPOINTS.MASTER_DATA,
        currentUser.uid,
        FIREBASE_ENDPOINTS.USER_TRADE_JOURNAL,
        selectedDocumentId,
        startLoading,
        stopLoading
      );
    } catch (error) {
      toast.error("Failed to delete item");
    } finally {
      setDeleteModal(false);
      setSelectedDocumentId(null);
      fetchData();
    }
  };

  const cancelDeleteHandler = () => {
    setDeleteModal(false);
    setSelectedDocumentId(null);
  };

  // Trade Journal Edit Handler
  const editHandler = (id) => {
    navigate(`/edit_trade_journal/${id}`);
  };

  // Trade Journal View Handler
  const viewHandler = (data) => {
    setViewModal(true);
    setModalData(data);
  };

  // Fetch Trade Journal
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Data Load More Handler
  const handleLoadMore = () => {
    fetchData(true);
  };

  // Export CSV Handler
  const downloadHandler = () => {
    handleExport(fetchedData, "Trade Journal");
  };

  // Serach Functionality
  useEffect(() => {
    setFilteredResults(filterData(fetchedData, searchTerm, "scriptName"));
  }, [searchTerm, fetchedData]);

  return (
    <div className="md:mb-0 mb-12">
      {fetchedData.length && (
        <SearchBar
          downloadHandler={downloadHandler}
          onChangeHandler={onChangeHandler}
        />
      )}
      {filteredResults.length > 0 ? (
        <>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 p-6">
            {filteredResults.map((data) => (
              <DataCard
                data={data}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
                viewHandler={viewHandler}
              />
            ))}
          </div>
          <Toaster position="top-right" reverseOrder={true} />
        </>
      ) : (
        <NoRecordFound />
      )}
      <ModalDialog
        isOpen={isViewModal}
        onClose={() => setViewModal(false)}
        children={
          <>
            <div className="grid p-3 mb-2 ">
              <DataCardItem
                title="Emotions When Enter"
                data={isModalData?.emotionsWhenEnter}
              />
            </div>
            <div className="grid p-3 mb-2 ">
              <DataCardItem
                title="Emotions When Enter"
                data={isModalData?.emotionsWhenEnter}
              />
            </div>
            <div className="grid p-3 mb-2">
              <DataCardItem title="Mistake" data={isModalData?.mistake} />
            </div>
            <div className="grid p-3 mb-2">
              <DataCardItem title="Learning" data={isModalData?.learning} />
            </div>
          </>
        }
      />
      <ModalDialog
        isOpen={isDeleteModal}
        onClose={cancelDeleteHandler}
        children={
          <GeneralModalContent
            heading="Are you sure you want to delete?"
            description="Once delete item you can not recover it!"
            onRejectHandler={cancelDeleteHandler}
            onSuccessHandler={confirmDeleteHandler}
            btnTitleReject="No"
            btnTitleSuccess="Yes"
          />
        }
      />
      {hasMore && !isLoading && <LoadMore handleLoadMore={handleLoadMore} />}
    </div>
  );
}

export default TradeJournal;
