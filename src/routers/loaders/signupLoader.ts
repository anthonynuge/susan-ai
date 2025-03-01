import { redirect, LoaderFunction } from "react-router-dom";
import { AppwriteException } from "appwrite"; // Import AppwriteException for error handling
import { account } from "@/lib/appwrite";

const signupLoader: LoaderFunction = async () => {
  try {
    await account.get(); // ✅ If logged in, redirect to home
    return redirect("/");
  } catch (error) {
    if (error instanceof AppwriteException) {
      if (error.code === 401) {
        console.warn("User is not logged in (Expected behavior).");
      } else {
        console.error("Unexpected Appwrite error:", error);
      }
    } else {
      console.error("Unexpected error:", error);
    }
    return null; // ✅ Always return a valid response to React Router
  }
};

export default signupLoader;
