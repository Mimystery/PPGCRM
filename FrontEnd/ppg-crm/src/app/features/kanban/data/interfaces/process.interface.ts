import { User } from "../../../../core/auth/data/interfaces/user.interface";
import { Task } from "./task.interface";

export interface ProcessDetails {
    processId: string;
    stageId: string;
    processName: string;
    startDate: Date | null;
    planEndDate: Date | null;
    factEndDate: Date | null;
    notes: string;
    problems:string;
    notDoneReasons: string;
    sortOrder: number;
    status: string;
    progress: number;
    totalProcessCost: number;
    tasks: Task[];
    responsibleUsers: User[];
}

// {
//   "stages": [
//     {
//       "stageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "projectId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       "stageName": "string",
//       "planEndDate": "2025-08-17T18:33:31.530Z",
//       "processes": [
//         {
//           "processId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "stageId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//           "processName": "string",
//           "startDate": "2025-08-17T18:33:31.530Z",
//           "planEndDate": "2025-08-17T18:33:31.530Z",
//           "factEndDate": "2025-08-17T18:33:31.530Z",
//           "notes": "string",
//           "notDoneReasons": "string",
//           "problems": "string",
//           "sortOrder": 0,
//           "status": "ToDo",
//           "progress": 0,
//           "totalProcessCost": 0,
//           "tasks": [
//             {
//               "taskId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "processId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "taskName": "string",
//               "isDone": true
//             }
//           ],
//           "responsibleUsers": [
//             {
//               "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//               "userName": "string",
//               "passwordHash": "string",
//               "firstName": "string",
//               "lastName": "string",
//               "email": "string",
//               "phone": "string",
//               "role": "Admin",
//               "salary": 0
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }
