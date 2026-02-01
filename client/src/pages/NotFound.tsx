import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-6">
      <div className="max-w-md text-center space-y-6">
        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
          404 Error
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-apl-primary">
          Page not found
        </h1>

        <p className="text-base text-muted-foreground">
          Sorry, the page you’re looking for doesn’t exist or may have been
          moved.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-foreground bg-apl-primary hover:opacity-90 transition"
          >
            Go back home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
