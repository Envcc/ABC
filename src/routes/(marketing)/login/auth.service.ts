
import jwt from 'jsonwebtoken';
import { PRIVATE_SUPABASE_SERVICE_ROLE } from '../../config/envValidation';

// Generate JWT Token for authentication
export function generateToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, PRIVATE_SUPABASE_SERVICE_ROLE, { expiresIn: '1h' });
}

// Verify JWT Token
export function verifyToken(token) {
    try {
        return jwt.verify(token, PRIVATE_SUPABASE_SERVICE_ROLE);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
