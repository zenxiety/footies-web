import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { useRouter } from "next/router";

const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setIsNavbarVisible(isScrollingUp || currentScrollPos === 0);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);
  const router = useRouter();
  return (
    <div
      className={`fixed z-50 h-fit w-full max-w-[500px] rounded-t-md bg-[#141313] duration-500 ${
        isNavbarVisible ? "bottom-0" : "-bottom-[200px]"
      }`}
    >
      <div className="bottom-0 z-0 h-[10%] rounded-t-md border-t-2 border-t-primary-300 bg-secondary-400">
        <div className="flex scale-[150%] flex-row items-center justify-around px-20 py-4">
          {/* {data.map((item) => (
            <>
              <div
                key={item.id}
                className={
                  item.id == 2
                    ? `${item.logo} pr-[25%] text-4xl text-white hover:text-primary-300 hover:underline`
                    : item.id !== 3
                    ? `${item.logo} text-4xl text-white hover:text-primary-300 hover:underline`
                    : `${item.logo} absolute left-[50%] -top-[40%] translate-x-[-50%] rounded-full border-2 border-primary-300 bg-gray-700  p-4 text-5xl text-white hover:text-primary-300 hover:underline`
                }
              />
              
            </>
          ))} */}
          {/* <button className="fas fa-house text-4xl text-white hover:text-primary-300" onClick={() => router.push("/homepage")}/>
          <button className="fas fa-badge-percent pr-[25%] text-4xl text-white hover:text-primary-300 hover:underline" onClick={() => router.push("/")}/>
          <button className="fas fa-search absolute left-[50%] -top-[40%] translate-x-[-50%] rounded-full border-2 border-primary-300 bg-gray-700  p-4 text-5xl text-white hover:text-primary-300" onClick={() => router.push("/search")}/>
          <button className="fas fa-receipt text-4xl text-white hover:text-primary-300 hover:underline" onClick={() => router.push("/homepage")}/>
          <button className="fas fa-user text-4xl text-white hover:text-primary-300 hover:underline" onClick={() => router.push("/dashboard")}/> */}
          <svg
            width="26"
            height="27"
            viewBox="0 0 26 27"
            fill="#EFEFEF"
            xmlns="http://www.w3.org/2000/svg"
            className="hover:cursor-pointer hover:fill-primary-300"
            onClick={() => router.push("/homepage")}
          >
            <path
              d="M23 26.5002H17C16.338 26.4969 15.704 26.2325 15.2359 25.7643C14.7677 25.2962 14.5033 24.6622 14.5 24.0002V18.5002H11.5V24.0002C11.4967 24.6622 11.2323 25.2962 10.7641 25.7643C10.296 26.2325 9.66203 26.4969 9 26.5002H3C2.33797 26.4969 1.70399 26.2325 1.23586 25.7643C0.767733 25.2962 0.503286 24.6622 0.5 24.0002V12.4377C0.500825 12.0888 0.574653 11.744 0.716738 11.4254C0.858823 11.1068 1.06602 10.8214 1.325 10.5877L11.3125 1.50018C11.7734 1.07856 12.3754 0.844727 13 0.844727C13.6246 0.844727 14.2266 1.07856 14.6875 1.50018L24.6875 10.5877C24.9424 10.824 25.1461 11.1101 25.2858 11.4283C25.4256 11.7466 25.4985 12.0901 25.5 12.4377V24.0002C25.4967 24.6622 25.2323 25.2962 24.7641 25.7643C24.296 26.2325 23.662 26.4969 23 26.5002ZM17.5 23.5002H22.5V12.6627L13 4.02518L3.5 12.6627V23.5002H8.5V18.0002C8.50329 17.3382 8.76773 16.7042 9.23586 16.236C9.70399 15.7679 10.338 15.5035 11 15.5002H15C15.662 15.5035 16.296 15.7679 16.7641 16.236C17.2323 16.7042 17.4967 17.3382 17.5 18.0002V23.5002Z"
              // fill="#EFEFEF"
            />
          </svg>

          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#EFEFEF"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-20 hover:cursor-pointer hover:stroke-primary-300"
            onClick={() => router.push("/")}
          >
            <path
              d="M12.3188 20.6533L20.6533 12.3188"
              // stroke="#EFEFEF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.0134 13.7079C13.397 13.7079 13.7079 13.397 13.7079 13.0134C13.7079 12.6298 13.397 12.3188 13.0134 12.3188C12.6298 12.3188 12.3188 12.6298 12.3188 13.0134C12.3188 13.397 12.6298 13.7079 13.0134 13.7079Z"
              fill="#EFEFEF"
              // stroke="#EFEFEF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.9588 20.6537C20.3423 20.6537 20.6533 20.3428 20.6533 19.9592C20.6533 19.5756 20.3423 19.2646 19.9588 19.2646C19.5752 19.2646 19.2642 19.5756 19.2642 19.9592C19.2642 20.3428 19.5752 20.6537 19.9588 20.6537Z"
              fill="#EFEFEF"
              // stroke="#EFEFEF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.76252 9.81851C6.76252 9.00801 7.08449 8.23071 7.6576 7.6576C8.23071 7.0845 9.00801 6.76253 9.8185 6.76253H11.2076C12.0145 6.76207 12.7885 6.44249 13.3607 5.87352L14.333 4.90116C14.617 4.61556 14.9547 4.38892 15.3266 4.23427C15.6984 4.07962 16.0972 4 16.5 4C16.9028 4 17.3015 4.07962 17.6734 4.23427C18.0453 4.38892 18.383 4.61556 18.667 4.90116L19.6393 5.87352C20.2115 6.44249 20.9855 6.76207 21.7924 6.76253H23.1815C23.992 6.76253 24.7693 7.0845 25.3424 7.6576C25.9155 8.23071 26.2375 9.00801 26.2375 9.81851V11.2076C26.2379 12.0145 26.5575 12.7885 27.1265 13.3607L28.0988 14.333C28.3844 14.617 28.6111 14.9547 28.7657 15.3266C28.9204 15.6984 29 16.0972 29 16.5C29 16.9028 28.9204 17.3016 28.7657 17.6734C28.6111 18.0453 28.3844 18.383 28.0988 18.667L27.1265 19.6393C26.5575 20.2115 26.2379 20.9855 26.2375 21.7924V23.1815C26.2375 23.992 25.9155 24.7693 25.3424 25.3424C24.7693 25.9155 23.992 26.2375 23.1815 26.2375H21.7924C20.9855 26.2379 20.2115 26.5575 19.6393 27.1265L18.667 28.0988C18.383 28.3844 18.0453 28.6111 17.6734 28.7657C17.3015 28.9204 16.9028 29 16.5 29C16.0972 29 15.6984 28.9204 15.3266 28.7657C14.9547 28.6111 14.617 28.3844 14.333 28.0988L13.3607 27.1265C12.7885 26.5575 12.0145 26.2379 11.2076 26.2375H9.8185C9.00801 26.2375 8.23071 25.9155 7.6576 25.3424C7.08449 24.7693 6.76252 23.992 6.76252 23.1815V21.7924C6.76206 20.9855 6.44248 20.2115 5.87351 19.6393L4.90115 18.667C4.61555 18.383 4.38891 18.0453 4.23426 17.6734C4.07961 17.3016 3.99999 16.9028 3.99999 16.5C3.99999 16.0972 4.07961 15.6984 4.23426 15.3266C4.38891 14.9547 4.61555 14.617 4.90115 14.333L5.87351 13.3607C6.44248 12.7885 6.76206 12.0145 6.76252 11.2076V9.81851Z"
              // stroke="#EFEFEF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <button
            className="fas fa-search absolute left-[50%] -top-[40%] translate-x-[-50%] scale-[75%] rounded-full border-2 border-primary-300  bg-secondary-400 p-4 text-5xl text-white hover:text-primary-300"
            onClick={() => router.push("/search")}
          />

          <svg
            width="23"
            height="25"
            viewBox="0 0 23 25"
            fill="#EFEFEF"
            xmlns="http://www.w3.org/2000/svg"
            className="hover:cursor-pointer hover:fill-primary-300"
            onClick={() => router.push("/")}
          >
            <path
              d="M20.625 1.875L18.75 0L16.875 1.875L15 0L13.125 1.875L11.25 0L9.375 1.875L7.5 0L5.625 1.875L3.75 0V17.5H0V21.25C0 23.325 1.675 25 3.75 25H18.75C20.825 25 22.5 23.325 22.5 21.25V0L20.625 1.875ZM15 22.5H3.75C3.0625 22.5 2.5 21.9375 2.5 21.25V20H15V22.5ZM20 21.25C20 21.9375 19.4375 22.5 18.75 22.5C18.0625 22.5 17.5 21.9375 17.5 21.25V17.5H6.25V3.75H20V21.25Z"
              // fill="#EFEFEF"
            />
            <path
              d="M7.49994 6.25H14.9999V8.75H7.49994V6.25ZM7.49994 10H14.9999V12.5H7.49994V10ZM16.2499 6.25H18.7499V8.75H16.2499V6.25ZM16.2499 10H18.7499V12.5H16.2499V10Z"
              // fill="#EFEFEF"
            />
          </svg>

          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="#EFEFEF"
            xmlns="http://www.w3.org/2000/svg"
            className="hover:cursor-pointer hover:fill-primary-300"
            onClick={() => router.push("/dashboard")}
          >
            <path
              d="M15.9998 2.6665C8.63984 2.6665 2.6665 8.63984 2.6665 15.9998C2.6665 23.3598 8.63984 29.3332 15.9998 29.3332C23.3598 29.3332 29.3332 23.3598 29.3332 15.9998C29.3332 8.63984 23.3598 2.6665 15.9998 2.6665ZM9.79984 24.6665C11.5465 23.4132 13.6798 22.6665 15.9998 22.6665C18.3198 22.6665 20.4532 23.4132 22.1998 24.6665C20.4532 25.9198 18.3198 26.6665 15.9998 26.6665C13.6798 26.6665 11.5465 25.9198 9.79984 24.6665ZM24.1865 22.8265C21.851 20.9941 18.9683 19.9982 15.9998 19.9982C13.0313 19.9982 10.1486 20.9941 7.81317 22.8265C6.20906 20.9136 5.3309 18.4963 5.33317 15.9998C5.33317 10.1065 10.1065 5.33317 15.9998 5.33317C21.8932 5.33317 26.6665 10.1065 26.6665 15.9998C26.6665 18.5998 25.7332 20.9732 24.1865 22.8265Z"
              // fill="#EFEFEF"
            />
            <path
              d="M16.0002 8C13.4268 8 11.3335 10.0933 11.3335 12.6667C11.3335 15.24 13.4268 17.3333 16.0002 17.3333C18.5735 17.3333 20.6668 15.24 20.6668 12.6667C20.6668 10.0933 18.5735 8 16.0002 8ZM16.0002 14.6667C14.8935 14.6667 14.0002 13.7733 14.0002 12.6667C14.0002 11.56 14.8935 10.6667 16.0002 10.6667C17.1068 10.6667 18.0002 11.56 18.0002 12.6667C18.0002 13.7733 17.1068 14.6667 16.0002 14.6667Z"
              // fill="#EFEFEF"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
