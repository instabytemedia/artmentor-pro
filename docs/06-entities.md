# 06 - Entity CRUD

> **Agent:** Entities Agent 📦
> **Goal:** Create complete CRUD for all Entities

---

## Context

**Product:** ArtMentor Pro
**Entities:** Idea, Targeting, Goodread
**Entity Count:** 3

---

## Overview

Per Entity will be created:
- 1x TypeScript Types File
- 1x Zod Schema File
- 2x API Routes (List/Create + Detail)
- 1x SWR Hooks File
- 2x Pages (List + Detail)
- 2x Components (List + Detail)

**Total Files per Entity:** 9
**Total Files overall:** 27

| Entity | Table | API Endpoints | Pages |
|--------|-------|---------------|-------|
| Idea | ideas | /api/ideas | /ideas, /ideas/[id] |
| Targeting | targetings | /api/targetings | /targetings, /targetings/[id] |
| Goodread | goodreads | /api/goodreads | /goodreads, /goodreads/[id] |

---


---

## Entity 1: Idea

**Description:** A user's artistic idea or concept
**Table Name:** `ideas`

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `title`: string
- `description`: text (optional)

**Relationships:**
- one_to_many → User: A user can have many ideas





### Instructions: Idea

#### 1. TypeScript Types

Create **Types File** (`types/idea.ts`):

**⚠️ CRITICAL: No Duplicate Fields!**
Each field must appear EXACTLY ONCE. Use consistent naming (snake_case for DB fields).

```typescript
// ✅ CORRECT: Each field once
export interface Idea {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Custom fields:
  title: string;
  description: string;
}

// ❌ WRONG: Duplicate fields!
export interface Idea {
  id: string;        // 1x
  userId: string;    // mixed camelCase
  created_at: Date;  // wrong type (use string)
  user_id: string;   // DUPLICATE (snake_case)!
  id: string;        // DUPLICATE!
}
```

**IdeaListItem Interface:**
- Reduced version for List Views
- Only essential fields: id, created_at + first 3 custom fields

#### 2. Zod Validation Schema

Create **Schema File** (`lib/schemas/idea.ts`):

**CreateIdeaSchema:**
- Zod Object with all custom fields
- Required vs Optional based on Field Definition
- Type Mapping:
  - string/text → z.string()
  - number/integer → z.number() / z.number().int()
  - boolean → z.boolean()
  - date/datetime → z.string() (ISO format)

**UpdateIdeaSchema:**
- Use Create Schema with .partial()
- All fields optional for updates

**Exports:**
- Schemas + Inferred Types

#### 3. API Routes - List & Create

Create **List/Create Route** (`app/api/ideas/route.ts`):

**GET /api/ideas (List):**
- Auth Check: User from Supabase
- Query Params: limit (default 20), cursor (pagination)
- Supabase Query:
  - Filter: user_id = current user
  - Order: created_at DESC
  - Limit: limit + 1 (for hasMore detection)
  - Cursor: created_at < cursor (if provided)
- Response: { data: items, meta: { next_cursor, has_more } }
- Error Handling: 401 (unauthorized), 500 (server error)

**POST /api/ideas (Create):**
- Auth Check: User from Supabase
- Body Validation: CreateIdeaSchema with safeParse
- Insert: Merge validated data + user_id
- Select: .select().single() for Created Object
- Response: { data } with 201 Status
- Error Handling: 400 (validation), 500 (server error)

#### 4. API Routes - Detail Operations

Create **Detail Route** (`app/api/ideas/[id]/route.ts`):

**GET /api/ideas/[id] (Read):**
- Params: id (await params promise)
- Auth Check: User from Supabase
- Query: .select().eq("id", id).eq("user_id", user.id).single()
- Response: { data }
- Error: 404 if not found

**PATCH /api/ideas/[id] (Update):**
- Params: id (await params promise)
- Auth Check + Body Validation
- Update: .update().eq("id").eq("user_id").select().single()
- Response: { data }
- Error: 400 (validation), 404 (not found)

**DELETE /api/ideas/[id] (Delete):**
- Params: id (await params promise)
- Auth Check
- Delete: .delete().eq("id").eq("user_id")
- Response: 204 No Content
- Error: 404 (not found)

