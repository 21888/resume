/**
 * Simple Role Selection Modal
 * 简化的角色选择模态框
 */

'use client';

import { useState } from 'react';

type UserRole = 'hr' | 'tech_lead' | 'developer' | 'client';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onRoleSelect: (role: UserRole) => void;
  onClose: () => void;
}

const roleOptions = [
  {
    id: 'hr' as UserRole,
    title: 'HR / 招聘经理',
    description: '查看候选人的综合能力和团队适配度',
    icon: '👥',
    color: 'bg-green-500'
  },
  {
    id: 'tech_lead' as UserRole,
    title: '技术负责人',
    description: '关注技术深度、架构能力和团队管理经验',
    icon: '🚀',
    color: 'bg-blue-500'
  },
  {
    id: 'developer' as UserRole,
    title: '开发工程师',
    description: '了解技术栈、项目经验和协作能力',
    icon: '💻',
    color: 'bg-purple-500'
  },
  {
    id: 'client' as UserRole,
    title: '客户 / 合作伙伴',
    description: '查看业务能力、项目成果和服务经验',
    icon: '🤝',
    color: 'bg-orange-500'
  }
];

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onRoleSelect,
  onClose
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    onRoleSelect(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* 模态框内容 */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-[92vw] sm:w-full max-w-sm sm:max-w-xl mx-auto sm:mx-4 p-6 max-h-[85vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            选择您的身份
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            根据您的身份，我们将为您展示最相关的内容
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roleOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleRoleSelect(option.id)}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                  {option.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {option.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            稍后选择
          </button>
        </div>
      </div>
    </div>
  );
};