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

  // Generate gears with staggered start times
  const gears = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        size: 60 + Math.random() * 100,
        left: Math.random() * 100,
        bottom: -(Math.random() * 30 + 30),
        duration: 10 + Math.random() * 6,
        delay: i * 0.8, // Staggered start - gears appear one after another
        color: ["text-blue-400", "text-green-400", "text-cyan-400", "text-indigo-400"][
          Math.floor(Math.random() * 4)
        ],
      })),
    []
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 p-4">
      {/* Floating Upward Gears */}
      <div className="absolute inset-0 overflow-hidden">
        {gears.map((gear) => (
          <Cog
            key={gear.id}
            className={`absolute ${gear.color} gear`}
            style={{
              width: `${gear.size}px`,
              height: `${gear.size}px`,
              left: `${gear.left}%`,
              bottom: `-${gear.size + 50}px`, // Start completely below viewport
              animationDuration: `${gear.duration}s`,
              animationDelay: `${gear.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Static Login Form */}
      <Card className="w-full max-w-md shadow-2xl border-0 bg-transparent z-10 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-center pb-8 pt-8 rounded-t-2xl">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-700 rounded-xl">
              <Factory className="w-10 h-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-black tracking-tight">FACTORY CONTROL</CardTitle>
          <p className="text-white/90 text-sm mt-2 font-medium">
            Efficiency Monitoring System
          </p>
        </CardHeader>

        <CardContent className="p-8 space-y-6 bg-white/95 backdrop-blur-xl rounded-b-2xl">
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
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold text-base shadow-lg disabled:opacity-60"
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

      {/* Enhanced Floating & Spinning Animation */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          15% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-110vh) rotate(720deg);
            opacity: 0;
          }
        }

        .gear {
          animation: floatUp linear infinite;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }
      `}</style>
    </div>
  );
}