import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";
import ellipse from "../../assets/Ellipse.png";
import handsImage from "../../assets/handsImageBlood.png";
import toast from "react-hot-toast";

export default function SignupPage() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "donor",
    location: "",
    blood_type: ""
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }


    if (form.role === "donor" && !form.blood_type) {
      toast.error("Blood type is required for donors");
      return;
    }


    try {

      await api.post("/signup", {

        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        location: form.location,
        blood_type: form.blood_type

      });


      toast.success("Account created successfully");
      navigate("/login");


    } catch (error) {

      console.log(error);
      toast.error(error.response?.data?.message || "Signup failed");

    }

  };


  return (

    <div className="bg-[#eeeaea] min-h-screen w-full flex items-center justify-center px-6 py-10">

      <section className="relative flex w-full max-w-[1200px] min-h-[650px] bg-white rounded-[30px] overflow-hidden shadow-xl">

        <img src={ellipse} className="absolute -top-32 -left-32 w-[420px]" />


        <div className="flex-1 flex items-center justify-center p-10 z-10">

          <form onSubmit={handleSubmit} className="w-full max-w-[420px]">


            <p className="text-sm text-gray-500 mb-2">
              Welcome to BloodLink
            </p>


            <h1 className="text-4xl font-bold mb-8">
              Create Account
            </h1>



            <div className="space-y-5">


              <div>
                <label>Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border" />
              </div>



              <div>
                <label>Email</label>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border" />
              </div>



              <div>
                <label>Location</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border" />
              </div>



              <div>
                <label>Account Type</label>

                <select name="role" value={form.role} onChange={handleChange} className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border">

                  <option value="donor">Donor</option>

                  <option value="hospital">Hospital</option>

                </select>

              </div>



              {
                form.role === "donor" &&

                <div>

                  <label>Blood Type</label>

                  <select name="blood_type" value={form.blood_type} onChange={handleChange} className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border">

                    <option value="">Select blood type</option>

                    <option value="A+">A+</option>

                    <option value="A-">A-</option>

                    <option value="B+">B+</option>

                    <option value="B-">B-</option>

                    <option value="AB+">AB+</option>

                    <option value="AB-">AB-</option>

                    <option value="O+">O+</option>

                    <option value="O-">O-</option>

                  </select>

                </div>

              }



              <div>

                <label>Password</label>

                <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border" />

              </div>



              <div>

                <label>Confirm Password</label>

                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="w-full mt-2 p-4 rounded-xl bg-[#eeeaea] border" />

              </div>



              <button className="w-full bg-[#D43545] text-white py-4 rounded-xl font-bold mt-4">

                Sign Up

              </button>


              <p className="text-center mt-5">

                Already have an account?

                <Link to="/login" className="text-[#D43545] font-bold ml-2">

                  Login

                </Link>

              </p>


            </div>


          </form>

        </div>



        <div className="hidden md:block w-[420px] relative">

          <img src={handsImage} className="absolute inset-0 w-full h-full object-cover" />


          <div className="relative z-10 flex justify-between flex-col h-full p-10 text-white tracking-[4px] uppercase text-center">

            <p>Donate Blood</p>

            <p>Save A Life</p>

          </div>


        </div>


      </section>


    </div>


  )

}