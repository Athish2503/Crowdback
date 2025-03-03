import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BusFront, Users, MessageSquare, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();

  const handleUserLoginClick = () => {
    navigate("/login");
  };

  const handleAuthoritiesLoginClick = () => {
    navigate("/authorities-login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Container className="px-4 py-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center py-16 md:py-24">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-6">
            <BusFront className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-4">
            Welcome to CrowdBack
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mb-10">
            Connecting commuters and transport authorities to create better public transportation experiences for
            everyone.
          </p>

          {/* Main Buttons */}
          <Row className="w-full max-w-2xl mx-auto">
            <Col md={6} className="mb-4 mb-md-0">
              <Card
                className={`h-100 overflow-hidden transition-all duration-300 ${
                  hoveredButton === "authorities"
                    ? "shadow-lg border-blue-300 transform scale-105"
                    : "shadow border-transparent"
                }`}
                onMouseEnter={() => setHoveredButton("authorities")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Button
                  variant="light"
                  className="w-100 h-100 p-8 d-flex flex-column align-items-center justify-content-center gap-4 border-0 rounded-0"
                  onClick={handleAuthoritiesLoginClick}
                >
                  <div className="bg-blue-100 p-4 rounded-full">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-xl font-semibold">Officials Login</div>
                  <div className="text-sm text-gray-500">Manage and respond to feedback</div>
                  <ArrowRight
                    className={`h-5 w-5 mt-2 transition-all duration-300 ${
                      hoveredButton === "authorities" ? "translate-x-1 opacity-100" : "opacity-0"
                    }`}
                  />
                </Button>
              </Card>
            </Col>

            <Col md={6}>
              <Card
                className={`h-100 overflow-hidden transition-all duration-300 ${
                  hoveredButton === "users"
                    ? "shadow-lg border-blue-300 transform scale-105"
                    : "shadow border-transparent"
                }`}
                onMouseEnter={() => setHoveredButton("users")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Button
                  variant="light"
                  className="w-100 h-100 p-8 d-flex flex-column align-items-center justify-content-center gap-4 border-0 rounded-0"
                  onClick={handleUserLoginClick}
                >
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-xl font-semibold">Public Login</div>
                  <div className="text-sm text-gray-500">Submit feedback and suggestions</div>
                  <ArrowRight
                    className={`h-5 w-5 mt-2 transition-all duration-300 ${
                      hoveredButton === "users" ? "translate-x-1 opacity-100" : "opacity-0"
                    }`}
                  />
                </Button>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <Row className="py-16">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Crowdsourced Feedback</h3>
              <p className="text-gray-600">
                Collect valuable insights from passengers to identify issues, measure satisfaction, and improve
                services.
              </p>
            </div>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Connection</h3>
              <p className="text-gray-600">
                Connect commuters directly with transport authorities to ensure concerns are heard and addressed
                promptly.
              </p>
            </div>
          </Col>

          <Col md={4}>
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <BusFront className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Reporting</h3>
              <p className="text-gray-600">
                Enable passengers to report problems and suggest improvements in real-time for a more responsive system.
              </p>
            </div>
          </Col>
        </Row>

        {/* Footer */}
        <div className="text-center text-gray-500 py-8 border-t">
          <p>© {new Date().getFullYear()} Public Transport Feedback System. All rights reserved.</p>
        </div>
      </Container>
    </div>
  );
}

export default Welcome;