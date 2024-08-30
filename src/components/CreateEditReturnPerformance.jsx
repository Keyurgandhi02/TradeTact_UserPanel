import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FIREBASE_ENDPOINTS } from "../constants/apiConstants";
import { useNavigate, useParams } from "react-router-dom";
import GlobalInput from "./GlobalInput";
import { LIST_FLOAT_SVG } from "../UI/GlobalSVG";
import FloatButton from "./FloatButton";
import {
  GENERAL_ADD_SUCCESS,
  GENERAL_FORM_VALIDATIONS_ERROR,
  GENERAL_SUBMIT_ERROR,
  ROI_PAGE_STRINGS,
} from "../constants/Strings";
import { useAuth } from "../store/AuthContext";
import {
  addFirebaseData,
  getFirebaseDataById,
  updateFirebaseData,
} from "../config/firestoreOperations.js";
import PageHeading from "./PageHeading";
import GlobalButton from "./GlobalButton";
import { validateAllFields } from "../config/validationUtils";
import { roiValidationRules } from "../config/validations";

const initialState = {
  created_at: "",
  accountName: "",
  invested_amount: "",
  returned_amount: "",
  charges: "",
};

function CreateEditReturnPerformance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState(initialState);
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      setIsEditMode(true);
      try {
        const fetchedTasks = await getFirebaseDataById(
          FIREBASE_ENDPOINTS.MASTER_DATA,
          currentUser.uid,
          FIREBASE_ENDPOINTS.USER_ROI,
          id
        );
        setFormData(fetchedTasks);
      } catch (error) {
        toast.error("Error fetching data");
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Input Change Handler
  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Form Submit Handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { invested_amount, returned_amount } = formData;
    const investmentNum = parseFloat(invested_amount);
    const returnAmountNum = parseFloat(returned_amount);

    const roiResult = ((returnAmountNum - investmentNum) / investmentNum) * 100;
    const returnAmount = returnAmountNum - investmentNum;
    const data = {
      ...formData,
      returnPercentage: roiResult,
      returnAmount,
    };

    const modifiedData = {};
    let hasChanges = false;

    Object.keys(data).forEach((key) => {
      if (data[key] !== initialState[key]) {
        modifiedData[key] = data[key];
        hasChanges = true;
      }
    });

    const validationErrors = validateAllFields(
      isEditMode ? modifiedData : data,
      roiValidationRules
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error(GENERAL_FORM_VALIDATIONS_ERROR);
      return;
    }

    try {
      if (isEditMode && hasChanges) {
        await updateFirebaseData(
          FIREBASE_ENDPOINTS.MASTER_DATA,
          currentUser.uid,
          FIREBASE_ENDPOINTS.USER_ROI,
          id,
          modifiedData
        );
      } else if (!isEditMode) {
        await addFirebaseData(
          FIREBASE_ENDPOINTS.MASTER_DATA,
          currentUser.uid,
          FIREBASE_ENDPOINTS.USER_ROI,
          data
        );
        toast.success(GENERAL_ADD_SUCCESS);
      }

      setFormData(initialState);
      navigate("/all_return_performance");
    } catch (error) {
      toast.error(GENERAL_SUBMIT_ERROR);
    }
  };

  // Float Button Handler
  const onFloatBtnClickHandler = () => {
    navigate("/all_return_performance");
  };

  return (
    <>
      <div className="flex flex-col gap-9">
        <PageHeading
          title={
            isEditMode ? ROI_PAGE_STRINGS?.editRoi : ROI_PAGE_STRINGS?.addRoi
          }
        />
        <div className="rounded-lg  bg-black-dark-200 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="p-6.5">
              <GlobalInput
                inputType="month"
                placeholder="Date"
                isValue={formData?.created_at}
                name="created_at"
                errors={errors?.created_at}
                onChangeHandler={(name, value) => handleChange(name, value)}
              />
              <GlobalInput
                inputType="text"
                placeholder="Account Name"
                isValue={formData?.accountName}
                name="accountName"
                errors={errors?.accountName}
                onChangeHandler={(name, value) => handleChange(name, value)}
              />
              <GlobalInput
                inputType="number"
                placeholder="Amount Invested"
                isValue={formData?.invested_amount}
                name="invested_amount"
                errors={errors?.invested_amount}
                onChangeHandler={(name, value) => handleChange(name, value)}
              />
              <GlobalInput
                inputType="number"
                placeholder="Amount Returned"
                isValue={formData?.returned_amount}
                name="returned_amount"
                errors={errors?.returned_amount}
                onChangeHandler={(name, value) => handleChange(name, value)}
              />
              <GlobalInput
                inputType="number"
                placeholder="Total Charges"
                isValue={formData?.charges}
                onChangeHandler={(name, value) => handleChange(name, value)}
                name="charges"
                errors={errors?.charges}
                disabledStatus={false}
              />

              <GlobalButton
                btnTitle={isEditMode ? "Update" : "Submit"}
                disabled={false}
                type="submit"
                bgColor="bg-primary-500"
                textColor=""
              />
            </div>
          </form>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={true} />
      <FloatButton
        onClickHandler={onFloatBtnClickHandler}
        icon={<LIST_FLOAT_SVG />}
      />
    </>
  );
}

export default CreateEditReturnPerformance;
