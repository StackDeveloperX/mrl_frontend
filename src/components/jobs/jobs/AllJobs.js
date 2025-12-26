"use client";

import { useContext, useEffect, useState } from "react";
import { getTokens } from "../../../lib/apiClient";
import axios from "axios";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import QuotesCard from "../quotes/QuotesCard";
import JobsCard from "./JobsCard";
import { JobsContext } from "../../../context/JobsContext";

const AllJobs = () => {
  const { jobs, fetchJobs,loading,error } = useContext(JobsContext);
  const token = getTokens().access;
  const [showCard, setShowCard] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState(null);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await axios.delete(
        `http://abc.mrl.local/api/v1/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      );
      console.log("Job deleted successfully", response.data);
      await fetchJobs();
    } catch (error) {
      console.log("Delete error", error.message);
    }
  };
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-xl  mt-4">
      {showCard && (
        <JobsCard
          setShow={setShowCard}
          show={showCard}
          quot={["Edit Jobs"]}
          isEdit={isEdit}
          selectedJobs={selectedJobs}
          className="transition-discrete"
        />
      )}
      <table className="w-full text-sm text-left rtl:text-right text-body">
        <thead className="text-sm bg-gray-200 border-default-medium">
          <tr>
            <th className="px-4 py-3 w-10">
              <input type="checkbox" disabled className="cursor-not-allowed" />
            </th>

            <th className="px-6 py-3 font-medium">Job ID</th>
            <th className="px-6 py-3 font-medium">Client Name</th>
            <th className="px-6 py-3 font-medium">Description</th>
            <th className="px-6 py-3 font-medium">Scheduled Start</th>
            <th className="px-6 py-3 font-medium">Scheduled End</th>
            <th className="px-6 py-3 font-medium">Service Address</th>
            <th className="px-6 py-3 font-medium">Priority</th>
            <th className="px-6 py-3 font-medium">Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
              <td colSpan={6} className="px-6 py-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-neutral-700">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          ) : error ? (
            <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
              <td
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
                colSpan="6"
              >
                Error: {error}
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => {
              return (
                <tr
                  className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium"
                  key={job.id}
                >
                  <td className="px-4 py-4"></td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {job.id}
                  </td>
                  <td className="px-6 py-4">
                    {job.client_first_name ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">{job.description}</td>
                  <td className="px-6 py-4">{job.scheduled_start}</td>
                  <td className="px-6 py-4">{job.scheduled_end ?? "N/A"}</td>
                  <td className="px-6 py-4">{job.service_address ?? "N/A"}</td>
                  <td className="px-6 py-4">{job.priority}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center">
                      <Pencil
                        className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
                        onClick={() => {
                          setShowCard(true);
                          setIsEdit(true);
                          setSelectedJobs(job);
                        }}
                      />
                      <Trash2
                        onClick={() => {
                          setPopupOpen(true);
                        }}
                        className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer ml-2"
                      />
                      {popupOpen && (
                        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
                          <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                              Confirm Deletion
                            </h2>
                            <p className="mb-4">
                              Are you sure you want to delete this job?
                            </p>
                            <div className="flex justify-end gap-4">
                              <button
                                onClick={() => setPopupOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  handleDeleteJob(job.id);
                                  setPopupOpen(false);
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                {" "}
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobs;
