import React from 'react';

import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import Button from '../components/Button';
import banner from '../assets/banner.jpg';

import { Link, Form } from 'react-router-dom';
import { GrRobot } from 'react-icons/gr';
import Footer from '../components/Footer';

const Signup: React.FC = () => {
  return (
    <>
      <PageTitle title="Sign up to create a account" />
      <div className="relative w-screen h-dvh grid p-3 grid-cols-1 lg:[grid-template-columns:1fr_1.4fr] lg:gap-3">
        {/* form  */}
        <div className="flex flex-col p-3">
          <Link to="/" className="max-w-max mx-auto mb-auto lg:mx-0">
            {/* dark */}
            <div className="flex text-center">
              <GrRobot size={25} className="text-sky-500" />
              <span className="text-neutral-900 text-xl font-semibold dark:text-neutral-200">
                SUSAN-AI
              </span>
            </div>
          </Link>

          <div className="flex flex-col max-w-[600px] w-full mx-auto">
            <h2 className="text-neutral-950 font-semibold text-4xl dark:text-neutral-100 text-center mb-4">
              Create an account
            </h2>
            <p className="text-center leading-tight mt-1 mb-3">
              Sign up today to meet Susan, your new AI companion! Start your
              journey with Susan now.
            </p>

            <Form method="POST" className="grid grid-cols-1 gap-3">
              <TextField
                name="name"
                label="Full name"
                type="text"
                placeholder="Full Name"
                required={true}
                autoFocus={true}
                helperTxt="hello"
              />

              <TextField
                name="email"
                label="Email"
                type="email"
                placeholder="Email"
                required={true}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required={true}
              />

              <Button
                type="submit"
                // disabled={!formFilled}
                className="bg-sky-500 dark:bg-sky-500 text-neutral-100 dark:text-neutral-950 rounded-xl h-9 text-sm flex justify-center items-center transition-shadow duration-400 dark:hover:shadow-neutral-400"
              >
                Create Account
              </Button>
            </Form>
            <p className="text-center mt-5 text-sm">
              Already have a account?
              <Link
                to="/login"
                className="text-sm inline ml-2 hover:text-sky-400 duration-300 transition-colors hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
          <Footer />
        </div>

        {/* cover image */}
        <div className="hidden lg:block lg:rounded-lg lg:relative lg:overflow-hidden">
          <img
            src={banner}
            alt="cover"
            className="h-full w-full object-cover"
          />
          <p className="absolute bottom-16 text-4xl z-10 font-bold leading-tight left-16 right-16">
            Sign up to chat with Susan your new AI companion.
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
