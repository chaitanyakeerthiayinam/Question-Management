import { useFormik } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            role: 'admin'
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values, { setSubmitting, setStatus }) => {
            login(values.username, values.password)
                .then(success => {
                    if (success) {
                        navigate('/');
                    } else {
                        setStatus('Invalid username or password');
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    });

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title text-center">Login</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('username')}
                                />
                                {formik.touched.username && formik.errors.username ? (
                                    <div className="invalid-feedback">{formik.errors.username}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                                    {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                ) : null}
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                            {formik.status === 'success' && <div className="alert alert-success mt-3">Login successful!</div>}
                            {formik.status === 'error' && <div className="alert alert-danger mt-3">Login failed. Please try again.</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Login;
