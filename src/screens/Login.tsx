import meshGradient from "../images/mesh-gradient-1.png";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { use, useEffect } from "react";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { analytics } from "../firebasecConfig";
import { logEvent } from "firebase/analytics";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { auth, functions } = use(SupabaseContext);

  useEffect(() => {
    logEvent(analytics, "screen_view", {
      firebase_screen: "Login",
      firebase_screen_class: "Login",
    });
  }, []);

  const handleSubmit = async (
    values: LoginValues,
    { setStatus, setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    try {
      logEvent(analytics, "login_attempt", {
        email: values.email,
      });
      const { data, error } = await auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        logEvent(analytics, "login_error", {
          error: error.message,
        });
        setStatus({ error: error.message });
        return;
      }

      if (data?.user) {
        const { data: subscriptionData, error: subscriptionError } =
          await functions.invoke("check-stripe-subscription", {
            body: {
              stripeCustomerId: data.user.user_metadata.stripe_customer_id,
            },
          });

        if (subscriptionError) {
          logEvent(analytics, "login_error", {
            error: subscriptionError.message,
          });
          setStatus({ error: subscriptionError.message });
          return;
        }

        if (subscriptionData?.isSubscribed) {
          logEvent(analytics, "login_success", {
            is_subscribed: subscriptionData?.isSubscribed,
            user_id: data.user.id,
            email: values.email,
          });
          setStatus({ success: "Login successful" });
          navigate("/editor");
          return;
        }

        const { data: accessCodeData, error: accessCodeError } =
          await functions.invoke("check-access-codes", {
            body: {
              user_id: data.user.id,
            },
          });

        if (accessCodeError) {
          logEvent(analytics, "login_error", {
            error: accessCodeError.message,
          });
          setStatus({ error: accessCodeError.message });
          return;
        }

        if (subscriptionData?.isSubscribed || accessCodeData?.hasAccessCode) {
          logEvent(analytics, "login_success", {
            has_access_code: accessCodeData?.hasAccessCode,
            user_id: data.user.id,
            email: values.email,
          });
          setStatus({ success: "Login successful" });
          navigate("/editor");
        }
      } else {
        setStatus({ error: "No user data returned" });
      }
    } catch (error) {
      setStatus({ error: "An error occurred" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div
        className="w-1/2 h-full bg-cover bg-center shadow-lg"
        style={{ backgroundImage: `url(${meshGradient})` }}
      ></div>
      <div className="w-1/2 h-full">
        <div className="w-full h-full flex flex-col items-center justify-center px-4">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={toFormikValidationSchema(loginSchema)}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status, errors, touched }) => (
              <Form className="w-full max-w-md">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl font-bold text-neutral-300 mb-4 self-start">
                    Login
                  </h1>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-neutral-300">
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none shadow-inset"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500">{errors.email}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-neutral-300">
                      Password
                    </label>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className={`w-full p-2 rounded-md bg-neutral-900 text-neutral-300 focus:outline-none  shadow-inset ${
                        errors.password && touched.password ? "mb-0" : "mb-4"
                      }`}
                    />
                    {errors.password && touched.password && (
                      <p className="text-red-500 mb-4">{errors.password}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
                {status?.error && (
                  <p className="text-red-500 mt-4">{status.error}</p>
                )}
                {status?.success && (
                  <p className="text-green-500 mt-4">{status.success}</p>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
