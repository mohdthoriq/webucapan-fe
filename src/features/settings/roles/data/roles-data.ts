import { Shield, Users, CreditCard, Settings } from 'lucide-react'
import { type Role } from '../types/roles.schema'

export const roleStatusColors = new Map([
  [true, 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  [false, 'bg-neutral-300/40 border-neutral-300'],
])

export const roles = [
  {
    id: '1',
    name: 'Superadmin',
    value: 'superadmin',
    icon: Shield,
    description: 'Full access to all system features and settings',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'system_settings'],
  },
  {
    id: '2',
    name: 'Admin',
    value: 'admin',
    icon: Settings,
    description: 'Administrative access with limited system settings',
    permissions: ['read', 'write', 'delete', 'manage_users'],
  },
  {
    id: '3',
    name: 'Manager',
    value: 'manager',
    icon: Users,
    description: 'Team management and project oversight capabilities',
    permissions: ['read', 'write', 'manage_team'],
  },
  {
    id: '4',
    name: 'Cashier',
    value: 'cashier',
    icon: CreditCard,
    description: 'Transaction and payment processing access',
    permissions: ['read', 'process_payments'],
  },
] as const

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Superadmin',
    description: 'Full access to all system features and settings',
    permissions: ['read', 'write', 'delete', 'manage_users', 'manage_roles', 'system_settings'],
    userCount: 2,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Administrative access with limited system settings',
    permissions: ['read', 'write', 'delete', 'manage_users'],
    userCount: 5,
    isActive: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-21'),
  },
  {
    id: '3',
    name: 'Manager',
    description: 'Team management and project oversight capabilities',
    permissions: ['read', 'write', 'manage_team'],
    userCount: 12,
    isActive: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '4',
    name: 'Cashier',
    description: 'Transaction and payment processing access',
    permissions: ['read', 'process_payments'],
    userCount: 8,
    isActive: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-23'),
  },
  {
    id: '5',
    name: 'Viewer',
    description: 'Read-only access to basic information',
    permissions: ['read'],
    userCount: 15,
    isActive: false,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-24'),
  },
]