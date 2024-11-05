"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthActions } from "../../../actions/auth";
import { User } from "../../(signup)/interface/user.interface";
import { FaSpinner } from "react-icons/fa";
import { Button } from "../../../components/Button";

export default function Profile({ params }: { params: { id: string } }) {
  const { getProfile } = useAuthActions();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { push } = useRouter();

  const fetchProfile = async () => {
    setLoading(true);
    if (!params.id) {
      return;
    }
    const response = await getProfile(params.id);
    if (response) {
      setUser(response);
    } else {
      toast.error("User not found");
      push("/");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [params.id]);

  if (loading) {
    return (
      <main className="w-screen min-h-screen justify-center items-center flex relative px-32 py-20">
        <FaSpinner className="animate-spin h-12 w-12 text-[#002a3e]" />
      </main>
    );
  } else if (user) {
    return (
      <main className="w-full min-h-screen justify-center items-center flex flex-col relative px-32 py-20">
        <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
          <div className="flex flex-col items-center gap-12 w-full">
            <div className="w-full flex flex-col gap-10">
              <div className="flex flex-col items-start gap-3">
                <h4 className="text-[#002a3e] font-sans text-4xl font-bold text-center">
                  {`Welcome ${user?.name}`}
                </h4>
                {user?.did ? (
                  <div className="text-[#6d7f8b] font-semibold text-2xl max-w-3xl flex flex-col">
                    <div>Your DID is:</div>
                    <div className="text-[#002a3e] font-bold text-lg">
                      {user.did}
                    </div>
                  </div>
                ) : (
                  <p className="text-[#6d7f8b] font-semibold text-2xl text-center">
                    Please ensure to fund your wallet and create your DID
                  </p>
                )}
              </div>

              <div className="flex w-full justify-between">
                <a
                  href="https://dispenser.testnet.aws.algodev.network"
                  target="_blank"
                >
                  <Button>Fund Wallet</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return null;
}
