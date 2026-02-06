# 08 - Forms & Validation

> **Agent:** Forms Agent 📝
> **Goal:** Create forms with react-hook-form + Zod

---

## Context

**Product:** ArtMentor Pro
**Entities with Forms:** Idea, Targeting, Goodread

---

## Instructions

### 1. Check Dependencies

Ensure the following dependencies are installed:
- `react-hook-form` - Form State Management
- `@hookform/resolvers` - Zod Integration

If not present, install them.

**Important:**
- Zod should already be installed from Setup
- Schemas should already exist in lib/schemas/ (from Phase 06)


### 2. Idea Form

Create **IdeaForm Component** (`components/idea/IdeaForm.tsx`):

**Props Interface:**
- `idea?`: Idea Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateIdeaSchema for Validation
- Distinguish Create vs Edit Mode (based on idea prop)
- useCreateIdea() Hook for Create
- useUpdateIdea(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `title` (text) - Required
- `description` (text) - Optional

**Layout:**
- Card Container
- CardHeader: Title ("New Idea" or "Edit Idea")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from idea prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New Idea Page** (`app/(app)/ideas/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render IdeaForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout



### 3. Targeting Form

Create **TargetingForm Component** (`components/targeting/TargetingForm.tsx`):

**Props Interface:**
- `targeting?`: Targeting Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateTargetingSchema for Validation
- Distinguish Create vs Edit Mode (based on targeting prop)
- useCreateTargeting() Hook for Create
- useUpdateTargeting(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `age_range` (text) - Required
- `interests` (text) - Optional

**Layout:**
- Card Container
- CardHeader: Title ("New Targeting" or "Edit Targeting")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from targeting prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New Targeting Page** (`app/(app)/targetings/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render TargetingForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout



### 4. Goodread Form

Create **GoodreadForm Component** (`components/goodread/GoodreadForm.tsx`):

**Props Interface:**
- `goodread?`: Goodread Object (if provided = Edit Mode)
- `onSuccess?`: Callback after successful submit

**Functionality:**
- Client Component ("use client")
- react-hook-form with zodResolver
- Use CreateGoodreadSchema for Validation
- Distinguish Create vs Edit Mode (based on goodread prop)
- useCreateGoodread() Hook for Create
- useUpdateGoodread(id) Hook for Edit
- Loading State during Submit
- Error Handling with Alert
- After Success: onSuccess Callback + Router Push to List + Router Refresh

**Form Fields:**
- `id` (text) - Required: Primary key
- `created_at` (text) - Required: Creation timestamp
- `updated_at` (text) - Required: Last update timestamp
- `user_id` (text) - Required: Owner user ID
- `title` (text) - Required
- `description` (text) - Optional

**Layout:**
- Card Container
- CardHeader: Title ("New Goodread" or "Edit Goodread")
- CardContent: Form Fields (space-y-4)
- CardFooter: Actions (justify-end gap-2)
  - Cancel Button (variant="outline", onClick → router.back())
  - Submit Button (type="submit", disabled during Loading)

**Field Layout (per field):**
- Container with space-y-2
- Label with htmlFor
- Input with register()
- Error Message (if errors.fieldName)

**Important:**
- register() with valueAsNumber for Number fields
- defaultValues from goodread prop (for Edit Mode)
- Proper Error Display under each field

---

Create **New Goodread Page** (`app/(app)/goodreads/new/page.tsx`):

**Functionality:**
- Server Component for Auth Check
- Redirect to /login if not authenticated
- Render GoodreadForm Component

**Layout:**
- Container with max-w-2xl + py-8
- Centered Form Layout


---

## Validation Checklist

Verify for EACH Entity:
- [ ] Form Component created
- [ ] New Page created with Auth Check
- [ ] react-hook-form integrated
- [ ] Zod Validation works
- [ ] Create Mode works
- [ ] Edit Mode works (when idea is passed)
- [ ] Loading State during Submit
- [ ] Error Messages are displayed
- [ ] Redirect after Success

**Test per Entity:**
1. **Create Test:**
   - Go to /[entity]s/new
   - Leave field empty → Validation Error displayed
   - Fill all fields → Submit
   - Redirected to list
   - New entry appears in list

2. **Validation Test:**
   - Required fields empty → Error
   - Number field with text → Error (if applicable)
   - Correct input → No Error

3. **Edit Test (if Detail Page exists):**
   - Open Entity Detail
   - Click Edit
   - Fields are pre-filled
   - Change value → Submit
   - Changes saved

---

## Troubleshooting

**Form submitted but nothing happens:**
- handleSubmit correctly passed to form onSubmit?
- async/await in onSubmit Handler?
- Errors being logged?

**Validation not working:**
- zodResolver correctly imported?
- Schema correctly passed to zodResolver?
- Schema exported from lib/schemas?

**Register not working:**
- Field Name exactly like in Schema?
- Input has {...register("fieldName")} spread?
- For Number: valueAsNumber Option?

**defaultValues being ignored:**
- useForm with defaultValues option?
- idea prop being passed?
- Object spread correct?

**No redirect after Submit:**
- router.push() called?
- router.refresh() for SSR Update?
- No Error in try/catch?

**TypeScript Errors:**
- CreateIdeaSchema imported?
- Type Inference from Zod: type CreateIdea = z.infer<typeof CreateIdeaSchema>
- useForm Generic: useForm<CreateIdea>()

---

**Continue to:** `09-landing.md`
