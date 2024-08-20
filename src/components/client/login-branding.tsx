export function LoginBranding() {
    return (
      <section className="h-screen hidden md:flex items-center justify-center bg-gradient-to-r from-fuchsia-600 to-purple-600 relative">
        <img
          src="/assets/cloud-top.svg"
          alt="clouds figure"
          className="absolute top-0"
        />
        <img
          src="/assets/cloud-bottom.svg"
          alt="clouds figure"
          className="absolute bottom-0"
        />
      </section>
    );
  }