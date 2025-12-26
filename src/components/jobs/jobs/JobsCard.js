"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import axios from "axios";
import { getTokens } from "../../../lib/apiClient";
import { JobsContext } from "../../../context/JobsContext";
export default function JobsCard({
  show,
  setShow,
  quot,
  selectedJobs,
  isEdit,
}) {
  const { fetchJobs } = useContext(JobsContext);
  const [mounted, setMounted] = useState(false); // actually mounted in DOM
  const [visible, setVisible] = useState(false); // controls enter/exit animation
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const token = getTokens().access;

  const [jobs, setJobs] = useState({
    quote_id: 1,
    client_id: 1,
    branch_id: 1,
    service_package_id: 1,
    title: "",
    description: "",
    priority: "low",
    scheduled_start: "",
    scheduled_end: "",
    stage: "",
    estimated_hours: 1,
    estimated_cost: 1,
    service_address: "",
    service_location_lat: 1,
    service_location_lng: 1,
    assigned_to: 1,
  });

  useEffect(() => {
    if (isEdit && selectedJobs) {
      setJobs({
        title: selectedJobs.title,
        description: selectedJobs.description,
        stage: "scheduled",
        priority: "low",
        scheduled_start: selectedJobs.scheduled_start,
        scheduled_end: selectedJobs.scheduled_end,
        actual_start: "",
        actual_end: "",
        estimated_hours: 1,
        estimated_cost: 1,
        actual_hours: 1,
        actual_cost: 1,
        service_address: selectedJobs.service_address,
        service_location_lat: 1,
        service_location_lng: 1,
        completion_notes: "",
        completion_photos: [""],
        assigned_to: 1,
      });
    }

    if (!isEdit) {
      // reset form for CREATE
      setJobs({
        quote_id: 1,
        client_id: 1,
        branch_id: 1,
        service_package_id: 1,
        title: "",
        description: "",
        priority: "low",
        scheduled_start: "",
        scheduled_end: "",
        stage: "",
        estimated_hours: 1,
        estimated_cost: 1,
        service_address: "",
        service_location_lat: 1,
        service_location_lng: 1,
        assigned_to: 1,
      });
    }
  }, [isEdit, selectedJobs]);

  console.log("jobs", jobs);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateJobs = async (e) => {
    e.preventDefault();
    if (!jobs.stage) {
      alert("Please select stage");
      return;
    }

    try {
      if (isEdit) {
        await axios.put(
          `http://abc.mrl.local/api/v1/jobs/${selectedJobs.id}`,
          jobs,
          {
            headers: {
              Authorization: `Bearer ${token} `,
            },
          }
        );
        await fetchJobs();
        alert("job updated");
      } else {
        await axios.post("http://abc.mrl.local/api/v1/jobs", jobs, {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        });
        await fetchJobs();
        alert("job created");
      }

      setShow(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (show) {
      previouslyFocused.current = document.activeElement;
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => focusFirst(), 50);
      document.body.style.overflow = "hidden";
    } else if (mounted) {
      setVisible(false);
      document.body.style.overflow = "";
      const t = setTimeout(() => {
        setMounted(false);
        if (previouslyFocused.current?.focus) previouslyFocused.current.focus();
      }, 300);
      return () => clearTimeout(t);
    }
  }, [show]);
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setShow(false);
      } else if (e.key === "Tab") {
        maintainFocus(e);
      }
    }
    if (mounted) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted]);

  if (!mounted) return null;

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) setShow(false);
  }
  function focusableElements() {
    if (!dialogRef.current) return [];
    return Array.from(
      dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("disabled"));
  }

  function focusFirst() {
    const list = focusableElements();
    if (list.length) list[0].focus();
    else dialogRef.current?.focus();
  }

  function maintainFocus(e) {
    const list = focusableElements();
    if (!list.length) {
      e.preventDefault();
      dialogRef.current?.focus();
      return;
    }
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      ref={overlayRef}
      id="quotes-card-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onMouseDown={onOverlayClick}
      aria-hidden={!visible}
    >
      {/* dim background */}
      <div className="absolute inset-0  backdrop" />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-hidden={!visible}
        aria-label="Create Quotes"
        tabIndex={-1}
        className={`relative z-50 rounded-2xl bg-gray-50 shadow-xl
          ${visible && "animate-slide-up"}
          ${!visible && mounted && "animate-slide-down"}
        `}
        style={{ maxHeight: "92vh", overflow: "auto" }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className=" ">
          <div className="bg-[#ddffff] p-6 shadow-xm fixed w-full ">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 ">
              <div className="w-full lg:w-1/2 ">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-bold">
                  {quot}
                </h2>
              </div>

              <button
                aria-label="Close create quotes"
                className="font-bold cursor-pointer text-slate-600 hover:text-slate-800  text-xl sm:text-2xl transition-transform"
                onClick={() => setShow(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <form onSubmit={handleCreateJobs} className="pt-16">
            <div className="mt-4 md:mt-6 lg:mt-2 w-full p-4 md:p-6 lg:p-8">
              <div className="w-full">
                <div className="flex flex-col lg:flex-col gap-4 md:gap-6 lg:gap-6 mb-6 md:mb-6">
                  <div className="flex-1 flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter title"
                      name="title"
                      required
                      value={jobs.title}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      required
                      value={jobs.description}
                      onChange={handleChange}
                      placeholder="Enter description"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm   focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-10 mb-6 md:mb-8">
                  <div className="flex-1 flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Schedule Start
                    </label>
                    <input
                      type="date"
                      name="scheduled_start"
                      required
                      value={jobs.scheduled_start}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Schedule End
                    </label>
                    <input
                      type="date"
                      name="scheduled_end"
                      required
                      value={jobs.scheduled_end}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="mb-6 ">
                  <div>
                    <div className="flex flex-col">
                      <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                        Stage <span className="text-red-400">*</span>
                      </label>
                      <select
                        name="stage"
                        value={jobs.stage}
                        onChange={handleChange}
                        className={`border  rounded-lg px-4 py-2 text-sm border-gray-300`}
                      >
                        <option defaultValue="">Select Stage</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="ready">Ready</option>
                        <option value="in_progress">In Progress</option>
                        <option value="on_hold">On Hold</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="invoiced">Invoiced</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Service Address
                    </label>
                    <textarea
                      name="service_address"
                      id="service_address"
                      required
                      value={jobs.service_address}
                      onChange={handleChange}
                      placeholder="Enter service address"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm min-h-[100px] resize-y focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-6 mt-4 md:mt-6">
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="w-full sm:w-auto order-2 sm:order-1 border border-gray-400 rounded-lg px-4 sm:px-6 py-3 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base text-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                  {quot[0] === "Add Jobs" ? (
                    <button
                      type="submit"
                      className="w-full sm:w-auto order-1 sm:order-2 px-4 sm:px-6 py-3 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base font-semibold cursor-pointer"
                    >
                      Submit Job
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full sm:w-auto order-1 sm:order-2 px-4 sm:px-6 py-3 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base font-semibold cursor-pointer"
                    >
                      Edit Job
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
