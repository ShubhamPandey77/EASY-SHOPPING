"use client";
import Navbar from "@/components/home/Navbar";
import { useState } from "react";
import UserPagination from "@/components/userdetail/User.Pagination";
import { limit } from "@/constant/values.contants";
import {
  FetchUsers,
  SearchUsers,
  AddUsers,
  EditUsers,
  RemoveUsers,
  SortUsers,
  type User,
} from "@/api/user-api";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Plus, Search, MoreVertical, Edit, Trash2, X, CheckCircle } from "lucide-react";

// Toast component
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const Toast = ({ message, type, onClose }: ToastProps) => {
  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
  const iconColor = type === 'success' ? 'text-green-400' : type === 'error' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 min-w-80`}>
      <CheckCircle className={`h-5 w-5 ${iconColor}`} />
      <span className="flex-1">{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

function UserInfo() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<Partial<User & { firstName?: string; lastName?: string }>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ field: string; order: "asc" | "desc" | "none"; }>({ field: "", order: "none" });
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Function to show toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    // Auto-hide toast after 3 seconds
    setTimeout(() => setToast(null), 3000);
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => FetchUsers(page, limit),
  });

  const { mutate: searchUsers } = useMutation({
    mutationFn: (query: string) => SearchUsers(query),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", page, limit], data);
    },
  });

  const { mutate: sortUsers } = useMutation({
    mutationFn: ({ sortBy, order }: { sortBy: string; order: "asc" | "desc" }) =>
      SortUsers(sortBy, order),
    onSuccess: (data) => {
      queryClient.setQueryData(["users", page, limit], data);
    },
  });

  const { mutate: addUser, isPending: isAddingUser } = useMutation({
    mutationFn: (payload: User) => AddUsers(payload),
    onSuccess: (newUser) => {
      queryClient.setQueryData(["users", page, limit], (oldData: any) => {
        if (!oldData) return { users: [newUser] };
        return { ...oldData, users: [...oldData.users, newUser] };
      });
      // Close modal and reset form
      setShowModal(false);
      setForm({});
      // Show success toast
      showToast("User added successfully!", "success");
    },
    onError: (error) => {
      // Show error toast if add user fails
      showToast("Failed to add user. Please try again.", "error");
    },
  });

  const { mutate: editUser, isPending: isEditingUser } = useMutation({
    mutationFn: ({ id, payload }: { id: string | number; payload: Partial<User> }) =>
      EditUsers(id, payload),
    onSuccess: (updatedUser, variables) => {
      queryClient.setQueryData(["users", page, limit], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          users: oldData.users.map((user: User) =>
            user.id === variables.id ? { ...user, ...variables.payload } : user
          ),
        };
      });
      // Close modal and reset form
      setShowModal(false);
      setForm({});
      setIsEditing(false);
      // Show success toast
      showToast("User updated successfully!", "success");
    },
    onError: (error) => {
      // Show error toast if edit user fails
      showToast("Failed to update user. Please try again.", "error");
    },
  });

  const { mutate: deleteUser, isPending: isDeletingUser } = useMutation({
    mutationFn: (id: string | number) => RemoveUsers(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["users", page, limit], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          users: oldData.users.filter((user: User) => user.id !== deletedId),
        };
      });
      setOpenDropdown(null);
      // Show success toast
      showToast("User deleted successfully!", "success");
    },
    onError: (error) => {
      // Show error toast if delete user fails
      showToast("Failed to delete user. Please try again.", "error");
    },
  });

  const handleSort = (field: string) => {
    let newOrder: "asc" | "desc" | "none" = "asc";
    if (sortConfig.field === field) {
      if (sortConfig.order === "asc") newOrder = "desc";
      else if (sortConfig.order === "desc") newOrder = "none";
      else newOrder = "asc";
    }
    setSortConfig({ field, order: newOrder });
    if (newOrder === "none") {
      queryClient.invalidateQueries({ queryKey: ["users", page, limit] });
    } else {
      sortUsers({ sortBy: field, order: newOrder });
    }
  };

  const getSortIcon = (field: string) => {
    if (sortConfig.field !== field || sortConfig.order === "none") {
      return "↕️";
    }
    return sortConfig.order === "asc" ? "↑" : "↓";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.age || !form.gender || !form.birthDate || !form.role) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    const userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      age: form.age,
      gender: form.gender,
      birthDate: form.birthDate,
      role: form.role,
    };

    if (isEditing && form.id) {
      editUser({ id: form.id, payload: userData });
    } else {
      addUser(userData as Omit<User, 'id'>);
    }
  };

  const handleEdit = (user: User) => {
    setForm({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      age: user.age,
      gender: user.gender,
      birthDate: user.birthDate,
      role: user.role,
    });
    setIsEditing(true);
    setShowModal(true);
    setOpenDropdown(null);
  };

  const handleAddUser = () => {
    setForm({});
    setIsEditing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({});
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error Loading Users</h2>
          <p className="text-red-600">{(error as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
            <p className="text-gray-600">Manage your users efficiently with advanced controls</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchUsers(search)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => searchUsers(search)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  Search
                </button>
              </div>

              <button
                onClick={handleAddUser}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Add User
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("firstName")}
                    >
                      <div className="flex items-center gap-1">
                        First Name {getSortIcon("firstName")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("lastName")}
                    >
                      <div className="flex items-center gap-1">
                        Last Name {getSortIcon("lastName")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("email")}
                    >
                      <div className="flex items-center gap-1">
                        Email {getSortIcon("email")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("age")}
                    >
                      <div className="flex items-center gap-1">
                        Age {getSortIcon("age")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("gender")}
                    >
                      <div className="flex items-center gap-1">
                        Gender {getSortIcon("gender")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("birthDate")}
                    >
                      <div className="flex items-center gap-1">
                        Birth Date {getSortIcon("birthDate")}
                      </div>
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort("role")}
                    >
                      <div className="flex items-center gap-1">
                        Role {getSortIcon("role")}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data?.users?.map((user: User) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.firstName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.lastName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {user.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.birthDate).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === user.id.toString() ? null : user.id.toString())}
                          className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
                          disabled={isDeletingUser || isEditingUser}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>

                        {openDropdown === user.id.toString() && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => handleEdit(user)}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                disabled={isEditingUser}
                              >
                                <Edit className="h-4 w-4" />
                                {isEditingUser ? "Editing..." : "Edit User"}
                              </button>
                              <button
                                onClick={() => deleteUser(user.id)}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                disabled={isDeletingUser}
                              >
                                <Trash2 className="h-4 w-4" />
                                {isDeletingUser ? "Deleting..." : "Delete User"}
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {data?.users?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-500">Get started by adding your first user.</p>
              </div>
            )}
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {isEditing ? "Edit User" : "Add New User"}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.firstName || ""}
                          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter first name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.lastName || ""}
                          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter last name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email || ""}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Age <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min="1"
                          max="120"
                          value={form.age || ""}
                          onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter age"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={form.gender || ""}
                          onChange={(e) => setForm({ ...form, gender: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Birth Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          required
                          value={form.birthDate ? (typeof form.birthDate === 'string' ? form.birthDate.split('T')[0] : new Date(form.birthDate).toISOString().split("T")[0]) : ""}
                          onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Role */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Role <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={form.role || ""}
                          onChange={(e) => setForm({ ...form, role: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select role</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Employee">Employee</option>
                          <option value="Intern">Intern</option>
                          <option value="Contractor">Contractor</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isAddingUser || isEditingUser}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {(isAddingUser || isEditingUser) && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        )}
                        {isEditing ? "Update User" : "Add User"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {openDropdown && (
            <div
              className="fixed inset-0 z-0"
              onClick={() => setOpenDropdown(null)}
            />
          )}
        </div>
      </div>
      
      {data?.users?.length > 0 && (
        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200/80">
            <UserPagination
              page={page}
              setPage={setPage}
              data={data}
              limit={limit}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UserInfo;