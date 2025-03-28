import config from "../config";
import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Admin from "../pages/admin/Home";
import Profile from "../pages/user/Profile";
import Introduce from "../pages/user/Introduce";
import Contact from "../pages/user/Contact";
import IncidentReport from "../pages/user/IncidentReport";
import IncidentList from "../pages/user/IncidentList";
import IncidentForm from "../pages/user/IncidentForm";
import DeviceLog from "../pages/user/DeviceLog";
import Assignment from "../pages/user/Assignment";
import AssignmentList from "../pages/user/AssignmentList";
import {
  addBuilding,
  editBuilding,
  listBuildings,
} from "../pages/admin/buildings";
import {
  addRoomType,
  editRoomType,
  listRoomTypes,
} from "../pages/admin/room_types";
import {
  addEquipment,
  editEquipment,
  listEquipments,
} from "../pages/admin/equipments";
import {
  addRepairTeam,
  editRepairTeam,
  listRepairTeams,
} from "../pages/admin/repair_teams";
import {
  addClassroom,
  editClassroom,
  listClassrooms,
} from "../pages/admin/classrooms";
import {
  addEquipmentRoom,
  editEquipmentRoom,
  listEquipmentRooms,
} from "../pages/admin/equipment_rooms";
import { addUser, editUser, listUsers } from "../pages/admin/users";
import {
  addIncidentReport,
  editIncidentReport,
  listIncidentReports,
} from "../pages/admin/incident_reports";
import { addAssignment, listAssignments } from "../pages/admin/assignments";

import { BuildingIncident, CrashReport, RoomIncident } from "../pages/admin/statistical";

//public
const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.introduce, component: Introduce },
  { path: config.routes.contact, component: Contact },
  { path: config.routes.incidentReport, component: IncidentReport },
  { path: config.routes.incidentList, component: IncidentList },
  { path: config.routes.incidentForm, component: IncidentForm },
  { path: config.routes.deviceLog, component: DeviceLog },
  { path: config.routes.assignment, component: Assignment },
  { path: config.routes.assignments, component: AssignmentList },
];

const privateRoutes = [
  { path: config.routes.admin, component: Admin },
  { path: config.routes.buildingsAdd, component: addBuilding },
  { path: config.routes.buildingsEdit, component: editBuilding },
  { path: config.routes.buildingsList, component: listBuildings },

  { path: config.routes.roomsTypeAdd, component: addRoomType },
  { path: config.routes.roomsTypeEdit, component: editRoomType },
  { path: config.routes.roomsTypeList, component: listRoomTypes },

  { path: config.routes.equipmentAdd, component: addEquipment },
  { path: config.routes.equipmentEdit, component: editEquipment },
  { path: config.routes.equipmentList, component: listEquipments },

  { path: config.routes.repairTeamAdd, component: addRepairTeam },
  { path: config.routes.repairTeamEdit, component: editRepairTeam },
  { path: config.routes.repairTeamList, component: listRepairTeams },

  { path: config.routes.classroomAdd, component: addClassroom },
  { path: config.routes.classroomEdit, component: editClassroom },
  { path: config.routes.classroomList, component: listClassrooms },

  { path: config.routes.roomEquipmentAdd, component: addEquipmentRoom },
  { path: config.routes.roomEquipmentEdit, component: editEquipmentRoom },
  { path: config.routes.classroomEquipment, component: listEquipmentRooms },

  { path: config.routes.userAdd, component: addUser },
  { path: config.routes.userEdit, component: editUser },
  { path: config.routes.userList, component: listUsers },

  { path: config.routes.incidentReportAdd, component: addIncidentReport },
  { path: config.routes.incidentReportEdit, component: editIncidentReport },
  { path: config.routes.incidentReportList, component: listIncidentReports },

  { path: config.routes.assignmentAdd, component: addAssignment },
  { path: config.routes.ListAssignmentsts, component:  listAssignments },

  { path: config.routes.buildingIncident, component: BuildingIncident },
  { path: config.routes.crashReport, component: CrashReport },
  { path: config.routes.roomIncident, component: RoomIncident },
  
];

export { publicRoutes, privateRoutes };
