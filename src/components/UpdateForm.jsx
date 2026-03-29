import React from "react";
import { useState } from "react";
import { db, serverTimestamp } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";

function UpdateForm() {
  const [heading, setHeading] = useState("");
  const [feedbackType, setFeedbackType] = useState("positive");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "update_info"), {
        heading: heading,
        icon: feedbackType,
        createdAt: serverTimestamp(),
      });
      alert("Updates submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    // Clear form
    setHeading("");
    setFeedbackType("positive");
  };

  return (
    <div className="flex flex-col gap-9 p-10">
      <div className="rounded-lg bg-black-dark-200 shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <label
              class="mb-3 block text-lg font-semibold text-whiten"
              htmlFor="heading"
            >
              Heading:
            </label>
            <textarea
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              required
              rows="4"
              cols="50"
              className="w-full rounded border-[1.5px] border-black-dark-300 bg-transparent px-5 py-3 font-normal text-whiten outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            />
          </div>
          <div className="p-6.5">
            <label
              class="mb-3 block text-lg font-semibold text-whiten"
              htmlFor="feedbackType"
            >
              News Type:
            </label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              required
            >
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
            </select>
          </div>
          <button
            type="submit"
            className={`flex w-full justify-center rounded  p-3 font-semibold text-black-dark-300 hover:bg-opacity-90 focus:ring-2 focus:ring-primary-500 bg-primary-300`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateForm;
