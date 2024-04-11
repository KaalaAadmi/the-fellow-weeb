import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductSection from "@/components/ProductSection";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
	{
		name: "Instant Delivery",
		Icon: ArrowDownToLine,
		description:
			"Get your assets delivered to your email in seconds and download them right away",
	},
	{
		name: "Guranteed Quality",
		Icon: CheckCircle,
		description:
			"Every asset on our platform is verified by our team to ensure the highest standards. Not happy? We offer a 30-day refund gurantee.",
	},
	{
		name: "For the Planet",
		Icon: Leaf,
		description:
			"We've pledged 1% of sales to the preservation and restoration of the natural environment.",
	},
];

export default function Home() {
	return (
		<>
			<MaxWidthWrapper>
				{/* <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
						Your marketplace for high-quality{" "}
						<span className="text-blue-600">anime merchandise</span>.
					</h1>
					<p className="mt-6 text-lg max-w-prose text-muted-foreground">
						Welcome to Fellow Weeb. Every product on our platform is verified by
						our team to ensure the highest quality standards.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 mt-6">
						<Link href="/products" className={buttonVariants()}>
							Browse Trending
						</Link>
						<Button variant={"ghost"}>Our quality promise &rarr;</Button>
					</div>
				</div> */}
				<div className="relative overflow-hidden bg-white">
					<div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
						<div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
							<div className="sm:max-w-lg">
								<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
									Your marketplace for high-quality{" "}
									<span className="text-blue-600">anime merchandise</span>.
								</h1>
								<p className="mt-6 text-lg max-w-prose text-muted-foreground">
									Welcome to Fellow Weeb. Every product on our platform is
									verified by our team to ensure the highest quality standards.
								</p>
							</div>
							<div>
								<div className="mt-10">
									{/* Decorative image grid */}
									<div
										aria-hidden="true"
										className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
									>
										<div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
											<div className="flex items-center space-x-6 lg:space-x-8">
												<div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
													<div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
													<div className="h-64 w-44 overflow-hidden rounded-lg">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
												</div>
												<div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
													<div className="h-64 w-44 overflow-hidden rounded-lg">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
													<div className="h-64 w-44 overflow-hidden rounded-lg">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
													<div className="h-64 w-44 overflow-hidden rounded-lg">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
												</div>
												<div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
													<div className="h-64 w-44 overflow-hidden rounded-lg">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
													<div className="h-64 w-44 overflow-hidden rounded-lg">
														<img
															src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
															alt=""
															className="h-full w-full object-cover object-center"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="flex flex-col sm:flex-row gap-4 mt-6">
										<Link href="/products" className={cn(buttonVariants(),"sm:w-2/4")}>
											Browse Trending
										</Link>
										<Button
											variant={"ghost"}
											// className="rounded-md border border-transparent bg-gray-300 px-8 py-3 text-center font-medium text-white hover:bg-gray-700"
										>
											Our quality promise &rarr;
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* TODO: List products */}
				{/* <ProductReel href="/products" title="Brand New" /> */}
				<ProductSection href="/products" title="Brand New" />
			</MaxWidthWrapper>

			<section className="border-t border-gray-200 bg-gray-50">
				<MaxWidthWrapper className="py-20">
					<div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
						{perks.map((perk) => (
							<div
								key={perk.name}
								className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
							>
								<div className="md:flex-shrink-0 flex justify-center">
									<div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
										{<perk.Icon className="w-1/3 h-1/3" />}
									</div>
								</div>
								<div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
									<h3 className="text-base font-medium text-gray-900">
										{perk.name}
									</h3>
									<p className="mt-3 text-sm text-muted-foreground">
										{perk.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</MaxWidthWrapper>
			</section>
		</>
	);
}
