

import { JwtPayload } from "jsonwebtoken";

export interface AuthUser extends JwtPayload {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "OWNER" | "SITTER";
    status: "ACTIVE" | "SUSPENDED";
}

declare global {
    namespace Express {
        interface Request {
            user?: AuthUser;
        }
    }
}