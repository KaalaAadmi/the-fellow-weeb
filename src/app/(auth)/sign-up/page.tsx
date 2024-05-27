"use client";
import { useState } from "react";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    if (!checked) {
      setMessage("You Need to Accept Our Privacy Policy");
      return;
    }
    try {
      await signUp
        .create({
          first_name: firstName,
          last_name: lastName,
          email_address: email,
          password,
        })
        .then()
        .catch(err => {
          setMessage(err.errors[0].message);
        });
      // send verification email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      // change UI
      setPendingVerification(true);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // Verify User Email Code
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex flex-col w-full justify-center space-y-6 sm:w-[350px]">
          <>
            <div className="flex flex-col items-center space-y-2 text-center">
              <Icons.logo className="h-20 w-20" />
              <h1 className="text-2xl font-bold">Create an account</h1>
              <Link
                className={buttonVariants({
                  variant: "link",
                  className: "gap-1.5",
                })}
                href="/sign-in"
              >
                {" "}
                Already have and account? Sign In
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {message !== "" && (
              <div className="flex flex-col items-center text-center">
                <p className="text-red-500 text-sm">{message}</p>
              </div>
            )}
          </>
          {!pendingVerification && (
            <>
              <div className="grid gap-6">
                <form>
                  <div className="grid gap-2">
                    <div className="grid gap-1 py-2">
                      <Label htmlFor="firstName"> First Name</Label>
                      <Input
                        className={cn({
                          "focus-visible:ring-red-500": firstName === "",
                        })}
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1 py-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        className={cn({
                          "focus-visible:ring-red-500": lastName === "",
                        })}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1 py-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        className={cn({
                          "focus-visible:ring-red-500": email === "",
                        })}
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1 py-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        className={cn({
                          "focus-visible:ring-red-500": password === "",
                        })}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-1 py-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        type="password"
                        className={cn({
                          "focus-visible:ring-red-500": confirmPassword === "",
                        })}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id="terms1"
                        checked={checked}
                        onCheckedChange={() => setChecked(!checked)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Accept terms and conditions
                        </label>
                        <p className="text-sm text-muted-foreground">
                          You agree to our{" "}
                          <Link
                            href="/terms-of-service"
                            className={cn(
                              buttonVariants({
                                variant: "link",
                              }),
                              "px-0 py-0 h-0"
                            )}
                          >
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="/privacy-policy"
                            className={cn(
                              buttonVariants({
                                variant: "link",
                              }),
                              "px-0 py-0 h-0"
                            )}
                          >
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                    <Button className="mb-6" asChild>
                      <button onClick={(event) => handleSubmit(event)}>
                        Sign Up
                      </button>
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
          {pendingVerification && (
            <div className="flex flex-col items-center space-y-2 text-center">
              <form>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-500": code === "",
                    })}
                    placeholder="Verification Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <Button
                  onClick={(event) => onPressVerify(event)}
                  className="mb-6"
                >
                  Verify Email
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
