
import { verifyToken } from '../routes/(marketing)/login/auth.service';

export function requireRole(requiredRole) {
    return async ({ request, locals }, next) => {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        try {
            const user = verifyToken(token);
            if (user.role !== requiredRole) {
                return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
            }
            locals.user = user; // Store user info in request context
            return next();
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 403 });
        }
    };
}
