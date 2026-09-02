# Electronics Management System

**Student Name:** Machale Acosta  
**Course:** Software Engineering 1 - Module 7  
**Entity:** Electronics Equipment  
**Repository:** MACHALE-Module7-VueSystem

---

## System Description

The Electronics Management System is a frontend prototype built with Vue.js 3 and Tailwind CSS v4. It allows administrators to manage electronic equipment inventory through a responsive web interface. This system was developed as part of the Module 7 activity for Software Engineering 1, translating the architectural design from Module 6 into a working frontend implementation.

## Selected Module 6 Entity

**Entity:** Electronics Equipment  
**Fields:**
- Asset Code (unique identifier)
- Equipment Name
- Category (Laptop, Desktop, Monitor, Printer, Router, Switch, Projector, UPS, Server, Other)
- Brand
- Model
- Serial Number
- Condition (New, Good, Fair, Poor)
- Status (Available, In Use, Under Repair, Retired)
- Location
- Quantity
- Date Acquired
- Notes (optional)

## Implemented Features

- [x] **Create** - Add new electronic equipment records with validation
- [x] **Read** - Display all records in a responsive table with badges
- [x] **Update** - Edit existing records with pre-filled form
- [x] **Delete** - Remove records with confirmation dialog
- [x] **Search** - Filter records by asset code, name, brand, category, model, location, or serial number
- [x] **Validation** - Prevent submission when required fields are empty
- [x] **Persistence** - All records saved to browser localStorage
- [x] **Login/Logout** - Authentication system with demo account
- [x] **Profile Management** - Changeable profile picture and user information that persists after logout
- [x] **Responsive Design** - Works on desktop, tablet, and mobile devices
- [x] **GitHub Actions CI** - Automated build check on every push

## Technologies Used

- Vue.js 3 (Composition API)
- Vite (Build tool)
- Tailwind CSS v4
- JavaScript (ES6+)
- Browser localStorage (Data persistence)
- Git & GitHub (Version control)
- GitHub Actions (CI/CD)

## Installation and Run Instructions

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/MACHALE-Module7-VueSystem.git
cd MACHALE-Module7-VueSystem

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open your browser and navigate to `http://localhost:5173/`

## Demo Account

- **Email:** acosta@gmail.com
- **Password:** admin123
- **Name:** Acosta Machale

## How localStorage Works

This application uses the browser's localStorage API to persist data:

- **Records Storage:** All equipment records are stored as a JSON array under the key `module7-electronics-records`
- **Profile Storage:** User profile data (name, email, role, avatar) is stored under `module7-electronics-profile`
- **Auth State:** Login status is stored under `module7-electronics-auth`

Data remains available even after:
- Page refresh
- Browser restart
- Closing and reopening the browser

To clear all data, use the browser's developer tools (Application > Local Storage) or clear site data.

## Connection Between Module 6 and Module 7

| Module 6 Element | Module 7 Implementation |
|-----------------|------------------------|
| Proposed complete system | Basis and long-term blueprint |
| Presentation layer | Vue components and Tailwind CSS interface |
| System module/entity | Electronics Equipment functional prototype |
| User interactions | Forms, buttons, record list, search, login |
| Application logic | JavaScript CRUD and validation functions |
| Data layer | Simulated using browser localStorage |
| Backend/API/Database | Future implementation; not required now |

## Application Screenshots

*(Screenshots to be included in the PDF report)*

1. Running Application
2. Add Record Form
3. Record List View
4. Edit Record
5. Delete Confirmation
6. Search Function
7. localStorage Data
8. Responsive View
9. GitHub Repository
10. Commit History
11. CI Success

## Known Limitations

1. **No Backend:** All data is stored in browser localStorage and will be lost if the user clears browser data
2. **No Multi-user Support:** Only single demo account available
3. **No Data Export:** Cannot export records to CSV or PDF yet
4. **Image Storage:** Profile pictures are stored as base64 strings in localStorage, which has size limitations
5. **No Real Authentication:** Password is hardcoded for demo purposes

## Proposed Future Improvements

1. Integrate a real backend API with database (MySQL/MongoDB)
2. Implement JWT-based authentication with multiple user roles
3. Add data export functionality (CSV, Excel, PDF)
4. Implement barcode/QR code scanning for asset codes
5. Add equipment maintenance scheduling and history tracking
6. Implement dashboard with charts and analytics
7. Add email notifications for equipment status changes
8. Cloud-based image storage for profile pictures

## License

This project is created for educational purposes as part of Software Engineering 1 coursework.
