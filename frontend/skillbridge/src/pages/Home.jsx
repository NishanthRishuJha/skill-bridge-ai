export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="text-indigo-600 font-semibold tracking-wide">
          🚀 AI-Powered Internship Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-3 leading-tight animate-fade">
          Find the Perfect Internship  
          <span className="text-indigo-600"> Faster with AI</span>
        </h1>

        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          SkillBridge matches your profile with internships and generates AI-based  
          match scores & cover letters — helping you stand out in seconds.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="/register" className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Get Started
          </a>
          <a href="/internships" className="px-6 py-3 border border-indigo-600 text-indigo-700 rounded-lg hover:bg-indigo-50 transition">
            Browse Internships
          </a>
        </div>

        {/* Floating animation icon */}
        <div className="mt-10 flex justify-center">
          <div className="bg-white shadow-xl p-6 rounded-xl max-w-lg animate-bounce">
            🔥 “Your AI Match Score makes hiring way easier!”
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section className="bg-white py-16 shadow-inner">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🎯 AI Match Score</h3>
            <p className="text-gray-600">
              Get an instant match score between your profile & job requirements.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">✍ AI Cover Letters</h3>
            <p className="text-gray-600">
              Stand out with personalized AI-generated cover letters.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📊 Match History</h3>
            <p className="text-gray-600">
              Track your previous matches and improve over time.
            </p>
          </div>

        </div>
      </section>


      {/* CTA */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800">
          Start Your AI-Powered Internship Journey Today ✨
        </h2>

        <p className="text-gray-600 mt-2">
          Join students already getting matched with top opportunities.
        </p>

        <a href="/login"
           className="inline-block mt-5 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow">
          Login Now
        </a>
      </section>

    </div>
  );
}
