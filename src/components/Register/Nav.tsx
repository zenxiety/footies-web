export default function Nav({ prevFormStep }: { prevFormStep: () => void }) {
    return (
      // ini nav yang ngikut tiap step
      // ada ngebug juga walaupun merah tapi masi bisa next
      <nav className="h-[6vh] cursor-pointer rounded-md bg-[#F4B829] px-3 font-louis">
        <button
          type="button"
          onClick={() => prevFormStep()}
          className="w-[6vh] h-[6vh] rounded-md bg-[#F4B829] font-louis my-4"
        >
            Selanjutnya
        </button>
        
      </nav>
    );
  }
  