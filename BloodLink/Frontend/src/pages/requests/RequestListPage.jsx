import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function RequestListPage() {

    const [requests, setRequests] = useState([]);


    useEffect(() => {

        fetchRequests();

    }, []);



    const fetchRequests = async () => {

        try {

            const response = await api.get("/requests");


            setRequests(response.data);


        }
        catch (error) {

            console.log(error);


            toast.error(
                "Failed to load requests"
            );

        }

    };



    return (

        <div className="bg-[#eeeaea] min-h-screen w-full">


            <Navbar role="hospital" />

            <section className="px-[60px] pt-[70px] pb-[80px]">


                <p className="text-[#D43545] tracking-[5px] font-bold text-sm">

                    ACTIVE BLOOD REQUESTS

                </p>



                <h1 className="text-[55px] font-bold mt-6 mb-12">

                    Hospital requests

                </h1>




                <div className="grid md:grid-cols-3 gap-8">


                    {
                        requests.map((request) => (


                            <div

                                key={request.id}

                                className="bg-white rounded-[35px] p-8 shadow-[0px_15px_40px_rgba(0,0,0,0.08)]"


                            >



                                <div className="size-[60px] bg-[#D43545] rounded-full flex items-center justify-center text-white text-3xl font-bold">

                                    +

                                </div>



                                <h2 className="text-[28px] font-bold mt-6">

                                    {request.hospital_name}

                                </h2>



                                <p className="mt-4 text-gray-600">

                                    Blood Type:

                                    <b> {request.blood_type_needed}</b>

                                </p>



                                <p className="text-gray-600">

                                    Units:

                                    <b> {request.units_needed}</b>

                                </p>



                                <p className="text-gray-600">

                                    Urgency:

                                    <b> {request.urgency_level}</b>

                                </p>



                                <span className="inline-block mt-6 bg-black text-white px-6 py-2 rounded-full">

                                    {request.status}

                                </span>



                            </div>


                        ))

                    }


                </div>


            </section>


            <Footer />


        </div>

    )

}


export default RequestListPage;