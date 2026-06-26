import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


function BloodRequestForm() {


    const [hospital, setHospital] = useState(null);


    const [formData, setFormData] = useState({

        requester_name: "",
        hospital_name: "",
        blood_type_needed: "",
        units_needed: "",
        urgency_level: "",
        contact_phone: "",
        location: ""

    });









    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };





    const validateForm = () => {


        if (
            !formData.requester_name ||
            !formData.blood_type_needed ||
            !formData.units_needed ||
            !formData.urgency_level ||
            !formData.contact_phone
        ) {

            toast.error(
                "Please fill in all required fields"
            );

            return false;

        }



        if (isNaN(formData.units_needed)) {

            toast.error(
                "Units must be a number"
            );

            return false;

        }



        if (formData.contact_phone.length < 10) {

            toast.error(
                "Enter a valid phone number"
            );

            return false;

        }



        return true;


    };






    const handleSubmit = async (e) => {

        e.preventDefault();



        if (!validateForm()) return;




        try {


            await api.post(
                "/requests",
                formData
            );



            toast.success(
                "Blood request created successfully"
            );



            setFormData({

                requester_name: "",
                hospital_name: "",
                blood_type_needed: "",
                units_needed: "",
                urgency_level: "",
                contact_phone: "",
                location: ""

            });


        }
        catch (error) {

            console.log(error);


            toast.error(
                "Failed to create blood request"
            );


        }


    };





    return (

        <div className="bg-[#eeeaea] min-h-screen w-full">


            <Navbar role="hospital" />



            <section className="px-[60px] pt-[70px] pb-[80px]">


                <div className="max-w-[900px] mx-auto">


                    <p className="text-[#D43545] tracking-[5px] font-bold text-sm">

                        BLOOD REQUEST PORTAL

                    </p>



                    <h1 className="text-[55px] font-bold mt-6">

                        Request blood support

                    </h1>



                    <p className="text-gray-600 text-[20px] mt-5 mb-12">

                        Create an emergency request and connect your hospital
                        with available donors.

                    </p>




                    <form

                        onSubmit={handleSubmit}

                        className="bg-white rounded-[40px] p-12 shadow-[0px_20px_50px_rgba(0,0,0,0.08)]"

                    >



                        <div className="grid md:grid-cols-2 gap-8">



                            <Input

                                label="Requester Name"

                                name="requester_name"

                                value={formData.requester_name}

                                onChange={handleChange}

                            />




                            <div>

                                <Input

                                    label="Hospital Name"

                                    name="hospital_name"

                                    value={formData.hospital_name}

                                    onChange={handleChange}

                                />

                            </div>






                            <div>

                                <label className="block text-gray-600 mb-2">

                                    Blood Type Needed

                                </label>


                                <select

                                    name="blood_type_needed"

                                    value={formData.blood_type_needed}

                                    onChange={handleChange}

                                    className="w-full bg-[#fafafa] border rounded-xl p-4"

                                >


                                    <option value="">

                                        Select Blood Type

                                    </option>


                                    <option>O+</option>

                                    <option>O-</option>

                                    <option>A+</option>

                                    <option>A-</option>

                                    <option>B+</option>

                                    <option>B-</option>

                                    <option>AB+</option>

                                    <option>AB-</option>


                                </select>


                            </div>





                            <Input

                                label="Units Needed"

                                name="units_needed"

                                value={formData.units_needed}

                                onChange={handleChange}

                            />




                            <div>

                                <label className="block text-gray-600 mb-2">

                                    Urgency Level

                                </label>


                                <select

                                    name="urgency_level"

                                    value={formData.urgency_level}

                                    onChange={handleChange}

                                    className="w-full bg-[#fafafa] border rounded-xl p-4"

                                >


                                    <option value="">

                                        Select urgency

                                    </option>


                                    <option>Emergency</option>

                                    <option>Urgent</option>

                                    <option>Normal</option>


                                </select>


                            </div>






                            <Input

                                label="Contact Phone"

                                name="contact_phone"

                                value={formData.contact_phone}

                                onChange={handleChange}

                            />




                            <Input

                                label="Location"

                                name="location"

                                value={formData.location}

                                onChange={handleChange}

                            />



                        </div>





                        <button

                            className="mt-10 bg-[#D43545] text-white px-10 py-4 rounded-full font-bold"

                        >

                            Submit Request

                        </button>



                    </form>



                </div>


            </section>



            <Footer />


        </div>

    )

}




function Input({ label, name, value, onChange }) {


    return (

        <div>


            <label className="block text-gray-600 mb-2">

                {label}

            </label>



            <input

                name={name}

                value={value}

                onChange={onChange}

                className="w-full bg-[#fafafa] border border-gray-200 rounded-xl p-4 outline-none focus:border-[#D43545]"

            />


        </div>


    )


}



export default BloodRequestForm;