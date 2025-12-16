"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const handleTestAccount = async () => {
    const testUser = {
      name: "Test User",
      email: "testuser@fade.dev",
      picture: "/5907.jpg",
      uid: "test-user-" + uuid4(),
    };

    try {
      await CreateUser({
        name: testUser.name,
        email: testUser.email,
        picture: testUser.picture,
        uid: testUser.uid,
      });
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(testUser));
      }
      setUserDetail(testUser);
      closeDialog(false);
    } catch (error) {
      console.error("Test account error:", error);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-3">
          <h2 className="font-bold text-2xl text-center text-white">
            {Lookup.SIGNIN_HEADING}
          </h2>
          <p className="mt-2 text-center">{Lookup.SIGNIN_SUBHEADING}</p>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-400 mt-3 w-full max-w-xs"
            onClick={() => googleLogin()}
          >
            Sign In With Google
          </Button>
          <div className="relative w-full max-w-xs my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full max-w-xs"
            onClick={handleTestAccount}
          >
            Continue as Test User
          </Button>
          <p className="text-xs text-center text-muted-foreground">{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
