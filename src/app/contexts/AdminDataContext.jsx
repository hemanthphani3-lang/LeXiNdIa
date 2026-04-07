import { createContext, useContext, useState } from 'react';

const AdminDataContext = createContext();

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within AdminDataProvider');
  }
  return context;
};

export const AdminDataProvider = ({ children }) => {
  // Users State
  const [users, setUsers] = useState([]);

  // Content Approval State
  const [pendingContent, setPendingContent] = useState([]);
  const [approvedToday, setApprovedToday] = useState(0);
  const [rejectedToday, setRejectedToday] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);

  // System Logs State
  const [systemLogs, setSystemLogs] = useState([]);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalPageViews: 0,
    activeUsers: 0,
    quizCompletions: 0,
    avgSessionTime: '0m 0s',
    topArticles: []
  });

  // Fixed roles that cannot be created or deleted, only edited
  const [roles, setRoles] = useState([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      permissions: ['User Management', 'Content Moderation', 'System Settings', 'Analytics', 'Role Management'],
      color: 'from-[#0A1F44] to-[#1A3A6B]'
    },
    {
      id: 'educator',
      name: 'Educator',
      description: 'Can create and manage educational content',
      permissions: ['Create Articles', 'Edit Own Content', 'View Analytics', 'Manage Courses'],
      color: 'from-[#FF9933] to-[#FFB366]'
    },
    {
      id: 'legal-expert',
      name: 'Legal Expert',
      description: 'Can provide legal insights and verify content',
      permissions: ['Create Legal Content', 'Verify Articles', 'View Analytics', 'Discussion Moderation'],
      color: 'from-[#138808] to-[#1ea712]'
    },
    {
      id: 'citizen',
      name: 'Citizen',
      description: 'Basic access to platform content and features',
      permissions: ['View Content', 'Take Quizzes', 'Join Discussions', 'Save Articles'],
      color: 'from-[#1A3A6B] to-[#0A1F44]'
    }
  ]);

  // System Logs Functions
  const addSystemLog = (type, message, metadata = {}) => {
    const newLog = {
      id: Date.now().toString() + Math.random(), // Ensure unique ID
      type, // 'success', 'info', 'warning', 'error'
      message,
      timestamp: new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      }).replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2'),
      ...metadata
    };
    setSystemLogs(prev => [newLog, ...prev]); // Add to beginning for newest first
    return newLog;
  };

  const clearSystemLogs = () => {
    setSystemLogs([]);
  };

  // User Management Functions
  const addUser = (user) => {
    const newUser = {
      ...user,
      id: Date.now().toString(),
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastActive: 'Just now'
    };
    setUsers(prev => [...prev, newUser]);
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      activeUsers: prev.activeUsers + (user.status === 'Active' ? 1 : 0)
    }));
    
    // Add system log
    setTimeout(() => {
      addSystemLog('success', `New user registered: "${user.email}"`, { role: user.role });
    }, 0);
    
    return newUser;
  };

  const updateUser = (userId, updatedData) => {
    const user = users.find(u => u.id === userId);
    setUsers(prev => prev.map(u => 
      u.id === userId ? { ...u, ...updatedData } : u
    ));
    
    // Add system log for status changes
    if (updatedData.status && user && updatedData.status !== user.status) {
      setTimeout(() => {
        addSystemLog('info', `User "${user.email}" status changed to ${updatedData.status}`, { user: 'Admin' });
      }, 0);
    }
  };

  const deleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));
    
    // Update analytics
    if (user && user.status === 'Active') {
      setAnalytics(prev => ({
        ...prev,
        activeUsers: Math.max(0, prev.activeUsers - 1)
      }));
    }
    
    // Add system log
    if (user) {
      setTimeout(() => {
        addSystemLog('warning', `User deleted: "${user.email}"`, { user: 'Admin' });
      }, 0);
    }
  };

  // Content Approval Functions
  const approveContent = (contentId) => {
    const content = pendingContent.find(c => c.id === contentId);
    setPendingContent(prev => prev.filter(c => c.id !== contentId));
    setApprovedToday(prev => prev + 1);
    setTotalApproved(prev => prev + 1);
    
    // Add system log
    if (content) {
      setTimeout(() => {
        addSystemLog('success', `Content approved: "${content.title}"`, { user: 'Admin', author: content.author });
      }, 0);
    }
  };

  const rejectContent = (contentId) => {
    const content = pendingContent.find(c => c.id === contentId);
    setPendingContent(prev => prev.filter(c => c.id !== contentId));
    setRejectedToday(prev => prev + 1);
    
    // Add system log
    if (content) {
      setTimeout(() => {
        addSystemLog('warning', `Content rejected: "${content.title}"`, { user: 'Admin', author: content.author });
      }, 0);
    }
  };

  const addPendingContent = (content) => {
    const newContent = {
      ...content,
      id: Date.now().toString(),
      submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setPendingContent(prev => [...prev, newContent]);
    
    // Add system log
    setTimeout(() => {
      addSystemLog('info', `New content submitted for review: "${content.title}"`, { 
        author: content.author,
        authorRole: content.authorRole,
        type: content.type 
      });
    }, 0);
    
    return newContent;
  };

  // Role Management Functions
  const updateRole = (roleId, updatedData) => {
    const role = roles.find(r => r.id === roleId);
    setRoles(prev => prev.map(r => 
      r.id === roleId ? { ...r, ...updatedData } : r
    ));
    
    // Add system log
    if (role) {
      setTimeout(() => {
        addSystemLog('info', `Role "${role.name}" permissions updated`, { user: 'Admin' });
      }, 0);
    }
  };

  // Get role user count
  const getRoleUserCount = (roleName) => {
    return users.filter(u => u.role === roleName).length;
  };

  // Analytics Functions
  const updateAnalytics = (newAnalytics) => {
    setAnalytics(prev => ({ ...prev, ...newAnalytics }));
  };

  const incrementPageViews = (count = 1) => {
    setAnalytics(prev => ({
      ...prev,
      totalPageViews: prev.totalPageViews + count
    }));
  };

  const incrementQuizCompletions = () => {
    setAnalytics(prev => ({
      ...prev,
      quizCompletions: prev.quizCompletions + 1
    }));
  };

  const value = {
    // Users
    users,
    addUser,
    updateUser,
    deleteUser,
    
    // Content Approval
    pendingContent,
    approvedToday,
    rejectedToday,
    totalApproved,
    approveContent,
    rejectContent,
    addPendingContent,
    
    // Roles
    roles,
    updateRole,
    getRoleUserCount,
    
    // Analytics
    analytics,
    updateAnalytics,
    incrementPageViews,
    incrementQuizCompletions,
    
    // System Logs
    systemLogs,
    addSystemLog,
    clearSystemLogs
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
};