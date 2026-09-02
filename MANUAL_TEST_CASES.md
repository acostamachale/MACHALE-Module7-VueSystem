# Manual Test Cases - Electronics Management System
## Module 8: Software Testing
### Student: Machale Acosta

---

## Feature 1: Add Record (Create Equipment)

### Test Case 1.1 - Positive: Add Valid Equipment Record
| Field | Value |
|-------|-------|
| **Test ID** | TC-ADD-001 |
| **Feature** | Add Record |
| **Description** | Add a new equipment record with all valid required fields |
| **Preconditions** | User is logged in, form is empty |
| **Test Steps** | 1. Enter Asset Code: EQP-004<br>2. Enter Equipment Name: Canon Printer<br>3. Select Category: Printer<br>4. Enter Brand: Canon<br>5. Enter Model: PIXMA G3020<br>6. Enter Serial Number: CN987654321<br>7. Select Condition: New<br>8. Select Status: Available<br>9. Enter Location: Room 205<br>10. Enter Quantity: 2<br>11. Select Date Acquired: 2024-01-15<br>12. Click "Add Equipment" |
| **Expected Result** | Record appears in the table with all entered data. Success message: "Equipment 'Canon Printer' added successfully!" |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

### Test Case 1.2 - Negative: Submit with Empty Required Fields
| Field | Value |
|-------|-------|
| **Test ID** | TC-ADD-002 |
| **Feature** | Add Record |
| **Description** | Attempt to submit form with all required fields left empty |
| **Preconditions** | User is logged in, form is empty |
| **Test Steps** | 1. Leave all fields empty<br>2. Click "Add Equipment" |
| **Expected Result** | Form submission is prevented. Red error messages appear under each required field: "This field is required". No record is added to the table. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

---

## Feature 2: Display Records (Read Equipment)

### Test Case 2.1 - Positive: Display Multiple Records
| Field | Value |
|-------|-------|
| **Test ID** | TC-DISP-001 |
| **Feature** | Display Records |
| **Description** | Verify that all added records are displayed correctly in the table |
| **Preconditions** | At least 3 equipment records exist in the system |
| **Test Steps** | 1. Log in to the system<br>2. Observe the Equipment Records table<br>3. Verify each record shows: Asset Code, Equipment Name, Category, Brand, Serial No., Condition, Status, Location, Qty |
| **Expected Result** | All records are displayed in a responsive table with correct data. Record count shows "X total records". Condition and Status badges are color-coded correctly. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

### Test Case 2.2 - Negative: Display with Corrupted localStorage Data
| Field | Value |
|-------|-------|
| **Test ID** | TC-DISP-002 |
| **Feature** | Display Records |
| **Description** | Test system behavior when localStorage contains invalid/corrupted JSON data |
| **Preconditions** | Developer Tools is open (F12) |
| **Test Steps** | 1. Open DevTools → Application → Local Storage<br>2. Find key "module7-electronics-records"<br>3. Modify the value to invalid JSON: `{invalid}`<br>4. Refresh the page |
| **Expected Result** | Application handles the error gracefully. Table shows empty state or default empty array. No application crash. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

---

## Feature 3: Edit Record (Update Equipment)

### Test Case 3.1 - Positive: Edit Existing Record Successfully
| Field | Value |
|-------|-------|
| **Test ID** | TC-EDIT-001 |
| **Feature** | Edit Record |
| **Description** | Update an existing equipment record with new valid data |
| **Preconditions** | At least one record exists in the table |
| **Test Steps** | 1. Click the Edit (pencil) icon on any record<br>2. Change Location from "Room 101" to "Room 305"<br>3. Change Status from "In Use" to "Available"<br>4. Change Quantity from 1 to 5<br>5. Click "Update Equipment" |
| **Expected Result** | Record is updated in the table with new values. Success message appears. Form returns to "Add Equipment" mode. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

### Test Case 3.2 - Negative: Edit with Invalid Quantity (Decimal Value)
| Field | Value |
|-------|-------|
| **Test ID** | TC-EDIT-002 |
| **Feature** | Edit Record |
| **Description** | Attempt to update a record with a decimal quantity value (DEFECT TEST) |
| **Preconditions** | At least one record exists, defect is present in code |
| **Test Steps** | 1. Click Edit on any record<br>2. Change Quantity to 2.5 (decimal)<br>3. Click "Update Equipment" |
| **Expected Result (Before Fix)** | Form accepts decimal value — DEFECT: quantity should be whole numbers only |
| **Expected Result (After Fix)** | Validation error appears: "Quantity must be a whole number (no decimals)". Update is prevented. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

---

## Feature 4: Delete Record

### Test Case 4.1 - Positive: Delete Record with Confirmation
| Field | Value |
|-------|-------|
| **Test ID** | TC-DEL-001 |
| **Feature** | Delete Record |
| **Description** | Remove an equipment record after confirming deletion |
| **Preconditions** | At least one record exists in the table |
| **Test Steps** | 1. Click the Delete (trash) icon on any record<br>2. Click "OK" on the confirmation dialog<br>3. Observe the table |
| **Expected Result** | Record is removed from the table. Success message: "Equipment 'X' deleted successfully!". Record count decreases by 1. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

