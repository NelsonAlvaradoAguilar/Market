// Simple subscription guard
export default function SubscribedRoute({ user, children }) {
  const isActive = user?.subscription_status === "active";
  if (!user) return <div>Please log in.</div>;
  if (!isActive)
    return <div>You need a Monthly Box subscription to see this.</div>;
  return children;
}
