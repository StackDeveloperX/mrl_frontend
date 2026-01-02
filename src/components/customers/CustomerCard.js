"use client";

import { X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { getTokens } from "../../lib/apiClient";
import axios from "axios";
import { CustomerContext } from "../../context/CustomerContext";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CustomerCard = ({ show, setShow, quot, clientData }) => {
  const token = getTokens().access;
  const [mounted, setMounted] = useState(false); // actually mounted in DOM
  const [visible, setVisible] = useState(false); // controls enter/exit animation
  const overlayRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);
  const { listClients } = useContext(CustomerContext);
  const [client, setClient] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    company_name: "",
    contact_person: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postcode: "",
  });

  useEffect(() => {
    if (quot[0] === "Edit Customer" && clientData) {
      setClient({
        first_name: clientData.first_name,
        last_name: clientData.last_name,
        company_name: clientData.company_name,
        contact_person: clientData.contact_person,
        phone: clientData.phone,
        address: clientData.address,
        city: clientData.city,
        state: clientData.state,
        postcode: clientData.postcode,
        notes: clientData.notes,
        is_active: true,
      });

      if (quot[0] === "Add Customer" && !clientData) {
        setClient({
          email: "",
          first_name: "",
          last_name: "",
          password: "",
          company_name: "",
          contact_person: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          postcode: "",
        });
      }
    }
  }, [quot, clientData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClient = async (event) => {
    event.preventDefault();
    try {
      if (quot[0] === "Edit Customer" && clientData) {
        const response = await axios.put(
          `${API_URL}/clients/${clientData.id}`,
          client,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        await listClients();
        // console.log("client updated", response.data);
      } else {
        const response = await axios.post(`${API_URL}/clients`, client, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await listClients();
        //  console.log("client created", response.data);
      }
      setShow(false);
    } catch (error) {
      console.log(error.message);
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
            </div>
          </div>
          <form className="pt-16" onSubmit={handleClient}>
            <div className="mt-4 md:mt-6 lg:mt-2 w-full p-4 md:p-6 lg:p-8">
              <div className="flex flex-row gap-8 mb-4">
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={client.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={client.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              {quot[0] === "Add Customer" && !clientData && (
                <div className="flex flex-row gap-8 mb-4">
                  <div className="flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      name="email"
                      value={client.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      name="password"
                      value={client.password}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-row gap-8 mb-4">
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    name="contact_person"
                    placeholder="Contact Person"
                    value={client.contact_person}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Phone no."
                    value={client.phone}
                    onChange={handleChange}
                    name="phone"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4">
                <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="company_name"
                  value={client.company_name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex flex-row gap-8 mb-4">
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={client.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={client.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-row gap-14 mb-4">
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    State
                  </label>
                  <select
                    name="state"
                    value={client.state}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option defaultValue="">Select State</option>
                    <option value="NSW">New South Wales</option>
                    <option value="SA">South Australia</option>
                    <option value="NT">Northern Territory</option>
                    <option value="QLD">Queensland</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    PostCode
                  </label>
                  <input
                    type="number"
                    placeholder="PostCode"
                    name="postcode"
                    value={client.postcode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {quot[0] === "Edit Customer" && clientData && (
                <div className="flex flex-col mb-4">
                  <label className="block font-semibold text-[#1A2B4C] mb-2 text-sm sm:text-base">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    rows="3"
                    value={client.notes ?? ""}
                    onChange={handleChange}
                    className=" border  text-sm rounded-lg  w-full p-3.5 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Notes"
                  ></textarea>
                </div>
              )}

              <div className="flex flex-row justify-center gap-8">
                <button
                  onClick={() => setShow(false)}
                  className="order-1 sm:order-2 px-6 py-3 sm:py-2 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="order-1 sm:order-2 px-6 py-3 sm:py-2 bg-[#1A2B4C] text-white rounded-lg hover:bg-[#15243d] transition-colors text-sm sm:text-base cursor-pointer"
                >
                  {quot}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustomerCard;
