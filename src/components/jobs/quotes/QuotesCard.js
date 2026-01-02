"use client";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { getTokens } from "../../../lib/apiClient";
import { QuotesContext } from "../../../context/QuotesContext";
import { CustomerContext } from "../../../context/CustomerContext";
import { X } from "lucide-react";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export default function QuotesCard({
  show,
  setShow,
  quot,
  selectedQuote,
  isEdit,
}) {
  const token = getTokens().access;
  const { fetchQuotes } = useContext(QuotesContext);
  const { client } = useContext(CustomerContext);
  const [mounted, setMounted] = useState(false); // actually mounted in DOM
  const [visible, setVisible] = useState(false); // controls enter/exit animation
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const [customer, setCustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [filterCustomer, setFilterCustomer] = useState([]);
  const [quotes, setQuotes] = useState({
    client_id: Number(selectedCustomer?.id),
    branch_id: 1,
    service_package_id: 1,
    title: "",
    description: "",
    service_type: "",
    service_data: {
      pickup_unit: "",
      pickup_street_address: "",
      pickup_suburb: "",
      pickup_state: "",
      pickup_postal_code: "",
      pickup_instructions: "",
      dropoff_unit: "",
      dropoff_street_address: "",
      dropoff_suburb: "",
      dropoff_state: "",
      dropoff_postal_code: "",
    },
    assigned_to: 1,
    tax_rate: 10,
    discount_amount: 0,
    valid_until: "",
    internal_notes: "",
    client_notes: "",
  });

  useEffect(() => {
    if (isEdit && selectedQuote) {
      setQuotes({
        title: selectedQuote.title,
        description: selectedQuote.description,
        service_type: selectedQuote.service_type,
        service_data: {
          pickup_unit: selectedQuote.service_data.pickup_unit,
          pickup_street_address:
            selectedQuote.service_data.pickup_street_address,
          pickup_suburb: selectedQuote.service_data.pickup_suburb,
          pickup_state: selectedQuote.service_data.pickup_state,
          pickup_postal_code: selectedQuote.service_data.pickup_postal_code,
          pickup_instructions: selectedQuote.service_data.pickup_instructions,
          dropoff_unit: selectedQuote.service_data.dropoff_unit,
          dropoff_street_address:
            selectedQuote.service_data.dropoff_street_address,
          dropoff_suburb: selectedQuote.service_data.dropoff_suburb,
          dropoff_state: selectedQuote.service_data.dropoff_state,
          dropoff_postal_code: selectedQuote.service_data.dropoff_postal_code,
        },
        assigned_to: 1,
        tax_rate: 10,
        discount_amount: 0,
        valid_until: selectedQuote.valid_until,
        internal_notes: selectedQuote.internal_notes,
        client_notes: selectedQuote.client_notes,
      });
    }

    if (!isEdit) {
      setQuotes({
        client_id: Number(selectedCustomer?.id),
        branch_id: 1,
        service_package_id: 1,
        title: "",
        description: "",
        service_type: "",
        service_data: {
          pickup_unit: "",
          pickup_street_address: "",
          pickup_suburb: "",
          pickup_state: "",
          pickup_postal_code: "",
          pickup_instructions: "",
          dropoff_unit: "",
          dropoff_street_address: "",
          dropoff_suburb: "",
          dropoff_state: "",
          dropoff_postal_code: "",
        },
        assigned_to: 1,
        tax_rate: 10,
        discount_amount: 0,
        valid_until: "",
        internal_notes: "",
        client_notes: "",
      });
    }
  }, [isEdit, selectedQuote]);

  useEffect(() => {
    const filteredClient = client.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
      return fullName.includes(customer.toLowerCase());
    });

    setFilterCustomer(filteredClient);
  }, [client, customer]);

  useEffect(() => {
    if (selectedCustomer?.id) {
      setQuotes((prev) => ({
        ...prev,
        client_id: Number(selectedCustomer.id),
        // assigned_to: Number(selectedCustomer.id),
        // service_package_id: Number(selectedCustomer.id),
      }));
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in quotes.service_data) {
      setQuotes((prev) => ({
        ...prev,
        service_data: {
          ...prev.service_data,
          [name]: value,
        },
      }));
    } else {
      setQuotes((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreateQuote = async (e) => {
    e.preventDefault();
    if (
      !quotes.service_data.pickup_state ||
      !quotes.service_data.dropoff_state
    ) {
      alert("Please select a state");
      return;
    }
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/quotes/${selectedQuote.id}`, quotes, {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        });
        fetchQuotes();
        alert("Quote updated");
      } else {
        await axios.post(`${API_URL}/quotes`, quotes, {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        });
        fetchQuotes();
        alert("Quote created");
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
        <div className=" w-full ">
          <div className="bg-[#ddffff] p-6 shadow-xm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0 ">
              <div className="w-full lg:w-1/2 ">
                <h2 className="text-slate-800 text-xl sm:text-2xl font-bold">
                  {quot}
                </h2>
              </div>
              <X onClick={() => setShow(false)} className="cursor-pointer" />
            </div>
          </div>

          <form onSubmit={handleCreateQuote}>
            <div className="mt-6 lg:mt-10 w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6">
              {/* LEFT COLUMN - Customer Details */}
              <div className="flex flex-col gap-6 bg-blue-50 p-4 sm:p-6 rounded-xl lg:w-1/3 xl:w-96 h-160">
                <h2 className="font-bold bg-[#17466933] text-2xl text-[#1A2B4C] p-4 rounded-xl  ">
                  Customer Details
                </h2>

                <div className="flex flex-col relative w-full">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Search Client
                  </label>
                  <input
                    type="text"
                    placeholder="Search Client"
                    value={customer}
                    onChange={(event) => setCustomer(event.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1"
                  />
                  {customer.trim() && (
                    <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-50">
                      {filterCustomer.length > 0
                        ? filterCustomer.map((item) => (
                            <li
                              key={item._id}
                              className="px-4 py-2 text-sm cursor-pointer hover:bg-emerald-100"
                              onClick={() => {
                                setSelectedCustomer(item);
                                setCustomer(
                                  `${item.first_name} ${item.last_name}`
                                );
                                setFilterCustomer((prev) =>
                                  prev.filter((c) => c.id !== item.id)
                                );
                              }}
                            >
                              {item.first_name} {item.last_name} {item.id}
                            </li>
                          ))
                        : ""}
                    </ul>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Client ID
                  </label>
                  <input
                    type="text"
                    placeholder="Client ID"
                    name="client_id"
                    value={customer ? selectedCustomer?.id || "" : ""}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    name="title"
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN - Form Fields */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Title"
                      name="title"
                      required
                      value={quotes.title}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Service Type
                    </label>
                    <input
                      type="text"
                      name="service_type"
                      required
                      placeholder="Service Type"
                      value={quotes.service_type}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                    />
                  </div>

                  <div className="flex flex-col md:col-span-2 lg:col-span-1">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Description
                    </label>
                    <input
                      name="description"
                      id="description"
                      required
                      value={quotes.description}
                      onChange={handleChange}
                      placeholder="Description"
                      className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6">
                  {/* Pick up Address */}
                  <div>
                    <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                      Pick up Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Street
                        </label>
                        <input
                          type="text"
                          name="pickup_street_address"
                          required
                          value={quotes.service_data.pickup_street_address}
                          onChange={handleChange}
                          placeholder="Street"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Suburb
                        </label>
                        <input
                          type="text"
                          name="pickup_suburb"
                          required
                          value={quotes.service_data.pickup_suburb}
                          onChange={handleChange}
                          placeholder="Suburb"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          State
                        </label>
                        <select
                          name="pickup_state"
                          value={quotes.service_data.pickup_state}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        >
                          <option value="">Select State</option>
                          <option value="NSW">New South Wales</option>
                          <option value="SA">South Australia</option>
                          <option value="NT">Northern Territory</option>
                          <option value="QLD">Queensland</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Postcode
                        </label>
                        <input
                          type="text"
                          name="pickup_postal_code"
                          required
                          value={quotes.service_data.pickup_postal_code}
                          onChange={handleChange}
                          placeholder="Postcode"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Pickup unit
                        </label>
                        <input
                          type="text"
                          name="pickup_unit"
                          required
                          value={quotes.service_data.pickup_unit}
                          onChange={handleChange}
                          placeholder="Pickup Unit"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Pickup Instructions
                        </label>
                        <input
                          placeholder="Pickup Instructions"
                          name="pickup_instructions"
                          required
                          value={quotes.service_data.pickup_instructions}
                          onChange={handleChange}
                          id="pickup_instructions"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Drop off Address */}
                  <div>
                    <h3 className="font-semibold text-[#1A2B4C] mb-3 text-sm sm:text-base">
                      Drop off Address
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Street
                        </label>
                        <input
                          type="text"
                          name="dropoff_street_address"
                          required
                          value={quotes.service_data.dropoff_street_address}
                          onChange={handleChange}
                          placeholder="Street"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Suburb
                        </label>
                        <input
                          type="text"
                          name="dropoff_suburb"
                          required
                          value={quotes.service_data.dropoff_suburb}
                          onChange={handleChange}
                          placeholder="Suburb"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          State
                        </label>
                        <select
                          name="dropoff_state"
                          required
                          value={quotes.service_data.dropoff_state}
                          onChange={handleChange}
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        >
                          <option value="">Select State</option>
                          <option value="NSW">New South Wales</option>
                          <option value="SA">South Australia</option>
                          <option value="NT">Northern Territory</option>
                          <option value="QLD">Queensland</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Postcode
                        </label>
                        <input
                          type="text"
                          name="dropoff_postal_code"
                          required
                          value={quotes.service_data.dropoff_postal_code}
                          onChange={handleChange}
                          placeholder="Postcode"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                      <div className="flex flex-col">
                        <label className="mb-1 text-sm sm:text-md text-slate-700">
                          Drop off unit
                        </label>
                        <input
                          type="text"
                          name="dropoff_unit"
                          required
                          value={quotes.service_data.dropoff_unit}
                          onChange={handleChange}
                          placeholder="Drop off Unit"
                          className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">
                  <div>
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Internal Notes
                    </label>
                    <textarea
                      name="internal_notes"
                      id="internal_notes"
                      required
                      value={quotes.internal_notes}
                      onChange={handleChange}
                      placeholder="Internal Notes"
                      className="w-full h-32 sm:h-28 lg:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Client Notes
                    </label>
                    <textarea
                      name="client_notes"
                      id="client_notes"
                      required
                      value={quotes.client_notes}
                      onChange={handleChange}
                      placeholder="Add any special handling notes"
                      className="w-full h-32 sm:h-28 lg:h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm resize-y"
                    />
                  </div>
                </div>
                <div className="mt-6 max-w-xs">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    name="valid_until"
                    required
                    value={quotes.valid_until}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8 lg:mt-10">
                  <button
                    type="button"
                    onClick={() => setShow(false)}
                    className="border border-gray-400 rounded-lg px-6 py-3 sm:py-2 bg-white hover:bg-gray-50 transition-colors text-sm sm:text-base text-slate-800 font-semibold w-full sm:w-auto cursor-pointer"
                  >
                    Cancel
                  </button>

                  {quot[0] === "Add Quotes" ? (
                    <button
                      type="submit"
                      className="w-full sm:w-auto order-1 sm:order-2 px-4 sm:px-6 py-3 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base font-semibold cursor-pointer"
                    >
                      Submit Quote
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full sm:w-auto order-1 sm:order-2 px-4 sm:px-6 py-3 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base font-semibold cursor-pointer"
                    >
                      Edit Quote
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
