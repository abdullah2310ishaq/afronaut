"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Plus, Trash2, Upload, Calendar, MapPin, Users, AlertTriangle, Camera, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Category {
  name: string
  price: string
  capacity: string
  description: string
  benefits: string[]
}

export default function CreateEvent() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    artists: "",
    tags: "",
    image: "",
    venue: "",
    address: "",
    startDate: "",
    endDate: "",
    totalCapacity: [1000],
    isDraft: true,
  })
  const [categories, setCategories] = useState<Category[]>([
    { 
      name: "Standard", 
      price: "50", 
      capacity: "800", 
      description: "General admission with standard amenities",
      benefits: ["Entry to event", "Basic seating"] 
    }
  ])

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agency") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "agency") {
    return null
  }

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", price: "", capacity: "", description: "", benefits: [""] }])
  }

  const handleRemoveCategory = (index: number) => {
    if (categories.length > 1) {
      setCategories(categories.filter((_, i) => i !== index))
    }
  }

  const handleAddBenefit = (categoryIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].benefits.push("")
    setCategories(newCategories)
  }

  const handleRemoveBenefit = (categoryIndex: number, benefitIndex: number) => {
    const newCategories = [...categories]
    newCategories[categoryIndex].benefits = newCategories[categoryIndex].benefits.filter((_, i) => i !== benefitIndex)
    setCategories(newCategories)
  }

  const getTotalCategoryCapacity = () => {
    return categories.reduce((sum, cat) => sum + (parseInt(cat.capacity) || 0), 0)
  }

  const isCapacityExceeded = () => {
    return getTotalCategoryCapacity() > formData.totalCapacity[0]
  }

  const handlePublish = () => {
    toast({
      title: formData.isDraft ? "Event Saved as Draft" : "Event Published! 🎉",
      description: formData.isDraft 
        ? "You can continue editing and publish later" 
        : "Your event is now live and accepting bookings",
    })

    setTimeout(() => {
      router.push("/dashboard/agency")
    }, 2000)
  }

  const stepTitles = [
    "Basic Information",
    "Venue & Timing", 
    "Ticket Categories",
    "Preview & Publish"
  ]

  return (
    <div className="min-h-screen bg-black pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/agency")}
            className="mb-4 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">Create New Event</h1>
          <p className="text-gray-400">Follow the steps to create your perfect event</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    s === step
                      ? "bg-green-600 text-white"
                      : s < step
                        ? "bg-green-600/50 text-white"
                        : "bg-zinc-800 text-gray-400"
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center w-20">{stepTitles[s-1]}</p>
              </div>
              {s < 4 && <div className={`w-24 h-1 mx-4 ${s < step ? "bg-green-600/50" : "bg-zinc-800"}`} />}
            </div>
          ))}
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <div className="p-8">
            {/* Step 1: Basics */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Basic Information</h2>
                  <p className="text-gray-400">Tell us about your event</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-white">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Summer Music Festival 2025"
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your event, what makes it special..."
                      rows={4}
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="artists" className="text-white">Featured Artists</Label>
                      <Input
                        id="artists"
                        value={formData.artists}
                        onChange={(e) => setFormData({ ...formData, artists: e.target.value })}
                        placeholder="DJ Smith, Band XYZ, Singer ABC"
                        className="bg-black border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags" className="text-white">Tags</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="music, festival, outdoor, food"
                        className="bg-black border-zinc-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-white">Event Image</Label>
                    <div className="mt-2 p-6 border-2 border-dashed border-zinc-600 rounded-lg bg-zinc-800/50 text-center">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-400 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                      <Button variant="outline" className="mt-3 border-zinc-600 text-gray-300">
                        Browse Files
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Venue & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Venue & Timing</h2>
                  <p className="text-gray-400">Set the location and schedule</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="venue" className="text-white">Venue Name *</Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Central Park Arena"
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white">Full Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="123 Park Avenue, New York, NY 10001"
                      rows={2}
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate" className="text-white">Start Date & Time *</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="bg-black border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate" className="text-white">End Date & Time *</Label>
                      <Input
                        id="endDate"
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        className="bg-black border-zinc-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">Total Venue Capacity</Label>
                    <div className="mt-4 space-y-4">
                      <Slider
                        value={formData.totalCapacity}
                        onValueChange={(value) => setFormData({ ...formData, totalCapacity: value })}
                        max={10000}
                        min={50}
                        step={50}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>50</span>
                        <span className="text-white font-semibold">{formData.totalCapacity[0]} people</span>
                        <span>10,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Categories */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Ticket Categories</h2>
                    <p className="text-gray-400">Set up different ticket types and pricing</p>
                  </div>
                  <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>

                {/* Capacity Warning */}
                {isCapacityExceeded() && (
                  <Alert className="border-red-600 bg-red-950/50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-red-300">
                      Total category capacity ({getTotalCategoryCapacity()}) exceeds venue capacity ({formData.totalCapacity[0]})
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-6">
                  {categories.map((category, categoryIndex) => (
                    <Card key={categoryIndex} className="bg-zinc-800 border-zinc-700">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-white">
                            Category {categoryIndex + 1}
                          </h3>
                          {categories.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveCategory(categoryIndex)}
                              className="border-red-600 text-red-400 hover:bg-red-950"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <Label className="text-white">Name *</Label>
                            <Input
                              value={category.name}
                              onChange={(e) => {
                                const newCategories = [...categories]
                                newCategories[categoryIndex].name = e.target.value
                                setCategories(newCategories)
                              }}
                              placeholder="VIP, General, Student..."
                              className="bg-black border-zinc-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Price *</Label>
                            <Input
                              value={category.price}
                              onChange={(e) => {
                                const newCategories = [...categories]
                                newCategories[categoryIndex].price = e.target.value
                                setCategories(newCategories)
                              }}
                              placeholder="$50"
                              className="bg-black border-zinc-600 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-white">Capacity *</Label>
                            <Input
                              type="number"
                              value={category.capacity}
                              onChange={(e) => {
                                const newCategories = [...categories]
                                newCategories[categoryIndex].capacity = e.target.value
                                setCategories(newCategories)
                              }}
                              placeholder="100"
                              className="bg-black border-zinc-600 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label className="text-white">Description</Label>
                            <Textarea
                              value={category.description}
                              onChange={(e) => {
                                const newCategories = [...categories]
                                newCategories[categoryIndex].description = e.target.value
                                setCategories(newCategories)
                              }}
                              placeholder="What's included in this ticket category..."
                              rows={2}
                              className="bg-black border-zinc-600 text-white"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-white">Benefits</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAddBenefit(categoryIndex)}
                                className="border-zinc-600"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Benefit
                              </Button>
                            </div>
                            {category.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex gap-2 mb-2">
                                <Input
                                  value={benefit}
                                  onChange={(e) => {
                                    const newCategories = [...categories]
                                    newCategories[categoryIndex].benefits[benefitIndex] = e.target.value
                                    setCategories(newCategories)
                                  }}
                                  placeholder="Access to VIP lounge, Free drinks..."
                                  className="bg-black border-zinc-600 text-white"
                                />
                                {category.benefits.length > 1 && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleRemoveBenefit(categoryIndex, benefitIndex)}
                                    className="border-zinc-600 text-red-400"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Preview & Publish</h2>
                  <p className="text-gray-400">Review your event details before publishing</p>
                </div>

                <div className="space-y-6">
                  {/* Event Preview Card */}
                  <Card className="bg-zinc-800 border-zinc-700">
                    <div className="p-6">
                      <div className="flex gap-6">
                        <div className="w-48 h-32 bg-zinc-700 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{formData.title || "Untitled Event"}</h3>
                          <div className="space-y-2 text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "No date set"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{formData.venue || "No venue set"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{formData.totalCapacity[0]} capacity</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-4">{formData.description || "No description provided"}</p>
                    </div>
                  </Card>

                  {/* Categories Summary */}
                  <Card className="bg-zinc-800 border-zinc-700">
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Ticket Categories</h4>
                      <div className="space-y-3">
                        {categories.map((category, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-zinc-900 rounded-lg">
                            <div>
                              <span className="text-white font-medium">{category.name || `Category ${index + 1}`}</span>
                              <span className="text-gray-400 ml-2">({category.capacity || 0} spots)</span>
                            </div>
                            <span className="text-green-400 font-semibold">{category.price || "$0"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Publish Options */}
                  <Card className="bg-zinc-800 border-zinc-700">
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Publish Options</h4>
                      <div className="flex items-center space-x-2 mb-4">
                        <Switch
                          id="draft"
                          checked={formData.isDraft}
                          onCheckedChange={(checked) => setFormData({ ...formData, isDraft: checked })}
                        />
                        <Label htmlFor="draft" className="text-white">Save as draft</Label>
                      </div>
                      <p className="text-sm text-gray-400">
                        {formData.isDraft 
                          ? "Save as draft to continue editing later" 
                          : "Publish immediately to make your event live and accepting bookings"}
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-800">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="border-zinc-600 text-gray-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-400">
                Step {step} of 4
              </div>

              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={
                    (step === 1 && (!formData.title || !formData.description)) ||
                    (step === 2 && (!formData.venue || !formData.startDate || !formData.endDate)) ||
                    (step === 3 && (categories.some(cat => !cat.name || !cat.price || !cat.capacity) || isCapacityExceeded()))
                  }
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handlePublish}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={
                    !formData.title || !formData.description || !formData.venue || 
                    !formData.startDate || !formData.endDate ||
                    categories.some(cat => !cat.name || !cat.price || !cat.capacity) ||
                    isCapacityExceeded()
                  }
                >
                  {formData.isDraft ? "Save Draft" : "Publish Event"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
