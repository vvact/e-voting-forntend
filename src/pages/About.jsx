import { FaShieldAlt, FaUsers, FaMobileAlt, FaChartLine, FaEnvelope, FaPhone } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-700 mb-4">
            About E-Voting System
          </h1>
          <p className="text-gray-700 text-lg">
            Secure, Transparent & User-Friendly Electronic Voting Platform
          </p>
          <img 
            src="/images/voting_header.svg" 
            alt="E-Voting Illustration" 
            className="mx-auto mt-6 w-80"
          />
        </div>

        {/* Mission */}
        <div className="bg-blue-50 p-8 rounded-xl shadow-md mb-8 flex flex-col md:flex-row items-center gap-6">
          <img src="/images/a-better-world.svg" alt="Mission" className="w-40" />
          <div>
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              Empower citizens with a secure and reliable voting platform.
              Reduce queues, errors, and enhance confidence in elections.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaShieldAlt className="text-blue-600 text-4xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Secure OTP Verification</h3>
              <p className="text-gray-700">Your account is verified safely via OTP ensuring only authorized voters can participate.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaUsers className="text-blue-600 text-4xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Transparent Process</h3>
              <p className="text-gray-700">All votes are tracked and auditable, ensuring a fair and transparent election process.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaMobileAlt className="text-blue-600 text-4xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Responsive & Mobile Friendly</h3>
              <p className="text-gray-700">Vote from any device, desktop or mobile, with a seamless and intuitive interface.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <FaChartLine className="text-blue-600 text-4xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Real-Time Results</h3>
              <p className="text-gray-700">Administrators can monitor votes in real-time, making elections faster and efficient.</p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-blue-50 p-8 rounded-xl shadow-md mb-8 flex flex-col md:flex-row items-center gap-6">
          <div>
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg">
              A future where elections are digital, efficient, and trusted by all.
              Technology enables higher voter participation and strengthens democracy.
            </p>
          </div>
          <img src="/images/vision.svg" alt="Vision" className="w-40" />
        </div>

        {/* Contact */}
        <div className="bg-white p-8 rounded-xl shadow-md text-gray-700">
          <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <span>support@evoting.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600 text-2xl" />
              <span>+254 700 000 000</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">Address:</span>
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