### Test Case 4.2 - Negative: Cancel Delete Operation
| Field | Value |
|-------|-------|
| **Test ID** | TC-DEL-002 |
| **Feature** | Delete Record |
| **Description** | Cancel the deletion after clicking delete icon |
| **Preconditions** | At least one record exists in the table |
| **Test Steps** | 1. Click the Delete (trash) icon on any record<br>2. Click "Cancel" on the confirmation dialog<br>3. Observe the table |
| **Expected Result** | Record remains in the table unchanged. No success message appears. Record count stays the same. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

---

## Feature 5: Search / Validation

### Test Case 5.1 - Positive: Search Existing Record by Name
| Field | Value |
|-------|-------|
| **Test ID** | TC-SEARCH-001 |
| **Feature** | Search / Filter |
| **Description** | Find a record using the search field with a valid keyword |
| **Preconditions** | Multiple records exist in the system |
| **Test Steps** | 1. Type "Dell" in the search field<br>2. Observe the filtered table results |
| **Expected Result** | Table displays only records matching "Dell" (case-insensitive). Record count updates to show "Showing X of Y records". Footer shows "Filtered by: Dell". |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

### Test Case 5.2 - Negative: Search Non-Existent Value
| Field | Value |
|-------|-------|
| **Test ID** | TC-SEARCH-002 |
| **Feature** | Search / Filter |
| **Description** | Search for a value that does not exist in any record |
| **Preconditions** | Records exist in the system |
| **Test Steps** | 1. Type "XYZNONEXISTENT123" in the search field<br>2. Observe the table |
| **Expected Result** | Table shows empty state message: "No records found" with icon. "Try adjusting your search or add a new record" text appears. Record count shows 0. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

---

## Feature 6: Login / Authentication (Bonus)

### Test Case 6.1 - Positive: Login with Valid Credentials
| Field | Value |
|-------|-------|
| **Test ID** | TC-LOGIN-001 |
| **Feature** | Login / Authentication |
| **Description** | Log in using the demo account credentials |
| **Preconditions** | User is logged out |
| **Test Steps** | 1. Click "Login" button<br>2. Enter Email: acosta@gmail.com<br>3. Enter Password: admin123<br>4. Click "Sign In" |
| **Expected Result** | User is logged in. Welcome banner shows "Welcome back, Acosta Machale!". Header shows profile picture and Logout button. Equipment management interface is accessible. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

### Test Case 6.2 - Negative: Login with Invalid Password
| Field | Value |
|-------|-------|
| **Test ID** | TC-LOGIN-002 |
| **Feature** | Login / Authentication |
| **Description** | Attempt login with incorrect password |
| **Preconditions** | User is logged out |
| **Test Steps** | 1. Click "Login" button<br>2. Enter Email: acosta@gmail.com<br>3. Enter Password: wrongpassword<br>4. Click "Sign In" |
| **Expected Result** | Login fails. Error alert appears: "Invalid email or password. Use the demo account." User remains on login modal. |
| **Actual Result** | (To be filled during testing) |
| **Status** | ☐ Pass ☐ Fail |

---

## Defect Report

| Field | Details |
|-------|---------|
| **Defect ID** | DEF-001 |
| **Title** | Quantity field accepts decimal and NaN values |
| **Severity** | Medium |
| **Priority** | High |
| **Feature Affected** | Add Record / Edit Record |
| **Description** | The quantity input field in the RecordForm component uses HTML `type="number"` with `min="1"`, but this only prevents the spinner buttons from decrementing below 1. A user can still type decimal values (e.g., 2.5) or non-numeric characters directly into the field. The existing validation `if (!form.quantity || form.quantity < 1)` does not catch decimals or NaN values, allowing invalid data to be saved to localStorage. |
| **Steps to Reproduce** | 1. Log in to the system<br>2. Click "Add Equipment"<br>3. Fill all required fields<br>4. In Quantity field, type "2.5" or "abc"<br>5. Submit the form |
| **Expected Behavior** | Form should reject decimal and non-numeric quantity values with a clear error message. |
| **Actual Behavior** | Form accepts decimal values and NaN without validation error. Invalid data is stored in localStorage. |
| **Root Cause** | Missing integer validation and NaN check in the form submission handler. The validation only checked for values less than 1. |
| **Correction Made** | Updated validation in RecordForm.vue to:<br>1. Check for empty/null/undefined/NaN values<br>2. Check if value is an integer using `Number.isInteger()`<br>3. Check minimum value of 1 |
| **Retest Result** | After fix, entering "2.5" shows error: "Quantity must be a whole number (no decimals)". Entering "abc" shows error: "Quantity must be a valid number". Form submission is correctly prevented. |
| **Regression Test** | All other features (Add, Edit, Delete, Search, Login, Profile) continue to work correctly after the fix. Unit tests pass. |

---

## Test Summary

| Feature | Positive Tests | Negative Tests | Total |
|---------|---------------|----------------|-------|
| Add Record | 1 | 1 | 2 |
| Display Records | 1 | 1 | 2 |
| Edit Record | 1 | 1 | 2 |
| Delete Record | 1 | 1 | 2 |
| Search / Validation | 1 | 1 | 2 |
| Login (Bonus) | 1 | 1 | 2 |
| **Total** | **6** | **6** | **12** |

*Note: 10 required test cases are from Features 1-5. Features 6 (Login) are bonus test cases.*
