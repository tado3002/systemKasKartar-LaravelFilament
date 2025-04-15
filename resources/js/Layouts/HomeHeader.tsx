import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";

export const HomeHeader = () => {
    const { theme, setTheme } = useTheme();

    const isDark = theme === "dark";
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <a>
                    <img
                        src={
                            theme === "dark"
                                ? "/logoKartarDark.png"
                                : "/logoKartarLight.png"
                        }
                        alt="Suryowongso Logo"
                        className="h-14"
                    />
                </a>
                <div className="flex gap-4">
                    {/*toggle theme*/}
                    <div
                        onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
                    >
                        {isDark ? (
                            <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
                        ) : (
                            <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
                        )}
                    </div>
                    {/*city search*/}
                    <a href="http://localhost:8000/admin">
                        <Button variant={"outline"} size={"icon"}>
                            <User className="h-6 w-6" />
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
};
