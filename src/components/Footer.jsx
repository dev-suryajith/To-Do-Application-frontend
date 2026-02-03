function Footer() {
  return (
    <footer className="w-screen overflow-hidden py-6 bg-[#67625C]">
      <div className="max-w-6xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-[#F3E9DD]/80">
        
        {/* Left */}
        <p>
          © {new Date().getFullYear()} Task Manager
        </p>

        {/* Right */}
        <div className="flex gap-4 mt-2 sm:mt-0">
          <span className="hover:text-white cursor-pointer transition">
            Privacy
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Terms
          </span>
          <span className="hover:text-white cursor-pointer transition">
            Support
          </span>
        </div>

      </div>
    </footer>
  )
}

export default Footer
