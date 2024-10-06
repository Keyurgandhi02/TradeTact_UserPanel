import React, { useCallback, useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import { getFirebaseData } from "../config/firestoreOperations";
import { useAuth } from "../context/AuthContext";
import { FIREBASE_ENDPOINTS } from "../constants/apiConstants";
import { useLoading } from "../context/LoadingContext";

function ProfilePage() {
  const { currentUser } = useAuth();
  const { startLoading, stopLoading } = useLoading();
  const [fetchedJournalData, setFetchedJournalData] = useState(0);
  const [fetchedBroker, setFetchedBroker] = useState(0);
  const [fetchedStrategy, setFetchedStrategy] = useState(0);

  // Fetch Watchlist
  const fetchData = useCallback(async () => {
    const fetchedTradeJournal = await getFirebaseData(
      FIREBASE_ENDPOINTS.MASTER_DATA,
      currentUser.uid,
      FIREBASE_ENDPOINTS.USER_TRADE_JOURNAL,
      startLoading,
      stopLoading,
      "desc",
      "buyDate"
    );

    const fetchedBroker = await getFirebaseData(
      FIREBASE_ENDPOINTS.MASTER_DATA,
      currentUser.uid,
      FIREBASE_ENDPOINTS.USER_MANAGE_BROKERS,
      startLoading,
      stopLoading,
      "desc",
      "doc_created_At"
    );

    const fetchedStrategy = await getFirebaseData(
      FIREBASE_ENDPOINTS.MASTER_DATA,
      currentUser.uid,
      FIREBASE_ENDPOINTS.USER_MANAGE_STRATEGY,
      startLoading,
      stopLoading,
      "desc",
      "doc_created_At"
    );

    setFetchedJournalData(fetchedTradeJournal?.length);
    setFetchedBroker(fetchedBroker?.length);
    setFetchedStrategy(fetchedStrategy?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.uid]);

  // Fetch Profile Details
  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, [currentUser, fetchData]);

  return (
    <>
      <UserProfile
        userData={currentUser}
        fetchedJournalData={fetchedJournalData}
        fetchedBroker={fetchedBroker}
        fetchedStrategy={fetchedStrategy}
      />
    </>
  );
}

export default ProfilePage;
