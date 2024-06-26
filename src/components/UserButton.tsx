"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// Import useUser() and useClerk()
import { useUser, useClerk } from "@clerk/nextjs";
// Import Next's router
import { useRouter } from "next/navigation";
// Import the Image element
import Image from "next/image";
// Import Link to add more buttons to the menu
import Link from "next/link";

const UserButton = () => {
  // Grab the `isLoaded` and `user` from useUser()
  const { isLoaded, user } = useUser();
  // Grab the signOut and openUserProfile methods
  const { signOut, openUserProfile } = useClerk();
  // Get access to Next's router
  const router = useRouter();
  console.log(user);
  // Make sure that the useUser() hook has loaded
  if (!isLoaded) return null;
  // Make sure there is valid user data
  if (!user?.id) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {/* Render a button using the image and email from `user` */}
        <button
        //   className="flex flex-row rounded-xl border border-gray-200 bg-white px-4 py-3 text-black drop-shadow-md"
        >
          <Image
            alt={user?.primaryEmailAddress?.emailAddress!}
            src={user?.imageUrl}
            width={30}
            height={30}
            className="mr-2 rounded-full border border-gray-200 drop-shadow-sm"
          />
          {/* {user?.username
            ? user.username
            : user?.primaryEmailAddress?.emailAddress!} */}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-6 w-64 rounded-xl border border-gray-200 bg-white px-6 py-4 text-black drop-shadow-2xl">
          <DropdownMenu.Label />
          <DropdownMenu.Group className="py-3">
            <div className="flex justify-center items-center mb-4">
              <Image
                alt={user?.primaryEmailAddress?.emailAddress!}
                src={user?.imageUrl}
                width={60}
                height={60}
                className="mr-2 rounded-full border border-gray-200 drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="flex flex-col mb-4">
                <DropdownMenu.Item className="capitalize font-bold text-gray-500">
                  {" "}
                  {user?.fullName}{" "}
                </DropdownMenu.Item>
                <DropdownMenu.Item className="text-gray-500">
                  {" "}
                  {user?.primaryEmailAddress?.emailAddress!}{" "}
                </DropdownMenu.Item>
              </div>
              <DropdownMenu.Separator className=" h-px bg-gray-300" />

              <DropdownMenu.Item asChild>
                {/* Create a button with an onClick to open the User Profile modal */}
                {/* <button onClick={() => openUserProfile()} className=""> */}
                <Link href="/profile">Profile</Link>
                {/* </button> */}
              </DropdownMenu.Item>
            </div>
          </DropdownMenu.Group>
          <DropdownMenu.Separator className=" h-px bg-gray-300" />
          <DropdownMenu.Item asChild>
            {/* Create a Sign Out button -- signOut() takes a call back where the user is redirected */}
            <button
              onClick={() => signOut(() => router.push("/"))}
              className="py-3"
            >
              Sign Out{" "}
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserButton;
