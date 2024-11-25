
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReactEventHandler } from "react"

export function DimensionsAndShipping({data, setData}:any) {


  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="length">Length</Label>
        <Input id="length" type="number" name="length" value={data.length} onChange={(e:any) => setData('length', e.target.value)} step="0.01" />
      </div>
      <div>
        <Label htmlFor="wide">Width</Label>
        <Input id="wide" type="number" name="wide" value={data.wide} onChange={(e:any) => setData('width', e.target.value)} step="0.01" />
      </div>
      <div>
        <Label htmlFor="height">Height</Label>
        <Input id="height" type="number" name="heigth" value={data.height} onChange={(e:any) => setData('height', e.target.value)} step="0.01"  />
      </div>
      <div>
        <Label htmlFor="weight">Weight</Label>
        <Input id="weight" type="number" name="weight" value={data.weight} onChange={(e:any) => setData('weight', e.target.value)} step="0.01" />
      </div>
    </div>
  )
}

