import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { UserAPI } from "@/lib/api/user.api";
import { AuthAPI } from "@/lib/api/auth.api";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

      const handleGoogleLogin = async (
          credentialResponse: string,
          role: string
      ) => {
        try {
          setLoading(true);

          const idToken = credentialResponse;

          if (!idToken) {
            alert("Google did not return idToken");
            return;
          }

            const user = await AuthAPI.loginWithGoogle(idToken, role);

            localStorage.setItem("user", JSON.stringify(user));

          if (role === "ORGANIZER") navigate("/organizer");
          if (role === "ATTENDEE") navigate("/attendee");
          if (role === "STAFF") navigate("/staff");
        } catch (err) {
          console.error(err);
          alert("Google login failed");
        } finally {
          setLoading(false);
        }
      };

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to <span className="text-orange-500">BookMyEvent</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {["ORGANIZER", "ATTENDEE", "STAFF"].map((role) => (
              <div
                  key={role}
                  className="bg-white text-black rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {role.replace("_", " ")}
                </h2>

                  <GoogleLogin
                      onSuccess={(res) => {
                          console.log("Google success response:", res);

                          if (!res.credential) {
                              alert("No credential received from Google");
                              return;
                          }

                          handleGoogleLogin(res.credential, role);
                      }}
                      onError={() => {
                          console.error("Google OAuth error");
                          alert("Google login failed");
                      }}
                  />
              </div>
          ))}
        </div>

        {loading && <p className="mt-6 text-sm">Signing you in…</p>}
      </div>
  );
}