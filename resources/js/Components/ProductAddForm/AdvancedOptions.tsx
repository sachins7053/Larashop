import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AdvancedOptions({data, setData} :any) {


  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="brand_id">Brand</Label>
        <Select name="brand" value={data.brand} onValueChange={(e:any) => setData('brand', e.target.value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Brand 1</SelectItem>
            <SelectItem value="2">Brand 2</SelectItem>
            <SelectItem value="3">Brand 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="hsnCode">HSN Code</Label>
        <Input id="hsnCode" name="hsnCode" value={data.hsnCode} onChange={(e:any) => setData('hsnCode', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="cost_per_item">Cost Per Item</Label>
        <Input id="cost_per_item" type="number" step="0.01" name="cost_per_item" value={data.cost_per_item} onChange={(e:any) => setData('cost_per_item', e.target.value)} />
      </div>

      <div>
        <Label htmlFor="minimum_order_quantity">Minimum Order Quantity</Label>
        <Input id="minimum_order_quantity" type="number"  name="minimum_order_quantity" value={data.minimum_order_quantity} onChange={(e:any) => setData('minimum_order_quantity', e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="maximum_order_quantity">Maximum Order Quantity</Label>
        <Input id="maximum_order_quantity" type="number" name="maximum_order_quantity" value={data.maximum_order_quantity} onChange={(e:any) => setData('maximum_order_quantity', e.target.value)}/>
      </div>
    </div>
  )
}

