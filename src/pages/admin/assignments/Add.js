import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssignmentSchema = Yup.object().shape({
  description: Yup.string().required("Vui lòng nhập mô tả phân công"),
  team_ids: Yup.array()
    .min(1, "Vui lòng chọn ít nhất một người")
    .required("Vui lòng chọn người phân công"),
  assignment_date: Yup.date().required("Vui lòng chọn ngày phân công"),
});

function Add() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [repairTeamUsers, setRepairTeamUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/assignment-user/${id}`);
        setIncident(response.data.incident);
        setRepairTeamUsers(response.data.repair_team_users);
        console.log('Dataaaaa',response.data);
      
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Format the date to MySQL datetime format (YYYY-MM-DD HH:mm:ss)
      const formattedDate = values.assignment_date
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      // Create the request payload with formatted date
      const payload = {
        incident_reports_id: id,
        classroom_id: incident.classroom_id,
        description: values.description,
        user_ids: values.team_ids,
        assignment_date: formattedDate, // Use formatted date
      };

      // Log the payload
      console.log("Request Payload:", payload);
      console.log("Selected Users:", values.team_ids);
      console.log("Incident ID:", id);
      console.log("Classroom ID:", incident.classroom_id);
      console.log("Description:", values.description);
      console.log("Assignment Date:", values.assignment_date);

      // Send the request
      await axios.post("/api/assignments", payload);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Đã phân công xử lý sự cố",
        confirmButtonColor: "#233d7e",
      }).then(() => {
       // navigate("/admin/incident-reports");
       window.location.href = '/admin/incident-reports';
      });
    } catch (error) {
      console.error("Error creating assignment:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Có lỗi xảy ra khi phân công",
        confirmButtonColor: "#233d7e",
      });
    }
    setSubmitting(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Phân công xử lý sự cố
        </h2>

        {/* Incident Details */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-b-2">
          <h3 className="text-lg font-semibold mb-4">Thông tin sự cố</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Phòng</p>
              <p className="font-medium">{incident?.classroom_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Thời gian báo cáo</p>
              <p className="font-medium">
                {new Date(incident?.report_time).toLocaleString("vi-VN")}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Mô tả sự cố</p>
              <p className="font-medium">{incident?.description}</p>
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <Formik
          initialValues={{
            description: "",
            team_ids: [],
            assignment_date: new Date(),
          }}
          validationSchema={AssignmentSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn ngày sửa chữa
                </label>
                <DatePicker
                  selected={values.assignment_date}
                  onChange={(date) => setFieldValue("assignment_date", date)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.assignment_date && touched.assignment_date
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Chọn ngày phân công"
                  locale="vi"
                />
                {errors.assignment_date && touched.assignment_date && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.assignment_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả phân công
                </label>
                <Field
                  as="textarea"
                  name="description"
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                    errors.description && touched.description
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Nhập mô tả phân công..."
                />
                {errors.description && touched.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chọn người phân công
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {repairTeamUsers.map((user) => (
                    <div key={user.id} className="flex items-start">
                      <Field
                        type="checkbox"
                        name="team_ids"
                        value={user.id.toString()}
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        {user.name}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.team_ids && touched.team_ids && (
                  <p className="mt-1 text-sm text-red-500">{errors.team_ids}</p>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#233d7e] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Add;


