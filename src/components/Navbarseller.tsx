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
    <div className={`fixed z-50 h-fit w-full max-w-[500px] rounded-t-md bg-[#141313] duration-500 ${
        isNavbarVisible ? "bottom-0" : "-bottom-[200px]"
      }`}>
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
            width="29"
            height="25"
            viewBox="0 0 29 25"
            fill="#EFEFEF"
            xmlns="http://www.w3.org/2000/svg"
            className="relative -top-1 mr-20 scale-125 hover:cursor-pointer hover:fill-primary-300"
          >
            <path
              d="M0.941781 13.0136V11.3013H16.0103V13.0136H0.941781ZM0.941781 24.9999V19.8629H0V18.1506L0.941781 13.8698H16.0103L16.9521 18.1506V19.8629H16.0103V24.9999H14.1267V19.8629H10.3596V24.9999H0.941781ZM2.82534 23.2876H8.47603V19.8629H2.82534V23.2876Z"
              // fill="#EFEFEF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.1087 10.1712L14.268 8.00834L18.8639 12.6042L28.6302 1.62005L27.0101 0L18.8639 9.15732L14.268 4.56142L8.66565 10.1712H12.1087Z"
              // fill="#EFEFEF"
            />
          </svg>

          <button
            className="absolute left-[50%] -top-[40%] translate-x-[-50%] scale-[75%] rounded-full border-2 border-primary-300  bg-secondary-400 p-4 text-5xl text-white hover:text-primary-300"
            onClick={() => router.push("/search")}
          >
            <svg
              width="39"
              height="28"
              viewBox="0 0 39 28"
              fill="#EFEFEF"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:cursor-pointer hover:fill-primary-300"
            >
              <g
                clip-path="url(#clip0_1088_4817)"
                className="hover:cursor-pointer hover:fill-primary-300"
              >
                <path
                  d="M11.8753 8.01438C10.0932 9.0422 8.55442 10.5286 7.39141 12.3457C6.2284 14.1627 5.47599 16.256 5.19895 18.4453M18.9963 3.54542L18.9963 1.80836M18.9963 1.80836L20.5392 1.64861C20.412 1.44284 19.9432 1.18411 18.9963 1.18396M18.9963 1.80836L17.4534 1.6487C17.6201 1.47334 17.9488 1.18396 18.9963 1.18396M18.9963 1.80836L18.9963 1.18396"
                  // stroke="#EFEFEF"
                  stroke-width="1.5082"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.392 2.79853C9.14478 2.79853 1.753 10.8097 1.28301 20.6883H0.207712C-0.344573 20.6883 -0.792288 21.136 -0.792288 21.6883C-0.792288 22.2406 -0.344573 22.6883 0.207712 22.6883H2.25927H29.4585C29.3229 22.2404 29.25 21.7653 29.25 21.2732C29.25 21.0752 29.2618 20.8801 29.2847 20.6883H3.28519C3.75059 11.7387 10.4232 4.79853 18.392 4.79853C25.0884 4.79853 30.8694 9.69862 32.8211 16.5745C33.2361 16.4596 33.6734 16.3982 34.125 16.3982C34.3734 16.3982 34.6176 16.4168 34.8561 16.4526C32.8069 8.61721 26.2734 2.79853 18.392 2.79853Z"
                />
                <path d="M33.8849 23.8026H34.8082V21.9561H36.6548V21.0328H34.8082V19.1862H33.8849V21.0328H32.0383V21.9561H33.8849V23.8026ZM34.3466 26.1109C33.708 26.1109 33.1078 25.9896 32.5462 25.7471C31.9845 25.5046 31.4959 25.1757 31.0804 24.7606C30.6649 24.3451 30.3361 23.8565 30.0939 23.2948C29.8517 22.7332 29.7304 22.133 29.7301 21.4944C29.7301 20.8558 29.8514 20.2557 30.0939 19.694C30.3364 19.1323 30.6652 18.6437 31.0804 18.2282C31.4959 17.8128 31.9845 17.4839 32.5462 17.2417C33.1078 16.9995 33.708 16.8782 34.3466 16.8779C34.9852 16.8779 35.5853 16.9992 36.147 17.2417C36.7087 17.4842 37.1973 17.8131 37.6127 18.2282C38.0282 18.6437 38.3572 19.1323 38.5997 19.694C38.8423 20.2557 38.9634 20.8558 38.9631 21.4944C38.9631 22.133 38.8418 22.7332 38.5993 23.2948C38.3568 23.8565 38.0279 24.3451 37.6127 24.7606C37.1973 25.176 36.7087 25.505 36.147 25.7476C35.5853 25.9901 34.9852 26.1112 34.3466 26.1109ZM34.3466 25.1876C35.3776 25.1876 36.2509 24.8298 36.9664 24.1143C37.682 23.3987 38.0398 22.5254 38.0398 21.4944C38.0398 20.4634 37.682 19.5901 36.9664 18.8746C36.2509 18.159 35.3776 17.8012 34.3466 17.8012C33.3156 17.8012 32.4423 18.159 31.7267 18.8746C31.0112 19.5901 30.6534 20.4634 30.6534 21.4944C30.6534 22.5254 31.0112 23.3987 31.7267 24.1143C32.4423 24.8298 33.3156 25.1876 34.3466 25.1876Z" />
              </g>
              <defs>
                <clipPath
                  id="clip0_1088_4817"
                  className="hover:cursor-pointer hover:fill-primary-300"
                >
                  <rect
                    width="39"
                    height="27.0341"
                    fill="white"
                    className="hover:cursor-pointer hover:fill-primary-300"
                  />
                </clipPath>
              </defs>
            </svg>
          </button>
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
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            stroke="#EFEFEF"
            xmlns="http://www.w3.org/2000/svg"
            className="hover:cursor-pointer hover:stroke-primary-300"
            onClick={() => router.push("/")}
          >
            <g clip-path="url(#clip0_1088_4522)">
              <path d="M4.8611 7.09067V5.26318H19.481V7.09067H4.8611ZM4.8611 19.8831V14.4006H3.94736V12.5731L4.8611 8.00441H19.481L20.3947 12.5731V14.4006H19.481V19.8831H17.6535V14.4006H13.9985V19.8831H4.8611ZM6.68859 18.0556H12.171V14.4006H6.68859V18.0556Z" />
              <circle
                cx="12.5"
                cy="12.5"
                r="11.5132"
                // stroke="#EFEFEF"
                stroke-width="1.97368"
              />
            </g>
            <defs>
              <clipPath id="clip0_1088_4522">
                <rect width="25" height="25" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
