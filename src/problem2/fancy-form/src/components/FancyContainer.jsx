import SwapForm from "./SwapForm";

const FancyContainer = () => {
  return (
    <div className="fancy-container">
      <div className="flex flex-col items-center justify-center text-center max-w-6xl mx-auto w-full">
        <div className="mb-6 sm:mb-8 lg:mb-3">
          <h1 className="fancy-heading fancy-heading-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Swap Anytime,
          </h1>
          <h1 className="fancy-heading fancy-heading-secondary text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Anywhere
          </h1>
        </div>
        <div className="swap-form-container">
          <SwapForm />
        </div>
      </div>
    </div>
  );
};

export default FancyContainer;
