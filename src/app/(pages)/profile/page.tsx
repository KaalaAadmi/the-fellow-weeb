// import React from "react";
// import { UserProfile } from "@clerk/nextjs";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// const ProfilePage = () => {
//   return (
//     <>
//       <MaxWidthWrapper>
//         <div className="flex justify-center items-center">
//           <UserProfile />
//         </div>
//       </MaxWidthWrapper>
//     </>
//   );
// };

// export default ProfilePage;
"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// import { useForm } from "react-hook-form";
// import { useUser } from "@clerk/nextjs";

// import { useRouter } from "next/navigation";
// import MaxWidthWrapper from "@/components/MaxWidthWrapper";

// const AdditionalUpdate = () => {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const { isLoaded, isSignedIn, user } = useUser();

//   const onSubmit = (data) => {
//     try {
//       user.update({
//         firstName: data.firstName,
//         lastName: data.lastName,
//         unsafeMetadata: {
//           customName: data.customName,
//           customBio: data.customBio,
//         },
//       });

//       router.push("/view");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (!isLoaded || !isSignedIn) {
//     return null;
//   }

//   return (
//     <MaxWidthWrapper>
//       <div className="mx-10">
//         <h1 className="py-4 text-2xl font-bold">
//           Update Additional Information
//         </h1>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label
//               className="mb-2 block text-sm font-bold text-gray-700"
//               htmlFor="firstName"
//             >
//               First Name
//             </label>
//             <input
//               defaultValue={user.firstName}
//               {...register("firstName", {
//                 required: true,
//               })}
//               className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
//             />
//             {errors.firstName && (
//               <span className="text-sm text-red-600">
//                 This field is required
//               </span>
//             )}
//           </div>
//           <div>
//             <label
//               className="mb-2 block text-sm font-bold text-gray-700"
//               htmlFor="lastName"
//             >
//               Last Name
//             </label>
//             <input
//               defaultValue={user.lastName}
//               {...register("lastName", {
//                 required: true,
//               })}
//               className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
//             />
//             {errors.lastName && (
//               <span className="text-sm text-red-600">
//                 This field is required
//               </span>
//             )}
//           </div>
//           <div>
//             <label
//               className="mb-2 block text-sm font-bold text-gray-700"
//               htmlFor="customName"
//             >
//               Custom Name
//             </label>
//             <input
//               defaultValue={user.unsafeMetadata.customName}
//               {...register("customName", {
//                 required: true,
//               })}
//               className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
//             />
//             {errors.customName && (
//               <span className="text-sm text-red-600">
//                 This field is required
//               </span>
//             )}
//           </div>
//           <div className="mt-4">
//             <label
//               className="mb-2 block text-sm font-bold text-gray-700"
//               htmlFor="customBio"
//             >
//               Custom Bio
//             </label>
//             <textarea
//               rows={6}
//               defaultValue={user.unsafeMetadata.customBio}
//               {...register("customBio", {
//                 required: true,
//               })}
//               className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
//             ></textarea>
//             {errors.customBio && (
//               <span className="text-sm text-red-600">
//                 This field is required
//               </span>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="my-4 bg-purple-500 px-8 py-2 text-lg font-semibold text-white transition-all hover:bg-purple-700"
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </MaxWidthWrapper>
//   );
// };

// export default AdditionalUpdate;

import { useUser } from "@clerk/nextjs";

import Image from "next/image";

import Link from "next/link";

const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  console.log(user);

  return (
    <MaxWidthWrapper>
      <div className="container mx-auto">
        <div className="flex">
          <div className="mx-4">
            <Image
              src={user?.profileImageUrl}
              width={250}
              height={250}
              alt={user.fullName}
              className="rounded-lg"
            />
          </div>
          <div className="ml-4">
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block w-full overflow-hidden rounded-lg shadow-md">
                <table className="w-full leading-normal">
                  <tbody>
                    {/* Firstname */}
                    <tr>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        First Name
                      </td>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        {user.firstName}
                      </td>
                    </tr>
                    {/* Last Name */}
                    <tr>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        Last Name
                      </td>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        {user.lastName}
                      </td>
                    </tr>
                    {/* Emails */}
                    <tr>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        Emails
                      </td>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        {user.emailAddresses.map((email) => (
                          <div key={email.emailAddress}>
                            {email.emailAddress},{" "}
                          </div>
                        ))}
                      </td>
                    </tr>
                    {/* Unsafe Metadata Example */}
                    <tr>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        Custom Name
                      </td>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        {user.unsafeMetadata.customName}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        Custom Bio
                      </td>
                      <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                        {user.unsafeMetadata.customBio}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href={"/additional"}>
                <button className="mt-4 bg-purple-600 px-4 py-2 font-bold text-white transition-all hover:bg-purple-800">
                  Update Additional Information
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ViewProfile;
