"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAuthStore } from "@/stores/auth-store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Plus, Trash2 } from "lucide-react"

interface Category {
  name: string
  price: string
  capacity: string
}

export default function CreateEvent() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    location: "",
    image: "",
  })
  const [categories, setCategories] = useState<Category[]>([{ name: "", price: "", capacity: "" }])

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "agency") {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "agency") {
    return null
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", price: "", capacity: "" }])
  }

  const handleRemoveCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index))
  }

  const handlePublish = () => {
    // Mock publish
    alert("Event created successfully!")
    router.push("/dashboard/agency")
  }

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
          <p className="text-gray-400">Fill in the details to create your event</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s === step
                    ? "bg-green-600 text-white"
                    : s < step
                      ? "bg-green-600/50 text-white"
                      : "bg-zinc-800 text-gray-400"
                }`}
              >
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 3 && <div className={`w-24 h-1 ${s < step ? "bg-green-600/50" : "bg-zinc-800"}`} />}
            </div>
          ))}
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <div className="p-8">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-white">
                      Event Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Summer Music Festival 2025"
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your event..."
                      rows={4}
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date" className="text-white">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-black border-zinc-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-white">
                        Time
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="bg-black border-zinc-700 text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Venue */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Venue Details</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="venue" className="text-white">
                      Venue Name
                    </Label>
                    <Input
                      id="venue"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      placeholder="Central Park Arena"
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="New York, NY"
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="image" className="text-white">
                      Event Image URL
                    </Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="bg-black border-zinc-700 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Categories */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Ticket Categories</h2>
                  <Button
                    onClick={handleAddCategory}
                    variant="outline"
                    className="border-green-600 text-green-400 hover:bg-green-600/10 bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>

                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <Card key={index} className="bg-black border-zinc-800 p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-4">
                          <div>
                            <Label className="text-white">Category Name</Label>
                            <Input
                              value={category.name}
                              onChange={(e) => {
                                const newCategories = [...categories]
                                newCategories[index].name = e.target.value
                                setCategories(newCategories)
                              }}
                              placeholder="VIP Pass"
                              className="bg-zinc-900 border-zinc-700 text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Price ($)</Label>
                              <Input
                                type="number"
                                value={category.price}
                                onChange={(e) => {
                                  const newCategories = [...categories]
                                  newCategories[index].price = e.target.value
                                  setCategories(newCategories)
                                }}
                                placeholder="99.00"
                                className="bg-zinc-900 border-zinc-700 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Capacity</Label>
                              <Input
                                type="number"
                                value={category.capacity}
                                onChange={(e) => {
                                  const newCategories = [...categories]
                                  newCategories[index].capacity = e.target.value
                                  setCategories(newCategories)
                                }}
                                placeholder="500"
                                className="bg-zinc-900 border-zinc-700 text-white"
                              />
                            </div>
                          </div>
                        </div>

                        {categories.length > 1 && (
                          <Button
                            onClick={() => handleRemoveCategory(index)}
                            variant="ghost"
                            size="icon"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800">
              <Button
                onClick={handleBack}
                variant="outline"
                disabled={step === 1}
                className="border-zinc-700 hover:border-green-500 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {step < 3 ? (
                <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  Publish Event
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