**Important for all Routes:**
- User ID Check prevents access to other users' data
- NextRequest/NextResponse for Types
- await params as Promise (Next.js 15)

#### 5. SWR Data Fetching Hooks

Create **Hooks File** (`hooks/useIdeas.ts`):

**useIdeas() Hook:**
- SWR for List Fetching
- URL: /api/ideas
- Returns: { ideas, isLoading, error, mutate }

**useIdea(id) Hook:**
- SWR for Single Item Fetching
- URL: /api/ideas/{id}
- Conditional: only fetch if id is provided
- Returns: { idea, isLoading, error, mutate }

**useCreateIdea() Hook:**
- POST Request Function
- Mutate List after Success
- Error Handling with throw

**useUpdateIdea(id) Hook:**
- PATCH Request Function
- Mutate Item + List after Success
- Error Handling with throw

**useDeleteIdea() Hook:**
- DELETE Request Function
- Mutate List after Success
- Error Handling with throw

**Important:**
- All Hooks are Client Components ("use client")
- Fetcher Function for SWR
- Proper Error Handling

#### 6. List Page

Create **List Page** (`app/(app)/ideas/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Client Component for List Rendering

**Layout:**
- Container with Padding
- Header: Title + "New" Button (right)
- List Component Integration

#### 7. List Component

Create **List Component** (`components/idea/IdeaList.tsx`):

**States:**
- Loading: Skeleton Grid (6 items)
- Error: Error Message Card
- Empty: EmptyState Component with "Create New" Action
- Success: Grid with Items

**Grid Layout:**
- Responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- Gap: gap-4

**Item Cards:**
- Link to Detail Page
- Hover Effect: border-primary
- Content: Title + Created Date (adapt to Entity fields)

**Important:**
- "use client" Directive
- useIdeas() Hook for Data
- Proper Loading/Error/Empty States

#### 8. Detail Page

Create **Detail Page** (`app/(app)/ideas/[id]/page.tsx`):

**Functionality:**
- Server Component
- Auth Check
- Direct Supabase Fetch for SSR
- notFound() if Item doesn't exist
- Pass Data to Detail Component

**Security:**
- user_id Check in Query

#### 9. Detail Component

Create **Detail Component** (`components/idea/IdeaDetail.tsx`):

**Props:**
- `idea`: Idea Object

**Layout:**
- Back Button (top left)
- Delete Button (top right)
- Card with Details:
  - ID
  - All Custom Fields (from Entity Definition)
  - Created/Updated Timestamps

**Delete Functionality:**
- Confirm Dialog
- useDeleteIdea() Hook
- Router Push to List after Success
- Loading State during Delete

**Important:**
- "use client" Directive
- Router for Navigation
- Confirmation before Delete



---

## Entity 2: Targeting

**Description:** The target audience for a user's artwork
**Table Name:** `targetings`

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `age_range`: string
- `interests`: text (optional)

**Relationships:**
- one_to_many → User: A user can have many targeting options





### Instructions: Targeting

#### 1. TypeScript Types

Create **Types File** (`types/targeting.ts`):

**⚠️ CRITICAL: No Duplicate Fields!**
Each field must appear EXACTLY ONCE. Use consistent naming (snake_case for DB fields).

```typescript
// ✅ CORRECT: Each field once
export interface Targeting {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Custom fields:
  age_range: string;
  interests: string;
}

// ❌ WRONG: Duplicate fields!
export interface Targeting {
  id: string;        // 1x
  userId: string;    // mixed camelCase
  created_at: Date;  // wrong type (use string)
  user_id: string;   // DUPLICATE (snake_case)!
  id: string;        // DUPLICATE!
}
```

**TargetingListItem Interface:**
- Reduced version for List Views
- Only essential fields: id, created_at + first 3 custom fields

#### 2. Zod Validation Schema

Create **Schema File** (`lib/schemas/targeting.ts`):

**CreateTargetingSchema:**
- Zod Object with all custom fields
- Required vs Optional based on Field Definition
- Type Mapping:
  - string/text → z.string()
  - number/integer → z.number() / z.number().int()
  - boolean → z.boolean()
  - date/datetime → z.string() (ISO format)

**UpdateTargetingSchema:**
- Use Create Schema with .partial()
- All fields optional for updates

**Exports:**
- Schemas + Inferred Types

#### 3. API Routes - List & Create

Create **List/Create Route** (`app/api/targetings/route.ts`):

**GET /api/targetings (List):**
- Auth Check: User from Supabase
- Query Params: limit (default 20), cursor (pagination)
- Supabase Query:
  - Filter: user_id = current user
  - Order: created_at DESC
  - Limit: limit + 1 (for hasMore detection)
  - Cursor: created_at < cursor (if provided)
- Response: { data: items, meta: { next_cursor, has_more } }
- Error Handling: 401 (unauthorized), 500 (server error)

**POST /api/targetings (Create):**
- Auth Check: User from Supabase
- Body Validation: CreateTargetingSchema with safeParse
- Insert: Merge validated data + user_id
- Select: .select().single() for Created Object
- Response: { data } with 201 Status
- Error Handling: 400 (validation), 500 (server error)

#### 4. API Routes - Detail Operations

Create **Detail Route** (`app/api/targetings/[id]/route.ts`):

**GET /api/targetings/[id] (Read):**
- Params: id (await params promise)
- Auth Check: User from Supabase
- Query: .select().eq("id", id).eq("user_id", user.id).single()
- Response: { data }
- Error: 404 if not found

**PATCH /api/targetings/[id] (Update):**
- Params: id (await params promise)
- Auth Check + Body Validation
- Update: .update().eq("id").eq("user_id").select().single()
- Response: { data }
- Error: 400 (validation), 404 (not found)

**DELETE /api/targetings/[id] (Delete):**
- Params: id (await params promise)
- Auth Check
- Delete: .delete().eq("id").eq("user_id")
- Response: 204 No Content
- Error: 404 (not found)

**Important for all Routes:**
- User ID Check prevents access to other users' data
- NextRequest/NextResponse for Types
- await params as Promise (Next.js 15)

#### 5. SWR Data Fetching Hooks

Create **Hooks File** (`hooks/useTargetings.ts`):

**useTargetings() Hook:**
- SWR for List Fetching
- URL: /api/targetings
- Returns: { targetings, isLoading, error, mutate }

**useTargeting(id) Hook:**
- SWR for Single Item Fetching
- URL: /api/targetings/{id}
- Conditional: only fetch if id is provided
- Returns: { targeting, isLoading, error, mutate }

**useCreateTargeting() Hook:**
- POST Request Function
- Mutate List after Success
- Error Handling with throw

**useUpdateTargeting(id) Hook:**
- PATCH Request Function
- Mutate Item + List after Success
- Error Handling with throw

**useDeleteTargeting() Hook:**
- DELETE Request Function
- Mutate List after Success
- Error Handling with throw

**Important:**
- All Hooks are Client Components ("use client")
- Fetcher Function for SWR
- Proper Error Handling

#### 6. List Page

Create **List Page** (`app/(app)/targetings/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Client Component for List Rendering

**Layout:**
- Container with Padding
- Header: Title + "New" Button (right)
- List Component Integration

#### 7. List Component

Create **List Component** (`components/targeting/TargetingList.tsx`):

**States:**
- Loading: Skeleton Grid (6 items)
- Error: Error Message Card
- Empty: EmptyState Component with "Create New" Action
- Success: Grid with Items

**Grid Layout:**
- Responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- Gap: gap-4

**Item Cards:**
- Link to Detail Page
- Hover Effect: border-primary
- Content: Title + Created Date (adapt to Entity fields)

**Important:**
- "use client" Directive
- useTargetings() Hook for Data
- Proper Loading/Error/Empty States

#### 8. Detail Page

Create **Detail Page** (`app/(app)/targetings/[id]/page.tsx`):

**Functionality:**
- Server Component
- Auth Check
- Direct Supabase Fetch for SSR
- notFound() if Item doesn't exist
- Pass Data to Detail Component

**Security:**
- user_id Check in Query

#### 9. Detail Component

Create **Detail Component** (`components/targeting/TargetingDetail.tsx`):

**Props:**
- `targeting`: Targeting Object

**Layout:**
- Back Button (top left)
- Delete Button (top right)
- Card with Details:
  - ID
  - All Custom Fields (from Entity Definition)
  - Created/Updated Timestamps

**Delete Functionality:**
- Confirm Dialog
- useDeleteTargeting() Hook
- Router Push to List after Success
- Loading State during Delete

**Important:**
- "use client" Directive
- Router for Navigation
- Confirmation before Delete



---

## Entity 3: Goodread

**Description:** A user's favorite artwork or inspiration
**Table Name:** `goodreads`

**Fields:**
- `id`: uuid - Primary key
- `created_at`: datetime - Creation timestamp
- `updated_at`: datetime - Last update timestamp
- `user_id`: uuid - Owner user ID
- `title`: string
- `description`: text (optional)

**Relationships:**
- one_to_many → User: A user can have many goodreads





### Instructions: Goodread

#### 1. TypeScript Types

Create **Types File** (`types/goodread.ts`):

**⚠️ CRITICAL: No Duplicate Fields!**
Each field must appear EXACTLY ONCE. Use consistent naming (snake_case for DB fields).

```typescript
// ✅ CORRECT: Each field once
export interface Goodread {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Custom fields:
  title: string;
  description: string;
}

// ❌ WRONG: Duplicate fields!
export interface Goodread {
  id: string;        // 1x
  userId: string;    // mixed camelCase
  created_at: Date;  // wrong type (use string)
  user_id: string;   // DUPLICATE (snake_case)!
  id: string;        // DUPLICATE!
}
```

**GoodreadListItem Interface:**
- Reduced version for List Views
- Only essential fields: id, created_at + first 3 custom fields

#### 2. Zod Validation Schema

Create **Schema File** (`lib/schemas/goodread.ts`):

**CreateGoodreadSchema:**
- Zod Object with all custom fields
- Required vs Optional based on Field Definition
- Type Mapping:
  - string/text → z.string()
  - number/integer → z.number() / z.number().int()
  - boolean → z.boolean()
  - date/datetime → z.string() (ISO format)

**UpdateGoodreadSchema:**
- Use Create Schema with .partial()
- All fields optional for updates

**Exports:**
- Schemas + Inferred Types

#### 3. API Routes - List & Create

Create **List/Create Route** (`app/api/goodreads/route.ts`):

**GET /api/goodreads (List):**
- Auth Check: User from Supabase
- Query Params: limit (default 20), cursor (pagination)
- Supabase Query:
  - Filter: user_id = current user
  - Order: created_at DESC
  - Limit: limit + 1 (for hasMore detection)
  - Cursor: created_at < cursor (if provided)
- Response: { data: items, meta: { next_cursor, has_more } }
- Error Handling: 401 (unauthorized), 500 (server error)

**POST /api/goodreads (Create):**
- Auth Check: User from Supabase
- Body Validation: CreateGoodreadSchema with safeParse
- Insert: Merge validated data + user_id
- Select: .select().single() for Created Object
- Response: { data } with 201 Status
- Error Handling: 400 (validation), 500 (server error)

#### 4. API Routes - Detail Operations

Create **Detail Route** (`app/api/goodreads/[id]/route.ts`):

**GET /api/goodreads/[id] (Read):**
- Params: id (await params promise)
- Auth Check: User from Supabase
- Query: .select().eq("id", id).eq("user_id", user.id).single()
- Response: { data }
- Error: 404 if not found

**PATCH /api/goodreads/[id] (Update):**
- Params: id (await params promise)
- Auth Check + Body Validation
- Update: .update().eq("id").eq("user_id").select().single()
- Response: { data }
- Error: 400 (validation), 404 (not found)

**DELETE /api/goodreads/[id] (Delete):**
- Params: id (await params promise)
- Auth Check
- Delete: .delete().eq("id").eq("user_id")
- Response: 204 No Content
- Error: 404 (not found)

**Important for all Routes:**
- User ID Check prevents access to other users' data
- NextRequest/NextResponse for Types
- await params as Promise (Next.js 15)

#### 5. SWR Data Fetching Hooks

Create **Hooks File** (`hooks/useGoodreads.ts`):

**useGoodreads() Hook:**
- SWR for List Fetching
- URL: /api/goodreads
- Returns: { goodreads, isLoading, error, mutate }

**useGoodread(id) Hook:**
- SWR for Single Item Fetching
- URL: /api/goodreads/{id}
- Conditional: only fetch if id is provided
- Returns: { goodread, isLoading, error, mutate }

**useCreateGoodread() Hook:**
- POST Request Function
- Mutate List after Success
- Error Handling with throw

**useUpdateGoodread(id) Hook:**
- PATCH Request Function
- Mutate Item + List after Success
- Error Handling with throw

**useDeleteGoodread() Hook:**
- DELETE Request Function
- Mutate List after Success
- Error Handling with throw

**Important:**
- All Hooks are Client Components ("use client")
- Fetcher Function for SWR
- Proper Error Handling

#### 6. List Page

Create **List Page** (`app/(app)/goodreads/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Client Component for List Rendering

**Layout:**
- Container with Padding
- Header: Title + "New" Button (right)
- List Component Integration

#### 7. List Component

Create **List Component** (`components/goodread/GoodreadList.tsx`):

**States:**
- Loading: Skeleton Grid (6 items)
- Error: Error Message Card
- Empty: EmptyState Component with "Create New" Action
- Success: Grid with Items

**Grid Layout:**
- Responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- Gap: gap-4

**Item Cards:**
- Link to Detail Page
- Hover Effect: border-primary
- Content: Title + Created Date (adapt to Entity fields)

**Important:**
- "use client" Directive
- useGoodreads() Hook for Data
- Proper Loading/Error/Empty States

#### 8. Detail Page

Create **Detail Page** (`app/(app)/goodreads/[id]/page.tsx`):

**Functionality:**
- Server Component
- Auth Check
- Direct Supabase Fetch for SSR
- notFound() if Item doesn't exist
- Pass Data to Detail Component

**Security:**
- user_id Check in Query

#### 9. Detail Component

Create **Detail Component** (`components/goodread/GoodreadDetail.tsx`):

**Props:**
- `goodread`: Goodread Object

**Layout:**
- Back Button (top left)
- Delete Button (top right)
- Card with Details:
  - ID
  - All Custom Fields (from Entity Definition)
  - Created/Updated Timestamps

**Delete Functionality:**
- Confirm Dialog
- useDeleteGoodread() Hook
- Router Push to List after Success
- Loading State during Delete

**Important:**
- "use client" Directive
- Router for Navigation
- Confirmation before Delete


---

## Validation Checklist

Verify for EACH Entity:
- [ ] Types File created with correct Interfaces
- [ ] Zod Schema File with Create + Update Schemas
- [ ] API List/Create Route works
- [ ] API Detail Route works (GET, PATCH, DELETE)
- [ ] SWR Hooks File with all 5 Hooks
- [ ] List Page with Auth Check
- [ ] List Component with Loading/Error/Empty States
- [ ] Detail Page with Auth Check
- [ ] Detail Component with Delete Functionality

**Test per Entity:**
1. **Create:** Go to /ideas/new → Create Item → Redirect to List
2. **List:** List shows new Item
3. **Read:** Click on Item → Detail Page loads
4. **Update:** (built in Phase 08-forms)
5. **Delete:** Delete Button → Confirmation → Back to List

**API Tests:**
- POST /api/[entity]s → 201 with Created Item
- GET /api/[entity]s → 200 with Array
- GET /api/[entity]s/[id] → 200 with Object
- PATCH /api/[entity]s/[id] → 200 with Updated Item
- DELETE /api/[entity]s/[id] → 204

---

## Troubleshooting

**API 401 Errors:**
- Check Auth Check in all Routes
- Supabase Client correctly created?
- User is correctly retrieved?

**RLS Policy Errors:**
- Check if user_id is in Query
- RLS Policies active in Supabase?

**Pagination not working:**
- Cursor Logic: created_at < cursor
- hasMore Detection: length > limit

**SWR not updating:**
- Call mutate() after Mutations
- Fetcher Function correct?

**TypeScript Errors:**
- Types from database.types.ts generated?
- Zod Schemas export inferred Types

---

**Continue to:** `07-dashboard.md`
