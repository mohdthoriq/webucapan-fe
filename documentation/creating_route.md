# Creating Routes in Amfibiz Frontend

This documentation provides a comprehensive guide on how to create routes in the Amfibiz frontend application using **TanStack Router** (v1.132+).

## Table of Contents

1. [Overview](#overview)
2. [Route Structure](#route-structure)
3. [Basic Route Creation](#basic-route-creation)
4. [Route with Search Parameters](#route-with-search-parameters)
5. [Authenticated Routes](#authenticated-routes)
6. [Layout Routes](#layout-routes)
7. [Error Handling](#error-handling)
8. [Best Practices](#best-practices)

---

## Overview

The Amfibiz frontend uses **TanStack Router** for file-based routing. Routes are automatically generated from the file structure in the `src/routes` directory.

### Key Concepts

- **File-based routing**: Routes are defined by the file structure
- **Type-safe routing**: Full TypeScript support with type inference
- **Search params validation**: Using Zod schemas for URL search parameters
- **Route Tree**: Automatically generated in `src/routeTree.gen.ts`

---

## Route Structure

Routes are organized in the `src/routes` directory:

```
src/routes/
├── __root.tsx                    # Root layout component
├── (auth)/                       # Route group for auth pages
│   ├── login.tsx                 # /login
│   ├── register.tsx              # /register
│   └── forgot-password.tsx       # /forgot-password
├── (errors)/                     # Route group for error pages
│   └── ...
├── _authenticated/               # Layout route (requires auth)
│   ├── route.tsx                 # Layout component
│   ├── index.tsx                 # / (dashboard)
│   ├── users/
│   │   └── index.tsx             # /users
│   └── tasks/
│       └── index.tsx             # /tasks
```

### Naming Conventions

| Pattern | Description | Example |
|---------|-------------|---------|
| `index.tsx` | Default route for a path | `users/index.tsx` → `/users` |
| `route.tsx` | Layout component without path segment | `_authenticated/route.tsx` |
| `(folder)/` | Route group (doesn't affect URL) | `(auth)/login.tsx` → `/login` |
| `_folder/` | Layout route (affects nesting) | `_authenticated/users/index.tsx` → `/users` |
| `$param.tsx` | Dynamic route parameter | `users/$id.tsx` → `/users/:id` |
| `__root.tsx` | Root layout for all routes | - |

---

## Basic Route Creation

### Step 1: Create the Route File

Create a new file in the appropriate directory. For example, to create a `/about` page:

**File:** `src/routes/(auth)/about.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { About } from '@/features/about'

export const Route = createFileRoute('/(auth)/about')({
  component: About,
})
```

### Step 2: Create the Component

**File:** `src/features/about/index.tsx`

```tsx
export function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the about page.</p>
    </div>
  )
}
```

### Step 3: Verify Route Generation

The route will be automatically added to `src/routeTree.gen.ts` when you save the file (in development mode).

---

## Route with Search Parameters

Use Zod schemas to validate and type URL search parameters.

### Example: Users List with Filters

**File:** `src/routes/_authenticated/users/index.tsx`

```tsx
import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Users } from '@/features/users'

// Define search parameter schema
const usersSearchSchema = z.object({
  // Pagination
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),
  
  // Sorting
  sortBy: z.enum(['name', 'email', 'createdAt']).optional().catch('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().catch('asc'),
  
  // Filters
  status: z
    .array(z.enum(['active', 'inactive', 'suspended']))
    .optional()
    .catch([]),
  role: z
    .array(z.enum(['admin', 'user', 'manager']))
    .optional()
    .catch([]),
  
  // Search
  search: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/users/')({
  validateSearch: usersSearchSchema,
  component: Users,
})
```

### Using Search Params in Component

```tsx
import { useSearch } from '@tanstack/react-router'

export function Users() {
  // Get typed search params
  const { page, pageSize, status, search } = useSearch({
    from: '/_authenticated/users/',
  })

  // Use the params in your component
  return (
    <div>
      <h1>Users (Page {page})</h1>
      <p>Page size: {pageSize}</p>
      <p>Search: {search}</p>
      <p>Status filters: {status.join(', ')}</p>
    </div>
  )
}
```

### Navigate with Search Params

```tsx
import { useNavigate } from '@tanstack/react-router'

function FilterButton() {
  const navigate = useNavigate()

  const handleFilter = () => {
    navigate({
      to: '/users',
      search: {
        page: 1,
        status: ['active'],
        search: 'john',
      },
    })
  }

  return <button onClick={handleFilter}>Filter Active Users</button>
}
```

---

## Authenticated Routes

Routes under `_authenticated/` require user authentication. The layout checks auth state before rendering children.

### Creating an Authenticated Route

**File:** `src/routes/_authenticated/products/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Products } from '@/features/products'

export const Route = createFileRoute('/_authenticated/products/')({
  component: Products,
})
```

This route will:
1. Use the `AuthenticatedLayout` wrapper (defined in `_authenticated/route.tsx`)
2. Redirect to `/login` if the user is not authenticated
3. Be accessible at `/products`

### Auth Layout Implementation

**File:** `src/routes/_authenticated/route.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})
```

The `AuthenticatedLayout` component handles:
- Authentication checks
- Navigation/sidebar display
- User session management

---

## Layout Routes

Layout routes provide a wrapper for child routes without adding a URL segment.

### Creating a Layout Route

**Step 1:** Create the layout file

**File:** `src/routes/_dashboard/route.tsx`

```tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside>
        <nav>Dashboard Navigation</nav>
      </aside>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
    </div>
  )
}
```

**Step 2:** Create child routes

**File:** `src/routes/_dashboard/analytics/index.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { Analytics } from '@/features/analytics'

export const Route = createFileRoute('/_dashboard/analytics/')({
  component: Analytics,
})
```

This creates the route `/analytics` with the dashboard layout applied.

---

## Dynamic Routes

Dynamic routes capture URL parameters.

### Single Parameter

**File:** `src/routes/_authenticated/users/$userId.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { UserDetail } from '@/features/users/user-detail'

export const Route = createFileRoute('/_authenticated/users/$userId')({
  component: UserDetail,
})
```

### Using Route Params

```tsx
import { useParams } from '@tanstack/react-router'

export function UserDetail() {
  const { userId } = useParams({
    from: '/_authenticated/users/$userId',
  })

  return <div>User ID: {userId}</div>
}
```

### Multiple Parameters

**File:** `src/routes/_authenticated/projects/$projectId/tasks/$taskId.tsx`

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_authenticated/projects/$projectId/tasks/$taskId'
)({
  component: TaskDetail,
})
```

---

## Route Configuration Options

### Complete Route Configuration

```tsx
import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'

const searchSchema = z.object({
  filter: z.string().optional(),
})

export const Route = createFileRoute('/example')({
  // ✅ Required: Component to render
  component: ExampleComponent,
  
  // ⚙️ Optional: Search param validation
  validateSearch: searchSchema,
  
  // ⚙️ Optional: Loader for data fetching
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData({
      queryKey: ['example'],
      queryFn: fetchExampleData,
    })
    return data
  },
  
  // ⚙️ Optional: Before load hook
  beforeLoad: async ({ context, location }) => {
    // Check permissions, redirect, etc.
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
  
  // ⚙️ Optional: Error component
  errorComponent: ({ error }) => <div>Error: {error.message}</div>,
  
  // ⚙️ Optional: Pending component (loading state)
  pendingComponent: () => <div>Loading...</div>,
  
  // ⚙️ Optional: Meta tags for SEO
  meta: () => [
    { title: 'Example Page' },
    { name: 'description', content: 'This is an example page' },
  ],
})
```

---

## Error Handling

### Route-Level Error Component

```tsx
export const Route = createFileRoute('/example')({
  component: Example,
  errorComponent: ({ error, reset }) => (
    <div>
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  ),
})
```

### Global Error Handler

Defined in `src/routes/__root.tsx`:

```tsx
export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootLayout,
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
```

---

## Navigation

### Using `useNavigate` Hook

```tsx
import { useNavigate } from '@tanstack/react-router'

function MyComponent() {
  const navigate = useNavigate()

  const goToUsers = () => {
    navigate({ to: '/users' })
  }

  const goToUserDetail = (id: string) => {
    navigate({ 
      to: '/users/$userId',
      params: { userId: id }
    })
  }

  const goWithSearch = () => {
    navigate({ 
      to: '/users',
      search: { page: 2, status: ['active'] }
    })
  }

  return (
    <div>
      <button onClick={goToUsers}>All Users</button>
      <button onClick={() => goToUserDetail('123')}>User 123</button>
      <button onClick={goWithSearch}>Active Users (Page 2)</button>
    </div>
  )
}
```

### Using `Link` Component

```tsx
import { Link } from '@tanstack/react-router'

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Link 
        to="/users" 
        search={{ page: 1, status: ['active'] }}
      >
        Active Users
      </Link>
      <Link
        to="/users/$userId"
        params={{ userId: '123' }}
      >
        User 123
      </Link>
    </nav>
  )
}
```

---

## Best Practices

### 1. **Keep Routes Simple**
Routes should only contain routing configuration. Business logic belongs in feature components.

✅ **Good:**
```tsx
export const Route = createFileRoute('/users')({
  component: Users,
  validateSearch: usersSearchSchema,
})
```

❌ **Bad:**
```tsx
export const Route = createFileRoute('/users')({
  component: () => {
    const [users, setUsers] = useState([])
    // Lots of business logic here...
    return <div>...</div>
  },
})
```

### 2. **Use Search Schemas**
Always validate search parameters with Zod schemas for type safety.

### 3. **Organize by Feature**
Group related routes in feature folders:
```
routes/
├── _authenticated/
│   ├── users/
│   │   ├── index.tsx        # /users
│   │   └── $userId.tsx      # /users/:id
│   └── products/
│       ├── index.tsx        # /products
│       └── $productId.tsx   # /products/:id
```

### 4. **Use Layout Routes for Common UI**
Extract common layouts into layout routes to avoid duplication.

### 5. **Leverage Route Groups**
Use `(folder)` pattern to organize routes without affecting URLs:
```
routes/
├── (auth)/          # Group auth-related routes
│   ├── login.tsx    # /login (not /auth/login)
│   └── register.tsx # /register
```

### 6. **Type Safety**
Always import and use types from `@tanstack/react-router`:
```tsx
import { useParams, useSearch, useNavigate } from '@tanstack/react-router'
```

### 7. **Loading States**
Use `pendingComponent` for better UX:
```tsx
export const Route = createFileRoute('/users')({
  component: Users,
  pendingComponent: () => <LoadingSpinner />,
})
```

---

## Common Patterns

### Redirect After Login

```tsx
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/login')({
  component: Login,
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || '/' })
    }
  },
})
```

### Protected Route with Permission Check

```tsx
export const Route = createFileRoute('/_authenticated/admin')({
  component: AdminPanel,
  beforeLoad: ({ context }) => {
    if (!context.auth.user?.isAdmin) {
      throw redirect({ to: '/forbidden' })
    }
  },
})
```

### Prefetch Data

```tsx
export const Route = createFileRoute('/_authenticated/users/')({
  component: Users,
  loader: async ({ context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ['users'],
      queryFn: fetchUsers,
    })
  },
})
```

---

## Troubleshooting

### Route Not Found

1. Ensure the file name matches the route path convention
2. Check that the route is exported correctly
3. Verify `routeTree.gen.ts` is updated (should auto-update in dev mode)
4. Restart the dev server if needed

### Type Errors

1. Ensure you're using the correct route path in hooks: `useSearch({ from: '/exact/route/path' })`
2. Update TypeScript if you see generic type errors
3. Check that search schema matches usage

### Search Params Not Working

1. Verify the schema is passed to `validateSearch`
2. Check that you're using `.optional().catch(defaultValue)` for optional params
3. Ensure the URL contains valid search params

---

## References

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [TanStack Router File-Based Routing](https://tanstack.com/router/latest/docs/framework/react/guide/file-based-routing)
- [Zod Documentation](https://zod.dev)

---

Created: 2025-11-21  
Last Updated: 2025-11-21  
Version: 1.0
