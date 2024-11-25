import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-custom-teal p-4">
        <div className="text-white text-2xl font-bold">EduOrganizer</div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-custom-teal text-white py-6" >
        <div className="container mx-auto flex flex-wrap justify-between px-4">
          <div className="flex-1 min-w-[200px] mb-4 md:mb-0 mr-16">
            <h4 className="font-semibold mb-2">Demo.</h4>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              vitae augue quis odio facilisis gravida.
            </p>
          </div>
          <div className="flex-1 min-w-[200px] mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-sm">
              <li>About us</li>
              <li>Services</li>
              <li>Community</li>
              <li>Testimonials</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-sm">
              <li>Help Center</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="space-y-1 text-sm">
              <li>Courses</li>
              <li>Become a Teacher</li>
              <li>Reviews</li>
            </ul>
          </div>
          <div className="flex-1 min-w-[200px] mb-4 md:mb-0">
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p className="text-sm">eduorganizer@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;