export interface User {
    userId: string,
    username: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string,
    phone: string | null,
    role: string,
    salary: number
}

// "userId": "bd385c97-42ae-4098-8a35-3489945c299e",
//   "userName": null,
//   "firstName": "TestUser",
//   "lastName": "TestUser",
//   "email": "testuseremail",
//   "phone": null,
//   "role": "Admin",
//   "salary": 0
// }