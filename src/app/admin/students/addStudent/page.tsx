"use client"
import { useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  User,
  CheckCircle,
  Save,
  Eye,
  EyeOff,
  Check,
  Loader2,
  Home,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCreateStudentMutation } from '@/store/api/studentApi'

export default function AddStudentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [createStudent, { error, isSuccess }] = useCreateStudentMutation()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    bio: '',
    password: '',
    confirmPassword: '',
  })

  const steps = [
    { id: 1, title: 'Personal Information', icon: User },
    { id: 2, title: 'Address & Account', icon: Home },
    { id: 3, title: 'Review & Submit', icon: CheckCircle },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        bio: formData.bio,
      }
      await createStudent(submissionData).unwrap()

      setTimeout(() => {
        router.push('/admin/students')
      }, 1500)
    } catch (err) {
      console.error('Failed to create student:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email
      case 2:
        return (
          formData.address &&
          formData.city &&
          formData.country &&
          formData.password &&
          formData.password.length >= 6 &&
          formData.password === formData.confirmPassword
        )
      case 3:
        return true
      default:
        return false
    }
  }

  function getErrorMessage(error: unknown): string | null {
    if (!error) return null;
    if (typeof error === 'string') return error;
    if ('status' in (error as {status:number}) && 'data' in (error as {data:unknown})) {
      const errorData = (error as {data:unknown}).data as {message:string};
      if (errorData && typeof errorData.message === 'string') {
        return errorData.message;
    }
  }
    return 'An unexpected error occurred. Please try again.';
  }

  const errorMsg = getErrorMessage(error)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => router.back()} className="p-2 text-gray-600 hover:text-blue-700 rounded-lg hover:bg-gray-100 transition-all duration-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-2">Add New Student</h1>
            <p className="text-gray-600">Create a new student account with their profile details</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center space-x-3 ${ currentStep >= step.id ? 'text-blue-600' : 'text-gray-400' }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${ currentStep >= step.id ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-blue-600 text-white' : 'border-gray-300 bg-white' }`}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{step.title}</p>
              </div>
            </div>
            {index < steps.length - 1 && ( <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${ currentStep > step.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300' }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="p-8">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <textarea name="bio" placeholder="Short Bio" value={formData.bio} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" rows={4} />
            </div>
          )}

          {/* Step 2: Address & Account */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <input name="address" placeholder="Street Address *" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="city" placeholder="City *" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input name="state" placeholder="State / Province" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="zipCode" placeholder="ZIP / Postal Code" value={formData.zipCode} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                <input name="country" placeholder="Country *" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password *" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPassword ? <EyeOff /> : <Eye />}</button>
                </div>
                <input type="password" name="confirmPassword" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-bold text-blue-700">Review Details</h3>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Address:</strong> {`${formData.address || ''}, ${formData.city || ''}, ${formData.state || ''} ${formData.zipCode || ''}, ${formData.country || ''}`.replace(/ ,/g, '').trim()}</p>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100">
            <button onClick={prevStep} disabled={currentStep === 1} className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-blue-700 disabled:opacity-50 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
            </button>
            <div className="flex items-center space-x-3">
                {currentStep < steps.length ? (
                    <button onClick={nextStep} disabled={!isStepValid(currentStep)} className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-transform hover:scale-105">
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-transform hover:scale-105">
                        {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
                        <span>{isSubmitting ? 'Creating Account...' : 'Create Student Account'}</span>
                    </button>
                )}
            </div>
        </div>
        {(errorMsg || isSuccess) && (
          <div className="p-4 text-center">
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            {isSuccess && <p className="text-green-500">Student created successfully! Redirecting...</p>}
          </div>
        )}
      </div>
    </div>
  )
}
