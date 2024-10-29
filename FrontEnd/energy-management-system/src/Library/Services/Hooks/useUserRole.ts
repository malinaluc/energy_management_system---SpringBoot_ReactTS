import { useEffect, useState } from "react";

export const useUserRole = () => {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = sessionStorage.getItem("userRole");
        
        setRole(storedRole);
    }, []);

    return role;
};