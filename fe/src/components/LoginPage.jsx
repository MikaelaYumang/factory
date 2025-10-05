import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Factory, Cog } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === "admin@gmail.com" && password === "admin") {
        toast({
          title: "✅ Login Successful",
          description: "Welcome to Factory Control Center",
          className: "bg-green-50 border-green-500 text-green-900",
        });
        setTimeout(() => onLogin(), 500);
      } else {
        toast({
          variant: "destructive",
          title: "❌ Login Failed",
          description: "Invalid credentials. Please try again.",
        });
        setIsLoading(false);
      }
    }, 800);
  };

  // ✅ Generate gears only once and keep their random properties fixed
  const gears = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, i) => ({
        id: i,
        size: 50 + Math.random() * 90,
        left: Math.random() * 100,
        bottom: -(Math.random() * 20 + 20),
        duration: 12 + Math.random() * 8, // ✅ fixed duration
        delay: Math.random() * 10,
        color: ["text-indigo-400", "text-blue-400", "text-cyan-400", "text-slate-400"][
          Math.floor(Math.random() * 4)
        ],
      })),
    []
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-100 p-4">
      {/* Floating Upward Gears */}
      <div className="absolute inset-0 overflow-hidden">
        {gears.map((gear) => (
          <Cog
            key={gear.id}
            className={`absolute opacity-30 ${gear.color} gear`}
            style={{
              width: `${gear.size}px`,
              height: `${gear.size}px`,
              left: `${gear.left}%`,
              bottom: `${gear.bottom}px`,
              animationDuration: `${gear.duration}s`, // ✅ fixed duration
              animationDelay: `${gear.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Static Login Form */}
      <Card className="w-full max-w-md shadow-2xl border border-white/50 bg-white/80 backdrop-blur-2xl z-10 rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center rounded-t-2xl pb-6">
          <div className="flex justify-center mb-3">
            <div className="p-4 bg-white/20 rounded-2xl border border-white/30">
              <Factory className="w-12 h-12 text-white animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">FACTORY CONTROL</CardTitle>
          <p className="text-blue-100 text-sm mt-1">
            Efficiency Monitoring System • SDG 9
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Administrator Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Input Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-12 border-2 focus:border-blue-500 transition-all"
              disabled={isLoading}
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Input Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 h-12 border-2 focus:border-blue-500 transition-all"
              disabled={isLoading}
              onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
            />
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-base shadow-lg disabled:opacity-60"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Authenticating...
              </div>
            ) : (
              "ACCESS DASHBOARD"
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Floating & Spinning Animation */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .gear {
          animation: floatUp linear infinite;
        }
      `}</style>
    </div>
  );
}
