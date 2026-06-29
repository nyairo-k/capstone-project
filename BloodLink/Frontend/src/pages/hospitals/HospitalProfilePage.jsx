import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../api/api";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


function HospitalProfilePage() {
    const user = JSON.parse(
        localStorage.getItem("user")
    );
    const id = user.id;





    const [hospital, setHospital] = useState(null);


    const [editing, setEditing] = useState(false);



    const [formData, setFormData] = useState({});



    useEffect(() => {


        api.get(`/hospitals/${id}`)

            .then((response) => {


                setHospital(response.data);


                setFormData(response.data);


            })

            .catch(error => {

                console.log(error);

            })


    }, [id]);





    const handleChange = (e) => {


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };





    const handleUpdate = async () => {


        try {


            const response = await api.patch(

                `/hospitals/${id}`,

                formData

            );



            setHospital(response.data.hospital);



            setEditing(false);
            toast.success("Hospital updated successfully")



        }


        catch (error) {


            console.log(error);
            toast.error("Failed to update hospital")



        }


    };






    if (!hospital) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-[#f7f3f3]">

                Loading...

            </div>

        )

    }






    return (


        <div className="bg-[#eeeaea] min-h-screen w-full">


            <Navbar />

            <main className="px-[60px] py-[70px]">


                <section className="flex justify-between items-center mb-14">



                    <div>


                        <p className="text-[#e63946] tracking-[5px] font-bold">

                            BLOODLINK HOSPITAL PORTAL

                        </p>



                        <h1 className="text-5xl font-extrabold mt-5">

                            {hospital.hospital_name}

                        </h1>



                        <p className="text-gray-600 mt-4">

                            Manage hospital information and blood requests.

                        </p>



                    </div>






                </section>







                <section className="bg-white rounded-[35px] p-10">



                    <div className="flex justify-between items-center mb-8">


                        <h2 className="text-3xl font-bold">

                            Hospital Information

                        </h2>




                        <button


                            onClick={() => setEditing(!editing)}


                            className="bg-[#ef5961] text-white px-8 py-3 rounded-full"


                        >

                            {editing ? "Cancel" : "Edit Profile"}


                        </button>



                    </div>







                    <div className="grid md:grid-cols-2 gap-6">





                        <InputBox

                            label="Hospital Name"

                            name="hospital_name"

                            value={formData.hospital_name}

                            editing={editing}

                            onChange={handleChange}


                        />






                        <InputBox

                            label="Email"

                            name="email"

                            value={formData.email}

                            editing={editing}

                            onChange={handleChange}


                        />






                        <InputBox

                            label="Phone"

                            name="phone_number"

                            value={formData.phone_number}

                            editing={editing}

                            onChange={handleChange}


                        />






                        <InputBox

                            label="Location"

                            name="location"

                            value={formData.location}

                            editing={editing}

                            onChange={handleChange}


                        />






                    </div>






                    {editing && (


                        <button


                            onClick={handleUpdate}


                            className="mt-10 bg-black text-white px-10 py-4 rounded-full"


                        >

                            Save Changes

                        </button>


                    )}





                </section>




            </main>


            <Footer />


        </div>

    )


}






function InputBox({ label, name, value, editing, onChange }) {


    return (


        <div className="bg-[#fafafa] p-6 rounded-2xl">


            <p className="text-gray-500 mb-3">

                {label}

            </p>



            {

                editing ?


                    <input


                        name={name}

                        value={value || ""}

                        onChange={onChange}


                        className="w-full bg-white border rounded-xl p-3 outline-none"


                    />


                    :


                    <h3 className="font-bold text-xl">

                        {value}

                    </h3>


            }



        </div>


    )


}





export default HospitalProfilePage;