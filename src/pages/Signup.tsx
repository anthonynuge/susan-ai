import React from "react";

import PageTitle from "../components/PageTitle";
import TextField from "../components/TextField";
import Button from "../components/Button";

import { Link, Form } from "react-router-dom";
import { GrRobot } from "react-icons/gr";

const Signup: React.FC = () => {
  return (
    <>
      <PageTitle title="Sign up to create a account" />
      <div>
        <div>
          <Link to="/">
            {/* light */}
            <GrRobot size={133} className="" />
            <span>Susan AI</span>

            {/* dark */}
            <GrRobot size={133} className="" />
            <span>Susan AI</span>
          </Link>

          <div className="">
            <h2>Create an account</h2>

            <p>Sign up to chat with Susan your new AI companion.</p>

            <Form method="POST" className="">
              <TextField
                name="name"
                label="Full name"
                type="text"
                placeholder="Full Name"
                required={true}
                autoFocus={true}
              />

              <TextField
                name="email"
                label="email"
                type="email"
                placeholder="Email"
                required={true}
              />
              <TextField
                name="password"
                label="password"
                type="password"
                placeholder="Enter your password"
                required={true}
              />

              <Button type="submit">Create Account</Button>
            </Form>
            <p>
              Already have a account?
              <Link to="/login" className="">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
