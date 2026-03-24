import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useCrud } from "../../api/useCrud";

function Login() {
  const navigate = useNavigate();

  const { create } = useCrud({
  endpoint: "login/",
  queryKey: "login",
});

const loginMutation = create();
  const handleLogin = (values) => {
 console.log("Form submitted:", values);
  loginMutation.mutate(
    {
      username: values.username,
      password: values.password,
    },
    {
      onSuccess: (data) => {
        console.log("Login success:", data);

        // Example if token returned
        if (data?.access) {
          localStorage.setItem("token", data.access);
        }

        navigate("/dashboard");
      },

      onError: (error) => {
        console.error("Login failed:", error);
        alert("Invalid username or password");
      },
    }
  );

};
 
  
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f0f2f5"
    }}>

      <div style={{
        width: "1100px",
        height: "650px",
        background: "#fff",
        borderRadius: "20px",
        display: "flex",
        overflow: "hidden",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
      }}>

        {/* LEFT */}
        <div style={{ flex: 1, padding: "70px" }}>

          <h3>TaskBuddy</h3>

          <h1 style={{ fontSize: "40px" }}>
            Hello,<br />Welcome Back
          </h1>



          <Form layout="vertical" onFinish={handleLogin}>

            <Form.Item name="username">
              <Input placeholder="stanley@gmail.com"
                ></Input>
            </Form.Item>

            <Form.Item name="password">
              <Input.Password placeholder="••••••"
                 />
            </Form.Item>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Checkbox>Remember me</Checkbox>
              <span style={{ color: "#6c5ce7", cursor: "pointer" }}>
                Forgot Password?
              </span>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: "20px" }}
              
            >
              Sign In
            </Button>

            {/* SIGN UP SECTION */}
            <p
              style={{
                marginTop: "30px",
                fontSize: "13px",
                color: "#555",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              onClick={() => navigate("/signup")}
            >
              Don't have an account?


            </p>
          </Form>


        </div>

        {/* RIGHT */}
        <div style={{
          flex: 1,
          background: "linear-gradient(135deg,#6c5ce7,#9b59b6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>

          <img src="https://cdni.iconscout.com/illustration/premium/thumb/female-graphic-designer-6329635-5210319.png" style={{ width: "70%" }} />

        </div>

      </div>

    </div>
  );
}

export default Login;