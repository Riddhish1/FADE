/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['lh3.googleusercontent.com', 'api.dicebear.com'],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    }
};

export default nextConfig;
