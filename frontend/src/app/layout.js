import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Nitesh Kumar | MERN Stack Developer Portfolio",
  description: "Portfolio of Nitesh Kumar, a senior MERN Stack Developer specializing in React.js, Node.js, Express.js, MongoDB, and modern web application development.",
  keywords: [
    "MERN Stack Developer",
    "Full Stack Developer",
    "React.js Developer",
    "Node.js Developer",
    "Express.js Specialist",
    "MongoDB Database Designer",
    "Software Engineer Portfolio",
    "Nitesh Kumar"
  ],
  authors: [{ name: "Nitesh Kumar" }],
  creator: "Nitesh Kumar",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className="scroll-smooth"
    >
      <body className="font-sans antialiased text-[#334155] bg-white selection:bg-[#0B2C1F] selection:text-white">
        {children}
      </body>
    </html>
  );
}
