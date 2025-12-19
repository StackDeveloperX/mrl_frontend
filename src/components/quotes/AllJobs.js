"use client";

import { useEffect, useState } from "react";
import { getTokens } from "../../lib/apiClient";
import axios from "axios";

const AllJobs = () => {
  const token = getTokens().access;
  const [showCard, setShowCard] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoadind] = useState(false);
  const [error, setError] = useState(null);

  const fetchJObs = async () => {
    setError(null);
    setLoadind(true);
    try {
      const response = await axios.get("http://abc.mrl.local/api/v1/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("jobs", response.data.data);
      setJobs(response.data.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoadind(false);
    }
  };

  useEffect(() => {
    fetchJObs();
  }, []);
  return (
    <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-xl  mt-4">
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
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr className="bg-neutral-primary-soft hover:bg-neutral-secondary-medium">
              <td
                className="px-6 py-4 font-medium whitespace-nowrap text-center"
                colSpan="6"
              >
                Loading...
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
                  key={index}
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
