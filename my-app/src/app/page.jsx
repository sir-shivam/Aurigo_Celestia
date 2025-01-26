import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, CheckCircle, MapPin } from "lucide-react"
import Link from "next/link";

export default function LandingPage() {
  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">TenderAI</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Features
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                Pricing
              </a>
            </li>
          </ul>
        </nav>
        <Button variant="outline" className="hidden sm:inline-flex">
          Log in
        </Button>
      </header>
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1
            className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Optimize Your Tenders with AI-Powered Insights
          </h1>
          <p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to maximize your bid success rate and streamline your tendering process.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/upload" >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <BarChart2 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">AI-Powered Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get real-time insights and predictions to optimize your bids.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">98% Success Rate</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI recommendations have a proven track record of success.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <MapPin className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Global Tender Database</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access tenders from around the world in one central platform.
              </p>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-gray-100 dark:bg-gray-900 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "TenderAI has revolutionized our bidding process. We've seen a 40% increase in successful bids since
                  we started using the platform."
                </p>
                <p className="font-semibold dark:text-white">- John Doe, CEO of ConstructCo</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "The AI-powered insights have given us a competitive edge in the market. It's like having a team of
                  expert analysts at your fingertips."
                </p>
                <p className="font-semibold dark:text-white">- Jane Smith, Procurement Manager</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p>&copy; 2025 TenderAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>)
  );
}

