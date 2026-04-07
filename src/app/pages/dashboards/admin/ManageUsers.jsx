import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import DashboardLayout from '../../../components/DashboardLayout';
import { useAdminData } from '../../../contexts/AdminDataContext';
import { 
  LayoutDashboard, Users, UserCog, FileCheck, BarChart3, 
  FileText, Settings, Search, Filter, UserPlus, Mail, Phone, 
  MapPin, Calendar, Edit2, Trash2, CheckCircle, XCircle, Eye, X,
  Upload
} from 'lucide-react';

export default function ManageUsers() {
  const { 
    users, 
    addUser, 
    updateUser, 
    deleteUser, 
    pendingContent 
  } = useAdminData();

  const navigationItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Manage Users', icon: Users, path: '/admin/manage-users', active: true },
    { label: 'Manage Roles', icon: UserCog, path: '/admin/manage-roles' },
    { label: 'Content Approval', icon: FileCheck, path: '/admin/content-approval', badge: pendingContent.length > 0 ? pendingContent.length.toString() : undefined },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'Active Articles', icon: FileText, path: '/admin/active-articles' },
    { label: 'Create Article', icon: Upload, path: '/admin/create-article' },
    { label: 'System Logs', icon: FileText, path: '/admin/system-logs' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'Citizen',
    status: 'Active'
  });

  const handleAddUserClick = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      role: 'Citizen',
      status: 'Active'
    });
    setShowAddModal(true);
  };

  const handleSubmitNewUser = (e) => {
    e.preventDefault();
    addUser(formData);
    setShowAddModal(false);
    alert(`User ${formData.name} added successfully!`);
  };

  const handleViewUser = (user) => {
    alert(`Viewing details for: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}\nStatus: ${user.status}`);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      role: user.role,
      status: user.status
    });
    setShowEditModal(true);
  };

  const handleSubmitEditUser = (e) => {
    e.preventDefault();
    updateUser(currentUser.id, formData);
    setShowEditModal(false);
    alert(`User ${formData.name} updated successfully!`);
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteUser(user.id);
      alert(`User ${user.name} deleted successfully!`);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout navigationItems={navigationItems} title="Manage Users" role="Administrator">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="pl-10 pr-8 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="Citizen">Citizens</option>
              <option value="Educator">Educators</option>
              <option value="Legal Expert">Legal Experts</option>
            </select>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift flex items-center gap-2"
            onClick={handleAddUserClick}
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#0A1F44] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {users.length}
          </div>
          <div className="text-sm text-[#64748B]">Total Users</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#138808] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {users.filter(u => u.status === 'Active').length}
          </div>
          <div className="text-sm text-[#64748B]">Active Users</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#FF9933] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {users.filter(u => u.status === 'Pending').length}
          </div>
          <div className="text-sm text-[#64748B]">Pending Approval</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-white rounded-xl p-6"
        >
          <div className="text-3xl text-[#64748B] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {users.filter(u => u.status === 'Inactive').length}
          </div>
          <div className="text-sm text-[#64748B]">Inactive Users</div>
        </motion.div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-white rounded-xl overflow-hidden card-elevated"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] border-b border-[#0A1F44]/10">
              <tr>
                <th className="text-left px-6 py-4 text-sm text-[#64748B]">User Details</th>
                <th className="text-left px-6 py-4 text-sm text-[#64748B]">Contact</th>
                <th className="text-left px-6 py-4 text-sm text-[#64748B]">Role</th>
                <th className="text-left px-6 py-4 text-sm text-[#64748B]">Status</th>
                <th className="text-left px-6 py-4 text-sm text-[#64748B]">Last Active</th>
                <th className="text-right px-6 py-4 text-sm text-[#64748B]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0A1F44]/5">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] to-[#0A1F44] flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-[#0A1F44] font-medium">{user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-[#64748B]">
                          <MapPin className="w-3 h-3" />
                          {user.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <Phone className="w-4 h-4" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs bg-[#0A1F44]/10 text-[#0A1F44]">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-700' :
                      user.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {user.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : 
                       user.status === 'Pending' ? <XCircle className="w-3 h-3" /> :
                       <XCircle className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#64748B]">{user.lastActive}</div>
                    <div className="flex items-center gap-1 text-xs text-[#64748B]">
                      <Calendar className="w-3 h-3" />
                      Joined {user.joinedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors" 
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 text-[#64748B]" />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors" 
                        title="Edit User"
                      >
                        <Edit2 className="w-4 h-4 text-[#0A1F44]" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-[#64748B] mx-auto mb-4" />
            <p className="text-[#64748B]">No users found matching your criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-8 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#0A1F44]">Add New User</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#64748B]" />
                </button>
              </div>
              <form onSubmit={handleSubmitNewUser}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#64748B]">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="pl-4 pr-8 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Citizen">Citizen</option>
                      <option value="Educator">Educator</option>
                      <option value="Legal Expert">Legal Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="pl-4 pr-8 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-8 w-full max-w-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#0A1F44]">Edit User</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#64748B]" />
                </button>
              </div>
              <form onSubmit={handleSubmitEditUser}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#64748B]">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full pl-4 pr-4 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="pl-4 pr-8 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Citizen">Citizen</option>
                      <option value="Educator">Educator</option>
                      <option value="Legal Expert">Legal Expert</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#64748B]">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="pl-4 pr-8 py-3 border border-[#0A1F44]/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933] bg-white appearance-none cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Pending">Pending</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-[#0A1F44] to-[#1A3A6B] text-white rounded-lg hover:shadow-lg transition-all hover-lift"
                  >
                    Update User
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