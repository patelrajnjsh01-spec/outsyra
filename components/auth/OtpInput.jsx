"use client";
import React, { useRef, useEffect } from "react";

export function OtpInput({ length = 6, value = "", onChange, disabled = false, autoFocus = true }) {
    const inputRefs = useRef([]);

    useEffect(() => {
        if (autoFocus && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [autoFocus]);

    const digits = value.split("").slice(0, length);
    while (digits.length < length) {
        digits.push("");
    }

    const handleChange = (index, e) => {
        const val = e.target.value;
        const lastChar = val.slice(-1);

        if (lastChar && !/^\d$/.test(lastChar)) return;

        const newDigits = [...digits];
        newDigits[index] = lastChar || "";
        const newValue = newDigits.join("");
        onChange(newValue);

        if (lastChar && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace") {
            if (!digits[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text/plain").trim();
        const numericOnly = pastedData.replace(/\D/g, "").slice(0, length);
        if (numericOnly) {
            onChange(numericOnly);
            const focusIndex = Math.min(numericOnly.length, length - 1);
            inputRefs.current[focusIndex]?.focus();
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {digits.map((digit, idx) => (
                <input
                    key={idx}
                    ref={(el) => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    disabled={disabled}
                    onChange={(e) => handleChange(idx, e)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="h-12 w-11 sm:h-14 sm:w-12 text-center text-xl font-bold font-mono rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-inner disabled:opacity-50"
                />
            ))}
        </div>
    );
}
