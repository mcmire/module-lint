#!/usr/bin/env node

const fs = require('fs');
const executableName = process.argv[1];
const packageName = process.env.PACKAGE_NAME;
const moduleLintOutputFile = process.env.MODULE_LINT_OUTPUT_FILE;
const channelId = process.env.SLACK_CHANNEL_ID;
const threadTs = process.env.SLACK_THREAD_TS;

if (packageName === undefined) {
  console.log("Missing environment variable PACKAGE_NAME.");
  process.exit(1);
}

if (moduleLintOutputFile === undefined) {
  console.log("Missing environment variable MODULE_LINT_OUTPUT_FILE.");
  process.exit(1);
}

if (channelId === undefined) {
  console.log("Missing environment variable SLACK_CHANNEL_ID.");
  process.exit(1);
}

if (threadTs === undefined) {
  console.log("Missing environment variable SLACK_THREAD_TS.");
  process.exit(1);
}

const moduleLintOutput = fs.readFileSync(moduleLintOutputFile, "utf8");

const blocks = {
  "type": "rich_text",
  "elements": [
    {
      "type": "rich_text_section",
      "elements": [
        {
          "type": "text",
          "text": " "
        },
        {
          "type": "text",
          "text": "Report for ",
          "style": {
            "bold": true
          }
        },
        {
          "type": "link",
          "url": `https://github.com/MetaMask/${packageName}`,
          "text": `MetaMask/${packageName}`,
          "style": {
            "bold": true
          }
        },
        {
          "type": "text",
          "text": ":\n\n"
        },
        {
          "type": "text",
          "text": moduleLintOutput
        }
      ]
    }
  ]
}

const slackPayload = {
  blocks,
  channel: "CHANNEL_ID",
  thread_ts: "THREAD_TS",
};

console.log(`PAYLOAD=${JSON.stringify(slackPayload, " ", 2)}`);
