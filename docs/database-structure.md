# Database Relationship

```text
organizations
    |
    +---- hotels
             |
             +---- branches
                    |
                    +---- room_types
                    |       |
                    |       +---- rooms
                    |
                    +---- bookings
                    |       |
                    |       +---- booking_rooms ---- rooms
                    |       +---- checkins
                    |       +---- checkouts
                    |       +---- invoices
                    |               |
                    |               +---- invoice_items
                    |       +---- payments
                    |
                    +---- housekeeping_tasks
                    +---- maintenance_tickets
                    +---- expenses
                    +---- notifications
                    +---- audit_logs

users
  +---- user_roles ---- roles ---- role_permissions ---- permissions
  +---- user_hotels --- hotels
  +---- user_branches - branches
```

Every operational module is branch-scoped. PostgreSQL functions are
provided for user branch access and room availability.
