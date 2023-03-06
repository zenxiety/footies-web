export default function Nav({ prevFormStep }: { prevFormStep: () => void }) {
    return (
      // ini nav yang ngikut tiap step
      // ada ngebug juga walaupun merah tapi masi bisa next
      <nav className="absolute left-1/2 bottom-7 z-50 flex -translate-x-1/2 justify-between">
        <button
          type="button"
          onClick={() => prevFormStep()}
          className="opacity-0"
        >
          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width={28}
              height={28}
              rx={14}
              transform="matrix(-1 0 0 1 28 0)"
              fill="#F6C73B"
            />
            <path
              d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
              fill="#1D1D1D"
            />
          </svg>
        </button>
        <div className="w-56"></div>
        <button type="submit" className="opacity-0">
          <svg
            width={28}
            height={28}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <rect
              width={28}
              height={28}
              rx={14}
              transform="matrix(-1 0 0 1 28 0)"
              fill="#F6C73B"
            />
            <path
              d="M17.587 6.947a1.328 1.328 0 010 1.88L12.413 14l5.174 5.173a1.33 1.33 0 01-1.88 1.88l-6.12-6.12a1.327 1.327 0 010-1.88l6.12-6.12c.506-.506 1.36-.506 1.88.014z"
              fill="#1D1D1D"
            />
          </svg>
        </button>
      </nav>
    );
  }
  