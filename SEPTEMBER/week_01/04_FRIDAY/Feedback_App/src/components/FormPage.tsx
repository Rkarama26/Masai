import { useContext } from "react"
import { FormContext } from "./FormContext"
import { useNavigate } from "react-router";


function FormPage() {

    const context = useContext(FormContext);
    const navigate = useNavigate()

    if (!context) return null;
    const { formData, setFormData } = context;

    const handleSubmit = () => {
        if (formData.name && formData.email && formData.feedback) {
            navigate("/summary");
        }
        else {
            alert('All fields are required')
        }
    }


    return (
        <div className="p-4">
            <h1>Feedback Form</h1>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ name: e.target.value })}
                className="block my-2"
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                className="block my-2"
            />
            <textarea
                placeholder="Your feedback"
                value={formData.feedback}
                onChange={(e) => setFormData({ feedback: e.target.value })}
                className="block my-2"
            />
            <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white">
                Go to Summary
            </button>
        </div>
    )
}

export default FormPage
