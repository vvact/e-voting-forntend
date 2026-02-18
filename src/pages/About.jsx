import { FaShieldAlt, FaUsers, FaMobileAlt, FaChartLine, FaEnvelope, FaPhone } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            About E-Voting System
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Secure, Transparent & User-Friendly Electronic Voting Platform
          </p>
          <div className="mt-8 flex justify-center">
            <img 
              src="/images/voting_header.svg" 
              alt="E-Voting Illustration" 
              className="w-64 md:w-80 opacity-90"
              onError={(e) => e.target.style.display = 'none'} // Hide if image missing
            />
          </div>
        </div>

        {/* Mission */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
          <img 
            src="/images/a-better-world.svg" 
            alt="Mission" 
            className="w-32 md:w-40"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Empower citizens with a secure and reliable voting platform.
              Reduce queues, errors, and enhance confidence in elections.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-10">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <FaShieldAlt className="text-blue-600 text-5xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Secure OTP Verification</h3>
              <p className="text-gray-600">Your account is verified safely via OTP ensuring only authorized voters can participate.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <FaUsers className="text-blue-600 text-5xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Transparent Process</h3>
              <p className="text-gray-600">All votes are tracked and auditable, ensuring a fair and transparent election process.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <FaMobileAlt className="text-blue-600 text-5xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Mobile Friendly</h3>
              <p className="text-gray-600">Vote from any device, desktop or mobile, with a seamless and intuitive interface.</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <FaChartLine className="text-blue-600 text-5xl mb-4" />
              <h3 className="font-semibold text-xl mb-2">Real-Time Results</h3>
              <p className="text-gray-600">Administrators can monitor votes in real-time, making elections faster and efficient.</p>
            </div>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl p-8 mb-12 flex flex-col md:flex-row items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              A future where elections are digital, efficient, and trusted by all.
              Technology enables higher voter participation and strengthens democracy.
            </p>
          </div>
          <img 
            src="/images/vision.svg" 
            alt="Vision" 
            className="w-32 md:w-40"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>

        {/* Contact */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/30 rounded-2xl shadow-xl p-8 text-gray-700">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Contact Us</h2>
          <div className="flex flex-col md:flex-row justify-around items-center gap-6">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 text-2xl" />
              <span className="text-gray-700">support@evoting.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-blue-600 text-2xl" />
              <span className="text-gray-700">+254 700 000 000</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-gray-700">Address:</span>
              <span className="text-gray-700">Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}