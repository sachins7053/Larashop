import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"

  const saleConfig = {
    topProducts: {
      label: "Sale Report",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  const ProductConfig = {

    topVendors: {
      label: "Top Products",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  const VendorConfig = {

    TopVendors: {
      label: "Top Vendors",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig

interface DashboardProps { 
    salesReport: Array<{ id: number; order_number: string; total_amount: number }>; 
    topProducts: Array<{ product_id: number; total_quantity: number }>; 
    topVendors: Array<{ vendor_id: number; total_sales: number }>; 
}

export default function Dashboard({ salesReport, topProducts, topVendors }: DashboardProps) {

    console.log("salesReport",salesReport);
    console.log('Top Products',topProducts);
    console.log('Top Vendor',topVendors);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className='mt-6 space-y-10 mx-auto max-w-7xl sm:px-6 lg:px-8"'>
                <Card> 
                    <CardHeader>Sales Report</CardHeader> 
                    <CardContent>
                        <ChartContainer config={saleConfig}>
                            <BarChart
                                accessibilityLayer
                                data={salesReport}
                                margin={{
                                top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="created_at"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="total_amount" fill="#facc15" radius={8}>
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                        {/* <BarChart data={salesReport} />  */}
                    </CardContent> 
                </Card> 
                
                <Card> 
                    <CardHeader>Top Selling Products</CardHeader> 

                    <CardContent> 
                    <ChartContainer config={ProductConfig}>
                            <BarChart
                                accessibilityLayer
                                data={topProducts}
                                margin={{
                                top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="product_name"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="quantity_sold" fill="#facc15" radius={8}>
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent> 
                </Card> 
                
                <Card> 
                    <CardHeader>Top Vendors</CardHeader> 
                    <CardContent> 
                    <ChartContainer config={VendorConfig}>
                            <BarChart
                                accessibilityLayer
                                data={salesReport}
                                margin={{
                                top: 20,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                dataKey="created_at"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                                />
                                <Bar dataKey="total_amount" fill="#facc15" radius={8}>
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                                </Bar>
                            </BarChart>
                        </ChartContainer>
                    </CardContent> 
                </Card>
            </div>

            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                            <Button>Profile</Button>
                        </div>
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
