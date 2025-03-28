import { BuildingIncident } from "../pages/admin/statistical";

const routes = {
  //user
  home: '/home',
  login: '/',
  admin: '/admin',
  profile: '/profile',
  introduce: '/introduce',
  contact: '/contact',
  incidentReport: '/incident-report',
  incidentList: '/incident-list/:id',
  incidentForm: '/incident-form/:id',
  deviceLog: '/device-log',
  assignments: '/assignments',
  assignment: '/assignment',

  // admin
  // buildings
  buildingsAdd: '/admin/buildings/add',
  buildingsEdit: '/admin/buildings/edit/:id',
  buildingsList: '/admin/buildings',
  // rooms type
  roomsTypeAdd: '/admin/room-types/add',
  roomsTypeEdit: '/admin/room-types/edit/:id',
  roomsTypeList: '/admin/room-types',
  // equipment
  equipmentAdd: '/admin/equipments/add',
  equipmentEdit: '/admin/equipments/edit/:id',
  equipmentList: '/admin/equipments',

  // repair team
  repairTeamAdd: '/admin/repair-teams/add',
  repairTeamEdit: '/admin/repair-teams/edit/:id',
  repairTeamList: '/admin/repair-teams',

  // classroom
  classroomAdd: '/admin/classrooms/add',
  classroomEdit: '/admin/classrooms/edit/:id',
  classroomList: '/admin/classrooms',

  // room equipment
  roomEquipmentAdd: '/admin/room-equipments/add/:id',
  roomEquipmentEdit: '/admin/room-equipments/edit/:id',
  roomEquipmentList: '/admin/room-equipments',

  classroomEquipment: '/admin/classrooms-equipment/:id',

  //user
  userAdd: '/admin/users/add',
  userEdit: '/admin/users/edit/:id',
  userList: '/admin/users',

  //incident_report
  incidentReportAdd:'/admin/incident-reports/add',
  incidentReportEdit:'/admin/incident-reports/edit/:id',
  incidentReportList:'/admin/incident-reports',

  //assignment
  assignmentAdd:'/admin/assignments/add/:id',
  assignmentEdit:'/admin/assignments/edit/:id',
  assignmentList:'/admin/assignments',

  //statistical
  buildingIncident: '/admin/statistical/building-incident',
  roomIncident: '/admin/statistical/room-incident',
  crashReport: '/admin/statistical/crash-report',
  
};

export default routes;
