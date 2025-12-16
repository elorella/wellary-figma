import { ProfileDropdown } from "./ProfileDropdown";

interface MyListsProps {
  isSidebarCollapsed: boolean;
  onSidebarToggle: () => void;
  onPageChange: (page: string) => void;
  userEmail: string;
  onLogout: () => void;
}

export function MyLists({
  isSidebarCollapsed,
  onSidebarToggle,
  onPageChange,
  userEmail,
  onLogout,
}: MyListsProps) {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">MyLists</h1>
          <p className="text-gray-600">
            Create and manage your custom lists for foods, activities, and more.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-xl mb-2">Coming Soon</h2>
            <p className="text-gray-600">
              MyLists feature is currently under development. You'll soon be able to create custom lists to organize your diet and wellness tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
