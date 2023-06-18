import Link from "next/link";
const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        {" "}
        <h1 className="heading1">Health App</h1>
        <p className="main-para">
          Book a doctor appointment effortlessly with HealthApp! Skip the queues
          and schedule your visit with our experienced medical professionals.
          Your well-being is our priority. Take control of your health today!
        </p>
        <h3 className="heading2">
          Visit HealthApp and book your appointment now. Your health matters!
        </h3>
        <button className="take-appointment">
          <Link href="/appointment" className="a">
            Take Appointment
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
