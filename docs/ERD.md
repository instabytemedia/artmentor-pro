# Entity Relationship Diagram - ArtMentor Pro

> **Auto-generated** from your idea analysis
> **Entities:** 3

---

## Visual Diagram

```mermaid
erDiagram
    profiles {
        uuid id PK
        text username UK
        text display_name
        text avatar_url
        timestamptz created_at
        timestamptz updated_at
    }

    ideas {
        uuid id PK
        uuid user_id FK
        uuid id
        timestamptz created_at
        timestamptz updated_at
        uuid user_id FK
        text title
        text description
        timestamptz created_at
        timestamptz updated_at
    }

    targetings {
        uuid id PK
        uuid user_id FK
        uuid id
        timestamptz created_at
        timestamptz updated_at
        uuid user_id FK
        text age_range
        text interests
        timestamptz created_at
        timestamptz updated_at
    }

    goodreads {
        uuid id PK
        uuid user_id FK
        uuid id
        timestamptz created_at
        timestamptz updated_at
        uuid user_id FK
        text title
        text description
        timestamptz created_at
        timestamptz updated_at
    }

    %% Relationships
    profiles ||--o{ ideas : owns
    profiles ||--o{ targetings : owns
    profiles ||--o{ goodreads : owns
    ideas ||--o{ users : "A user can have many ideas"
    targetings ||--o{ users : "A user can have many targeting options"
    goodreads ||--o{ users : "A user can have many goodreads"
```

---

## Entity Details

### Idea
> A user's artistic idea or concept

**Fields:**
  - `id`: uuid (required) - Primary key
  - `created_at`: datetime (required) - Creation timestamp
  - `updated_at`: datetime (required) - Last update timestamp
  - `user_id`: uuid (required) - Owner user ID
  - `title`: string (required)
  - `description`: text

**Relationships:**
  - one_to_many → **User**: A user can have many ideas

### Targeting
> The target audience for a user's artwork

**Fields:**
  - `id`: uuid (required) - Primary key
  - `created_at`: datetime (required) - Creation timestamp
  - `updated_at`: datetime (required) - Last update timestamp
  - `user_id`: uuid (required) - Owner user ID
  - `age_range`: string (required)
  - `interests`: text

**Relationships:**
  - one_to_many → **User**: A user can have many targeting options

### Goodread
> A user's favorite artwork or inspiration

**Fields:**
  - `id`: uuid (required) - Primary key
  - `created_at`: datetime (required) - Creation timestamp
  - `updated_at`: datetime (required) - Last update timestamp
  - `user_id`: uuid (required) - Owner user ID
  - `title`: string (required)
  - `description`: text

**Relationships:**
  - one_to_many → **User**: A user can have many goodreads

---

## Notes

- All entities have standard fields: `id`, `user_id`, `created_at`, `updated_at`
- `PK` = Primary Key, `FK` = Foreign Key, `UK` = Unique Key
- Copy the Mermaid code block to visualize in any Mermaid-compatible tool
- Relationships: `||--o{` = one-to-many, `||--||` = one-to-one, `}o--o{` = many-to-many
