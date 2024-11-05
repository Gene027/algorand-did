"use client";

import { ChangeEvent, useState } from "react";
import { axiosInstanceDIDServer, useAuthActions } from "../../actions/auth";
import toast from "react-hot-toast";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { SelectDropdown } from "../../components/SelectDropdown";
import { GenerateDIDRes } from "./interface/did.interface";


interface FormInput {
  value: string;
  error: string;
  touched: boolean;
}

interface RegFormData {
  name: FormInput;
  email: FormInput;
  dateOfBirth: FormInput;
  gender: FormInput;
  address: FormInput;
  digitalId: FormInput;
}

interface RegData {
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  digitalId: string;
  address: string;
}

const initialData: FormInput = {
  value: "",
  error: "",
  touched: false,
};

export default function SignUp() {
  const { signUp } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Creating DID");
  const { push } = useRouter();
  const [formData, setFormData] = useState<RegFormData>({
    email: initialData,
    name: initialData,
    dateOfBirth: initialData,
    address: initialData,
    gender: initialData,
    digitalId: initialData,
  });

  const submit = async () => {
    if (loading) return;
    if (Object.values(formData).some((data) => !data.value || !!data.error)) {
      toast.error("Please fill all fields correctly");
      return;
    }

    setLoading(true);
    const payload: RegData = {
      email: formData.email.value,
      name: formData.name.value,
      dateOfBirth: formData.dateOfBirth.value,
      address: formData.address.value,
      digitalId: formData?.digitalId?.value || "",
      gender: formData.gender.value,
    };

    let res: GenerateDIDRes| null = null;

    try {
      res = (
        await axiosInstanceDIDServer.post("/v1/did/generate", {
          ...payload,
        })
      ).data;
    } catch (error: any) {
      console.log("Error querying surrogate server:", error);
    }

    if (!res?.did) {
      toast.error("Failed to create DID");
      setLoading(false);
      return;
    }

    setLoadingMessage("Creating Account");

    const response = await signUp({
      ...payload,
      did: res.did,
      appId: res.appID,
      walletAddress: res.walletAddress,
      walletMnemonic: res.mnemonic,
    });

    if (response) {
      toast.success("Account created successfully");

      setTimeout(() => {
        push(`/profile/${response.id}`);
      }, 1000);
    }

    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: eventName, value } = e.target;
    if (eventName === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value && formData.email.touched) {
        setFormData({
          ...formData,
          email: { error: "Email is required", value, touched: true },
        });
        return;
      }

      if (value && !emailRegex.test(value)) {
        setFormData({
          ...formData,
          email: { error: "Invalid email address", value, touched: true },
        });
        return;
      } else {
        setFormData({
          ...formData,
          email: { error: "", value, touched: true },
        });
      }
    } else {
      if (!value && (formData as any)[eventName].touched) {
        setFormData({
          ...formData,
          [eventName]: { error: `Field is required`, value, touched: true },
        });
        return;
      } else {
        setFormData({
          ...formData,
          [eventName]: { error: "", value, touched: true },
        });
      }
    }
  };

  return (
    <main className="w-full min-h-full justify-center items-center flex flex-col relative px-32 py-20">
      <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
        <div className="flex flex-col items-center gap-12 w-full">
          <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col items-start gap-3">
              <h4 className="text-[#002a3e] font-sans text-4xl font-bold text-center">
                Welcome to Decentralised Identity Registration
              </h4>
              <p className="text-[#6d7f8b] font-semibold text-2xl text-center">
                Create your account
              </p>
            </div>
            <div className="grid grid-cols-2 w-full gap-4">
              <Input
                name="name"
                autoComplete="off"
                type="text"
                inputLabel="Full Name"
                placeholder="Enter your full name"
                value={formData.name.value}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={formData.name.error}
              />

              <Input
                name="email"
                type="email"
                inputLabel="Email"
                placeholder="Enter your email address"
                value={formData.email.value}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={formData.email.error}
              />

              <Input
                name="dateOfBirth"
                type="date"
                inputLabel="Date of Birth"
                placeholder="Enter your date of birth"
                value={formData.dateOfBirth.value}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={formData.dateOfBirth.error}
              />

              <div className="flex flex-col gap-3">
                <label className="font-medium text-xl text-gray-800">
                  {"Select gender"}
                </label>
                <SelectDropdown
                  data={["Male", "Female", "Other"]}
                  value={formData.gender.value}
                  placeholder="Select gender"
                  onChange={(value) => {
                    setFormData({
                      ...formData,
                      gender: { error: "", value, touched: true },
                    });
                  }}
                />
              </div>

              <Input
                name="address"
                type="text"
                inputLabel="Address"
                placeholder="Enter your address"
                value={formData.address.value}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={formData.address.error}
              />

              <Input
                name="digitalId"
                type="text"
                inputLabel="Digital ID"
                placeholder="Enter your digital ID"
                value={formData.digitalId.value}
                onChange={(e) => {
                  handleChange(e);
                }}
                error={formData.digitalId.error}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-12">
          <Button
            disabled={Object.values(formData).some(
              (data) => !data.value || !!data.error
            )}
            size="lg"
            onClick={() => submit()}
            isLoading={loading}
          >
            {loading ? loadingMessage : "Sign Up"}
          </Button>

          {/* <div className="text-xl text-[#6d7f8b]">
            Already have an account? <Link href="/auth/log-in">Log in</Link>
          </div> */}
        </div>
      </div>
    </main>
  );
}
