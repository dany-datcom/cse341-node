const { getDB } = require("../database/connect");

const createTestData = async () => {
  const db = getDB();

  const projectResult = await db.collection("projects").insertOne({
    title: "Test Project",
    description: "This is a test project",
    status: "Not Started",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    owner: "Test Owner",
    budget: 1000,
    isTestData: true,
    createdAt: new Date()
  });
  

  const taskResult = await db.collection("tasks").insertOne({
    title: "Test Task",
    description: "This is a test task",
    status: "Not Started",
    priority: "Medium",
    assignedTo: "Test User",
    dueDate: new Date().toISOString(),
    projectId: projectResult.insertedId.toString(),
    isTestData: true,
    createdAt: new Date()
  });
  
  const teamResult = await db.collection("teams").insertOne({
    name: "Test Team",
    description: "This is a test team",
    teamLead: "Test Lead",
    memberCount: 5,
    department: "Engineering",
    status: "Active",
    createdDate: new Date().toISOString(),
    isTestData: true,
    createdAt: new Date()
  });
  
  const userResult = await db.collection("users").insertOne({
    name: "Test User",
    email: "test@example.com",
    role: "member",
    phone: "123456789",
    department: "Engineering",
    status: "Active",
    joinDate: new Date().toISOString(),
    isTestData: true,
    createdAt: new Date()
  });
  
  return {
    projectId: projectResult.insertedId,
    taskId: taskResult.insertedId,
    teamId: teamResult.insertedId,
    userId: userResult.insertedId
  };
};

const cleanupTestData = async () => {
  try {
    const db = getDB();
    
    await db.collection("projects").deleteMany({ isTestData: true });
    await db.collection("tasks").deleteMany({ isTestData: true });
    await db.collection("teams").deleteMany({ isTestData: true });
    await db.collection("users").deleteMany({ isTestData: true });
    
    console.log("✅ Test data cleaned up");
  } catch (error) {
    console.log("⚠️ Cleanup skipped - database may already be closed");
  }
};

module.exports = { createTestData, cleanupTestData };