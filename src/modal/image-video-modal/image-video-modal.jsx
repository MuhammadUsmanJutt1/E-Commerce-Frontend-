"use client";

import React, { useEffect } from "react";
import classNames from "classnames";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

const ImageVideoModal = ({ config, ...props }) => {
    const { type, src, title, description, isVisible } = { ...config };

    // 🔒 Lock scroll when modal is open
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className={classNames(
                props.className,
                "fixed inset-0 z-[1000] flex justify-center px-4 lg:p-0 items-center backdrop-blur-sm bg-black/40"
            )}
        >
            {/* Background fade-in animation */}
            <div
                className="absolute inset-0 bg-black/40 animate-fadeIn"
                onClick={props.onClose}
            />

            {/* Modal container with scale + fade animation */}
            <div
                className={classNames(
                    "relative z-[1001] p-[8px] lg:p-[12px] w-full lg:w-[870px] flex flex-col gap-[18px] lg:gap-[24px] bg-white rounded-[20px] shadow-lg transform transition-all duration-300 animate-zoomIn"
                )}
            >
                <button
                    onClick={props.onClose}
                    className="absolute cursor-pointer z-[100] bg-white top-[12px] right-[12px] lg:top-[16px] lg:right-[16px] w-[32px] h-[32px] lg:w-[40px] lg:h-[40px] flex justify-center items-center rounded-full bg-secondary-body-200 hover:bg-secondary-body-300"
                >
                    <RxCross2 />
                </button>

                {type === "image" && (
                    <Image
                        src={src}
                        alt={title || "Modal Image"}
                        width={870}
                        height={490}
                        className="w-full h-auto lg:h-[497px] rounded-[12px] object-cover"
                    />
                )}
                {type === "video" && (
                    <div className="w-full   lg:h-[497px] aspect-video relative">
                        <video
                            src={src}
                            controls
                            autoPlay
                            className="w-full h-full rounded-[12px] object-cover"
                        />
                    </div>
                )}

                {(title || description) && (
                    <div className="flex flex-col px-[18px] lg:px-[24px] gap-[8px] lg:gap-[12px]">
                        {title && (
                            <h2 className="text-[16px] lg:text-[20px] font-semibold text-black">
                                {title}
                            </h2>
                        )}
                        {description && (
                            <p className="text-[14px] lg:text-[16px] text-secondary-body-500">
                                {description}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageVideoModal;
