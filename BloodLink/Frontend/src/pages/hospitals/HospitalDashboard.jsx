import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const FEATURES = [
    {
        title: "Create Blood Requests",
        text: "Submit urgent blood requirements and notify available donors.",
        color: "bg-[#F26D6D]"
    },
    {
        title: "Manage Requests",
        text: "Track active requests and monitor fulfillment progress.",
        color: "bg-[#9BCB6F]"
    },
    {
        title: "Connect With Donors",
        text: "Build a faster response network during emergencies.",
        color: "bg-[#9FB8C4]"
    }
];


const METRICS = [
    {
        value: "24",
        label: "Active requests"
    },
    {
        value: "12",
        label: "Pending responses"
    },
    {
        value: "140+",
        label: "Connected donors"
    },
    {
        value: "98%",
        label: "Response rate"
    }
];



export default function HospitalDashboard() {


    return (

        <div className="bg-[#eeeaea] min-h-screen w-full">


            <Navbar role="hospital" />


            <section className="px-[60px] pt-[70px] pb-[80px]">


                <div className="flex justify-between items-center gap-10">



                    <div className="max-w-[650px]">


                        <p className="text-[#D43545] tracking-[5px] font-bold text-sm">

                            BLOODLINK HOSPITAL NETWORK

                        </p>



                        <h1 className="font-bold text-[60px] leading-tight mt-6">

                            Every request.
                            <br />

                            Every patient.
                            <br />

                            Every drop matters.

                        </h1>



                        <p className="text-[#3c3c3c] text-[20px] mt-8 leading-relaxed">

                            Coordinate emergency blood requests,
                            manage hospital needs and connect
                            with donors through one reliable platform.

                        </p>




                        <div className="flex gap-5 mt-10">


                            <Link

                                to="/requests/create"

                                className="bg-[#D43545] text-white px-8 py-4 rounded-full font-bold"

                            >

                                Create Request

                            </Link>




                            <Link

                                to="/requests"

                                className="bg-black text-white px-8 py-4 rounded-full font-bold"

                            >

                                View Requests

                            </Link>



                        </div>


                    </div>





                    <div className="bg-white rounded-[40px] p-10 w-[360px] shadow-[0px_20px_50px_rgba(0,0,0,0.1)]">


                        <div className="size-[90px] rounded-full bg-[#D43545] flex items-center justify-center text-white text-[50px]">

                            +

                        </div>



                        <h2 className="text-[32px] font-bold mt-8">

                            Hospital Portal

                        </h2>



                        <p className="text-gray-500 mt-3">

                            Your hospital is active on BloodLink

                        </p>



                        <div className="mt-8 bg-[#eeeaea] rounded-2xl p-5">


                            <p className="text-sm text-gray-500">

                                Current Status

                            </p>


                            <p className="text-xl font-bold">

                                Operational

                            </p>


                        </div>



                    </div>



                </div>


            </section>







            <section className="px-[60px] py-[50px]">


                <h2 className="text-[40px] font-bold mb-[40px]">

                    Hospital Operations

                </h2>



                <div className="grid grid-cols-3 gap-8">


                    {
                        FEATURES.map((item) => (
                            <div

                                key={item.title}

                                className={`${item.color} rounded-[35px] p-10 h-[260px] shadow-lg`}

                            >


                                <h3 className="text-[28px] font-bold">

                                    {item.title}

                                </h3>


                                <p className="mt-5 text-[18px] leading-relaxed">

                                    {item.text}

                                </p>


                            </div>
                        ))

                    }



                </div>


            </section>







            <section>


                <div className="h-[40px] bg-gradient-to-r from-[#9BCB6F] via-[#F4D35E] to-[#F26D6D] flex items-center justify-center">


                    <p className="text-white tracking-[3px] font-bold">

                        HOSPITAL METRICS

                    </p>


                </div>





                <div className="grid grid-cols-4 gap-6 px-[60px] py-[50px] bg-white">


                    {
                        METRICS.map((metric) => (

                            <div

                                key={metric.label}

                                className="bg-[#eeeaea] rounded-[20px] p-8"

                            >


                                <p className="text-[40px] font-bold">

                                    {metric.value}

                                </p>


                                <p className="text-gray-600">

                                    {metric.label}

                                </p>


                            </div>


                        ))

                    }



                </div>


            </section>






            <section className="px-[60px] py-[70px]">


                <div className="bg-white rounded-[40px] p-12 shadow">


                    <h2 className="text-[40px] font-bold mb-8">

                        How BloodLink supports hospitals

                    </h2>


                    <div className="grid grid-cols-3 gap-8">


                        <div>

                            <h3 className="text-[28px] font-bold">

                                01. Create Need

                            </h3>

                            <p className="mt-3 text-gray-600">

                                Hospitals submit blood requirements.

                            </p>

                        </div>



                        <div>

                            <h3 className="text-[28px] font-bold">

                                02. Connect

                            </h3>

                            <p className="mt-3 text-gray-600">

                                Donors receive relevant requests.

                            </p>

                        </div>




                        <div>

                            <h3 className="text-[28px] font-bold">

                                03. Save Lives

                            </h3>

                            <p className="mt-3 text-gray-600">

                                Patients receive support faster.

                            </p>

                        </div>


                    </div>


                </div>


            </section>




            <Footer />


        </div>


    )

}