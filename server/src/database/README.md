# Database Structure

Run SQL files in this order:

1. migrations/001_extensions.sql
2. migrations/002_organizations.sql
3. migrations/003_hotels.sql
4. migrations/004_addresses.sql
5. migrations/005_branches.sql
6. migrations/006_users.sql
7. migrations/007_roles_permissions.sql
8. migrations/008_user_access.sql
9. migrations/009_room_management.sql
10. migrations/010_guests.sql
11. migrations/011_bookings.sql
12. migrations/012_stay_finance.sql
13. migrations/013_operations.sql
14. migrations/014_notifications_audit.sql
15. migrations/015_indexes.sql
16. functions/001_core_functions.sql
17. triggers/001_updated_at.sql
18. seeds/001_permissions.sql
19. seeds/002_roles.sql

Core hierarchy:

Organization -> Hotel -> Branch -> Rooms/Bookings/Payments/Operations

Access:

User -> Role -> Permissions
User -> User Hotels / User Branches

IMPORTANT:
The application server must validate branch access before reading or
modifying branch-scoped records. A branch_id from the frontend is
never sufficient authorization by itself.
