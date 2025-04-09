import type React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} HackJam. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
