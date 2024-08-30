import React, { useCallback, useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import { getUserByEmail } from "../config/firestoreOperations";
import { useAuth } from "../store/AuthContext";

function ProfilePage() {
  const { currentUser } = useAuth();
  const [fetchedData, setFetchedData] = useState([]);

  // Fetch Watchlist
  const fetchData = useCallback(async () => {
    const fetchedTasks = await getUserByEmail(currentUser?.email);

    setFetchedData(fetchedTasks);
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
      <UserProfile userData={currentUser} fetchedData={fetchedData}/>
    </>
  );
}

export default ProfilePage;
