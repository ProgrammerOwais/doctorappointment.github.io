import { useRouter } from "next/navigation";
const Form = ({ userData, setUserData, handleSubmit, submitting }) => {
  const router = useRouter();

  // useEffect(() => {
  //   console.log("function is called");
  // }, [userData]);
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name:</span>
        <input
          value={userData.name}
          type="text"
          placeholder="Enter Your Full Name"
          required
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          value={userData.email}
          type="email"
          placeholder="Enter Your Full Name"          
          required
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      </label>
      <label>
        <span>Whatsup No:</span>
        <input
          value={userData.number}
          type="number"
          placeholder="Enter Your Whats up No."
          required
          onChange={(e) => setUserData({ ...userData, number: e.target.value })}
        />
      </label>
      <label>
        <span>Select Date:</span>
        <input
          value={userData.date.split("T")[0]}
          type="date"
          placeholder="Choose Date"
          required
          onChange={(e) => setUserData({ ...userData, date: e.target.value })}
        />
      </label>
      <label>
        <span>Select Time:</span>
        <input
          value={userData.time}
          type="time"
          placeholder="Choose Time"
          required
          onChange={(e) => setUserData({ ...userData, time: e.target.value })}
        />
      </label>
      <button className="submit" disabled={submitting} type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
