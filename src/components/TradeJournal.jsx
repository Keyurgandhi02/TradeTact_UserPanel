import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FIREBASE_ENDPOINTS } from "../constants/apiConstants";
import {
  GENERAL_DELETE_ERROR,
  GENERAL_FETCH_ERROR,
} from "../constants/Strings";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../store/AuthContext";
import NoRecordFound from "./NoRecordFound";
import {
  deleteFirebaseData,
  fetchPaginatedData,
  getFirebaseData,
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
import PageHeading from "./PageHeading";
import ActionsButton from "./ActionsButton";
import { DOWNLOAD_SVG, REMOVE_SVG_WARNING_MODEL } from "../UI/GlobalSVG";

function TradeJournal() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [totalDocuments, setTotalDocuments] = useState(0);
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

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const fetchedOptions = await getFirebaseData(
          FIREBASE_ENDPOINTS.MASTER_DATA,
          currentUser.uid,
          FIREBASE_ENDPOINTS.USER_TRADE_JOURNAL,
          startLoading,
          stopLoading,
          "desc",
          "buyDate"
        );
        setTotalDocuments(fetchedOptions.length);
      } catch (error) {
        toast.error(GENERAL_FETCH_ERROR);
      }
    };

    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

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
      {/* {fetchedData.length && (
        <SearchBar
          downloadHandler={downloadHandler}
          onChangeHandler={onChangeHandler}
        />
      )} */}

      <div class="sm:flex sm:items-center sm:justify-between px-6 py-8">
        <div>
          <div class="flex items-center gap-x-3">
            <PageHeading title="Trade Journal" isListPage={true} />

            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {totalDocuments} Trades
            </span>
          </div>

          <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {fetchedData.length} records showing out of {totalDocuments}
          </p>
        </div>
        <div class="flex items-center mt-4 gap-x-3">
          <ActionsButton
            icon={<DOWNLOAD_SVG />}
            label="Download"
            onClickHandler={downloadHandler}
          />
        </div>
      </div>

      <div class="md:flex md:items-center md:justify-between px-6 py-2">
        <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button class="px-5 py-3 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 sm:text-sm dark:bg-gray-800 dark:text-gray-300">
            View all
          </button>

          <button class="px-5 py-3 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
            Monitored
          </button>

          <button class="px-5 py-3 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
            Unmonitored
          </button>
        </div>

        <div className="md:w-100 w-auto py-1 items-center mt-4 md:mt-0">
          <SearchBar onChangeHandler={onChangeHandler} />
        </div>
      </div>


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
              <DataCardItem title="RATING" data={isModalData?.rating} />
            </div>
            <div className="grid p-3 mb-2 ">
              <DataCardItem title="BROKER" data={isModalData?.broker} />
            </div>
            <div className="grid p-3 mb-2 ">
              <DataCardItem
                title="EMOTIONS WHEN ENTER"
                data={isModalData?.emotionsWhenEnter}
              />
            </div>
            <div className="grid p-3 mb-2 ">
              <DataCardItem
                title="EMOTIONS WHEN EXIT"
                data={isModalData?.emotionsWhenExit}
              />
            </div>
            <div className="grid p-3 mb-2">
              <DataCardItem title="MISTAKE" data={isModalData?.mistake} />
            </div>
            <div className="grid p-3 mb-2">
              <DataCardItem title="LEARNING" data={isModalData?.learning} />
            </div>
          </>
        }
      />
      <ModalDialog
        isOpen={isDeleteModal}
        onClose={cancelDeleteHandler}
        children={
          <GeneralModalContent
            heading="Are you sure?"
            description="Do you really want to delete your trade? This process cannot be
            undone"
            onRejectHandler={cancelDeleteHandler}
            onSuccessHandler={confirmDeleteHandler}
            btnTitleReject="Cancel"
            btnTitleSuccess="Confirm"
            icon={<REMOVE_SVG_WARNING_MODEL />}
          />
        }
      />
      {hasMore && !isLoading && <LoadMore handleLoadMore={handleLoadMore} />}
    </div>
  );
}

export default TradeJournal;
