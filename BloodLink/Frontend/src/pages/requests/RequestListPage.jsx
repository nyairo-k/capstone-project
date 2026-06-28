import { useEffect, useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function RequestListPage() {

    const [requests, setRequests] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState({});


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
            toast.error("Failed to load requests");
        }
    };



    const handleEdit = (request) => {

        setEditingId(request.id);

        setEditData({
            blood_type_needed: request.blood_type_needed,
            units_needed: request.units_needed,
            urgency_level: request.urgency_level,
            contact_phone: request.contact_phone,
            location: request.location,
            status: request.status
        });

    };



    const handleChange = (e) => {

        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });

    };



    const saveEdit = async (id) => {

        try {

            await api.patch(
                `/requests/${id}`,
                editData
            );


            toast.success("Request updated successfully");

            setEditingId(null);

            fetchRequests();


        }
        catch (error) {

            console.log(error);

            toast.error("Failed to update request");

        }

    };



    const deleteRequest = async (id) => {


        const confirmDelete = window.confirm(
            "Are you sure you want to delete this blood request?"
        );


        if (!confirmDelete) return;


        try {

            await api.delete(`/requests/${id}`);

            toast.success("Request deleted");

            fetchRequests();

        }
        catch (error) {

            console.log(error);

            toast.error("Failed to delete request");

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



                <div className="grid md:grid-cols-3 gap-10">


                    {
                        requests.map((request) => (


                            <div
                                key={request.id}
                                className="bg-white rounded-[35px] p-10 shadow-[0px_15px_40px_rgba(0,0,0,0.08)] relative"
                            >



                                <div className="absolute top-8 right-8 flex gap-3">


                                    {
                                        editingId === request.id ?

                                            <button
                                                onClick={() => saveEdit(request.id)}
                                                className="bg-green-600 text-white px-5 py-2 rounded-full"
                                            >
                                                Save
                                            </button>

                                            :

                                            <button
                                                onClick={() => handleEdit(request)}
                                                className="bg-[#D43545] text-white px-5 py-2 rounded-full"
                                            >
                                                Edit
                                            </button>

                                    }


                                    <button
                                        onClick={() => deleteRequest(request.id)}
                                        className="bg-black text-white px-5 py-2 rounded-full"
                                    >
                                        Delete
                                    </button>


                                </div>



                                <div className="size-[65px] bg-[#D43545] rounded-full flex items-center justify-center text-white text-3xl font-bold">

                                    +

                                </div>




                                <h2 className="text-[28px] font-bold mt-8">

                                    {request.hospital_name}

                                </h2>




                                {
                                    editingId === request.id ?


                                        <div className="mt-8 space-y-5">


                                            <select
                                                name="blood_type_needed"
                                                value={editData.blood_type_needed}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl border"
                                            >

                                                <option>O+</option>
                                                <option>O-</option>
                                                <option>A+</option>
                                                <option>A-</option>
                                                <option>B+</option>
                                                <option>B-</option>
                                                <option>AB+</option>
                                                <option>AB-</option>

                                            </select>



                                            <input
                                                name="units_needed"
                                                value={editData.units_needed}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl border"
                                                placeholder="Units"
                                            />



                                            <select
                                                name="urgency_level"
                                                value={editData.urgency_level}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl border"
                                            >

                                                <option>Emergency</option>
                                                <option>Urgent</option>
                                                <option>Normal</option>

                                            </select>



                                            <input
                                                name="contact_phone"
                                                value={editData.contact_phone}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl border"
                                                placeholder="Phone"
                                            />



                                            <input
                                                name="location"
                                                value={editData.location}
                                                onChange={handleChange}
                                                className="w-full p-4 rounded-xl border"
                                                placeholder="Location"
                                            />


                                        </div>


                                        :


                                        <div className="mt-8 space-y-3 text-gray-600">


                                            <p>
                                                Blood Type:
                                                <b> {request.blood_type_needed}</b>
                                            </p>


                                            <p>
                                                Units:
                                                <b> {request.units_needed}</b>
                                            </p>


                                            <p>
                                                Urgency:
                                                <b> {request.urgency_level}</b>
                                            </p>


                                            <p>
                                                Phone:
                                                <b> {request.contact_phone}</b>
                                            </p>


                                            <p>
                                                Location:
                                                <b> {request.location}</b>
                                            </p>


                                        </div>


                                }



                                <span className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-full">

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