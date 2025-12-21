"use client";

import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import axios from "axios";
import { getTokens } from "../../lib/apiClient";
export default function QuotesCard({ show, setShow, quotes }) {
  const [mounted, setMounted] = useState(false); // actually mounted in DOM
  const [visible, setVisible] = useState(false); // controls enter/exit animation
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

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

  const token = getTokens().access;
  const handleCreateQuote = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://abc.mrl.local/api/v1/quotes",
        {
          client_id: 1,
          branch_id: 1,
          service_package_id: 1,
          title: "House Relocation Quote",
          description: "2-bedroom apartment move within Sydney",
          service_type: "general",
          service_data: {
            pickup_unit: "Unit 5",
            pickup_street_address: "George Street",
            pickup_suburb: "Sydney",
            pickup_state: "NSW",
            pickup_postal_code: "2000",
            pickup_instructions: "Please call 15 minutes before arrival",
            dropoff_unit: "Apartment 18",
            dropoff_street_address: "Oxford Street",
            dropoff_suburb: "Bondi Junction",
            dropoff_state: "NSW",
            dropoff_postal_code: "2022",
          },
          assigned_to: 1,
          tax_rate: 10,
          discount_amount: 0,
          valid_until: "2025-12-31",
          internal_notes: "Handle fragile items carefully",
          client_notes: "Customer prefers morning pickup",
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Quote created:", response.data);
      setShow(false);
    } catch (err) {
      console.error(
        "Error creating quote:",
        err.response?.data?.message || err.message
      );
    }
  };

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
          <div className="bg-[#ddffff] p-6 shadow-xm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 ">
              <div className="w-full lg:w-1/2 ">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-bold">
                  {quotes}
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

          <div className="flex flex-col lg:flex-row mt-6 lg:mt-10 gap-6 p-8">
            {/* LEFT column */}
            <div className="w-full lg:w-[40%]">
              <div className="bg-[#F1F5FB] rounded-2xl overflow-hidden pb-5">
                <div className="bg-[#17466933] px-4 sm:px-6 lg:px-10 py-4 lg:py-5 rounded-t-2xl">
                  <h2 className="text-[#1A2B4C] text-xl sm:text-2xl font-bold">
                    Customer Details
                  </h2>
                </div>

                <div className="px-4 sm:px-6 lg:px-10 py-4 lg:py-6 space-y-4 lg:space-y-6">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="search-customer"
                      placeholder="Search Customer"
                      className="w-full px-3 py-2 pr-10 text-sm border border-[#D9D9D9] rounded-lg focus:outline-none focus:border-gray-400"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                  </div>

                  <div>
                    <label className="block text-[#1A2B4C] font-semibold mb-2 text-sm lg:text-base">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A2B4C] font-semibold mb-2 text-sm lg:text-base">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="Phone No"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#1A2B4C] font-semibold mb-2 text-sm lg:text-base">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Email ID"
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT column */}
            <div className="w-full lg:w-[60%]">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-6">
                <span className="font-semibold text-[#1A2B4C] text-sm sm:text-base">
                  Time Slot
                </span>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="slot" defaultChecked />
                    <span className="text-sm sm:text-base">Morning</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="slot" />
                    <span className="text-sm sm:text-base">Afternoon</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="slot" />
                    <span className="text-sm sm:text-base">Flexible</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Pick up Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Drop off Date
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div>
                  <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                    Pick up Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Street
                      </label>
                      <input
                        type="text"
                        placeholder="Street"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Suburb
                      </label>
                      <input
                        type="text"
                        placeholder="Suburb"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        State
                      </label>
                      <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                        <option defaultValue="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="SA">South Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Postcode
                      </label>
                      <input
                        type="text"
                        placeholder="Postcode"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                    Drop off Address
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Street
                      </label>
                      <input
                        type="text"
                        placeholder="Street"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Suburb
                      </label>
                      <input
                        type="text"
                        placeholder="Suburb"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        State
                      </label>
                      <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                        <option defaultValue="">Select State</option>
                        <option value="NSW">New South Wales</option>
                        <option value="SA">South Australia</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-1 text-md text-slate-700">
                        Postcode
                      </label>
                      <input
                        type="text"
                        placeholder="Postcode"
                        className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Notes
                  </label>
                  <textarea
                    placeholder="Add Notes or reminder"
                    className="w-full h-32 sm:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Special Instructions
                  </label>
                  <textarea
                    placeholder="Add any special handling notes"
                    className="w-full h-32 sm:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <p className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                  Preferred Contact Method
                </p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="contact" defaultChecked />
                    <span className="text-sm sm:text-base">SMS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="contact" />
                    <span className="text-sm sm:text-base">Email</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="contact" />
                    <span className="text-sm sm:text-base">Call</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 lg:mt-10">
                <button className="order-2 sm:order-1 border border-gray-400 rounded-lg px-6 py-3 sm:py-2 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base text-slate-800 font-semibold">
                  Save as Draft
                </button>
                <button
                  onClick={handleCreateQuote}
                  className="order-1 sm:order-2 px-6 py-3 sm:py-2 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base"
                >
                  Submit Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
