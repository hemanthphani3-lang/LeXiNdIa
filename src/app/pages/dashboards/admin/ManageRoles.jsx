import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, Shield, Edit2, CheckCircle, X,
  Upload
} from 'lucide-react';

export default function ManageRoles() {
  const { roles, updateRole, getRoleUserCount, pendingContent } = useAdminData();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users' },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles', active: true },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
    setShowEditModal(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    updateRole(currentRole.id, formData);
    setShowEditModal(false);
    alert(`Role "${formData.name}" updated successfully!`);
  };

  const handlePermissionToggle = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const availablePermissions = [
    'User Management',
    'Content Moderation',
    'System Settings',
    'Analytics',
    'Role Management',
    'Create Articles',
    'Edit Own Content',
    'View Analytics',
    'Manage Courses',
    'Create Legal Content',
    'Verify Articles',
    'Discussion Moderation',
    'View Content',
    'Take Quizzes',
    'Join Discussions',
    'Save Articles',
    'Edit All Content',
    'Delete Content',
    'Manage Comments'
  ];

  return (
    <DashboardLayout navigationItems={navigationItems} title="Manage Roles" role="Administrator">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Role Management
        </h2>
        <p className="text-[#64748B]">Manage user roles and their permissions across the platform</p>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, index) => {
          const userCount = getRoleUserCount(role.name);
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass-white rounded-xl p-6 card-elevated"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {role.name}
                    </h3>
                    <p className="text-sm text-[#64748B]">{userCount} users</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleEditRole(role)}
                    className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
                    title="Edit Role"
                  >
                    <Edit2 className="w-4 h-4 text-[#0A1F44]" />
                  </button>
                </div>
              </div>

              <p className="text-[#64748B] mb-4">{role.description}</p>

              <div className="border-t border-[#0A1F44]/10 pt-4">
                <p className="text-sm text-[#64748B] mb-3">Permissions:</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission) => (
                    <span
                      key={permission}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#F8FAFC] rounded-full text-xs text-[#0A1F44]"
                    >
                      <CheckCircle className="w-3 h-3 text-[#138808]" />
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Role Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-[#0A1F44]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Edit Role: {currentRole?.name}
                </h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#64748B]" />
                </button>
              </div>

              <form onSubmit={handleSubmitEdit}>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#64748B] mb-2">Role Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#64748B] mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                      rows="3"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#64748B] mb-3">Permissions</label>
                    <div className="grid grid-cols-2 gap-3">
                      {availablePermissions.map((permission) => (
                        <label
                          key={permission}
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                            formData.permissions.includes(permission)
                              ? 'border-[#FF9933] bg-[#FF9933]/5'
                              : 'border-[#0A1F44]/10 hover:border-[#FF9933]/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(permission)}
                            onChange={() => handlePermissionToggle(permission)}
                            className="w-4 h-4 text-[#FF9933] rounded focus:ring-[#FF9933]"
                          />
                          <span className="text-sm text-[#0A1F44]">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-6 py-3 border border-[#0A1F44]/20 text-[#0A1F44] rounded-lg hover:bg-[#F8FAFC] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}