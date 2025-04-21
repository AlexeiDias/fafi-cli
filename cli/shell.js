#!/usr/bin/env node
import inquirer from 'inquirer';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const actions = [
  { name: "➕ Add Transaction", value: "addTransaction.js" },
  { name: "➕ Add Bill", value: "addBill.js" },
  { name: "👁️ View Upcoming Bills", value: "viewBills.js" },
  { name: "🔔 Trigger Alerts", value: "triggerAlerts.js" },
  { name: "📤 Export Monthly Summary", value: "exportSummary.js" },
  { name: "✏️ Edit Transaction", value: "editTransaction.js" },
  { name: "❌ Delete Transaction", value: "deleteTransaction.js" },
  { name: "✏️ Edit Bill", value: "editBill.js" },
  { name: "❌ Delete Bill", value: "deleteBill.js" },
  { name: "🔍 View Transactions by Person", value: "viewByPerson.js" },
  { name: "💾 Backup to JSON", value: "backup.js" },
  { name: "♻️ Restore from JSON", value: "restore.js" },
  { name: "📊 View Budget Chart", value: "charts.js" },
  { name: "🧪 Run Functional Tests", value: "testRunner.js" },
  { name: "📜 View Test History", value: "testHistory.js" },
  { name: "❌ Bulk Delete Transactions", value: "multiDelete.js" },
  { name: "🚪 Exit", value: "exit" },
];

const main = async () => {
  console.clear();
  console.log("🧑‍💻 FAMILY FINANCIAL CLI 📊\n");

  const { command } = await inquirer.prompt([
    {
      type: "list",
      name: "command",
      message: "Select an action:",
      choices: actions,
    },
  ]);

  if (command === "exit") return process.exit(0);

  const filePath = path.join(__dirname, command);

  try {
    const child = exec(`node "${filePath}"`);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.on("exit", () => {
      setTimeout(main, 1000);
    });
  } catch (err) {
    console.error("🚨 Error running command:", err);
  }
};

main();
