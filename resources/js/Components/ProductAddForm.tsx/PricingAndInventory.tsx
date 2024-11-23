import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function PricingAndInventory({data, setData}:any) {
  

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input id="sku" name="sku" value={data.sku} onChange={(e:any) => setData('sku', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" type="number" name="price" value={data.price} onChange={(e:any) => setData('price', e.target.value)} step="0.01"  />
      </div>
      <div>
        <Label htmlFor="sale_price">Sale Price</Label>
        <Input id="sale_price" type="number" name="sale_price" value={data.sale_price} onChange={(e:any) => setData('sale_price', e.target.value)} step="0.01"  />
      </div>
      <div>
        <Label htmlFor="start_date">Sale Start Date</Label>
        <Input type="date" name="sale_start_date" value={data.sale_start_date} onChange={(e:any) => setData('sale_start_date', e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="end_date">Sale End Date</Label>
        <Input type="date" name="sale_end_date" value={data.sale_end_date} onChange={(e:any) => setData('sale_end_date', e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" name="quantity" value={data.quantity} onChange={(e:any) => setData('quantity', e.target.value)}/>
      </div>
    </div>
  )
}

