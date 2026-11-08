"use client";

import React from "react";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption {

  label: string;
  value: string;
}

interface DropdownProps {

  options: DropdownOption[];
  value: string;

  onChange: (value: string) => void;

  className?: string;
}

export const Dropdown = ({ options, value, onChange, className = "", }: DropdownProps) => {
  
const [isOpen, setIsOpen] = useState(false);

const dropdownRef = useRef<HTMLDivElement>(null);

const selectedOption = options.find((opt) => opt.value === value) || options[0];


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => { document.removeEventListener("mousedown", handleClickOutside); };

  }, []);

return (

  <div ref={dropdownRef} className={`relative inline-block text-left rtl:text-right ${className}`} >


    <button
      type="button"

      onClick={() => setIsOpen((prev) => !prev)}

      aria-expanded={isOpen}
      aria-haspopup="listbox"
      className="inline-flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm font-normal !bg-transparent !text-white transition-opacity hover:opacity-80 focus:outline-none"
    >

        <span>{selectedOption?.label}</span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 !text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : "" }`}
        />

    </button>


    {isOpen && (

      <div role="listbox" className="absolute z-[100] mt-3 w-36 overflow-hidden rounded border border-gray-200 !bg-white py-1 text-gray-900 shadow-lg ltr:right-0 rtl:left-0" >

        {options.map((option) => {

          const isSelected = option.value === value;

          return (

            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={isSelected}

              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}

              className={`block w-full cursor-pointer px-4 py-[9px] text-start text-sm !text-gray-900 transition-colors ${
                isSelected
                  ? "!bg-gray-100 font-semibold"
                  : "!bg-white hover:!bg-gray-100"
              }`}
            >
              {option.label}
            </button>

          );

        })}

      </div>
    )}


  </div>

);

};



