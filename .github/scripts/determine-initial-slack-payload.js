#!/usr/bin/env node

const core = require('@actions/core');

const moduleLintResult = process.env.MODULE_LINT_RESULT;
const channelId = process.env.SLACK_CHANNEL_ID;

if (moduleLintResult === undefined) {
  console.log("Missing environment variable MODULE_LINT_RESULT.");
  process.exit(1);
}

if (channelId === undefined) {
  console.log("Missing environment variable SLACK_CHANNEL_ID.");
  process.exit(1);
}

const text = "A new package standardization report is available. Open this thread to view more details.";

const blocks = (moduleLintResult === "success") ? [
  {
    "type": "rich_text",
    "elements": [
      {
        "type": "rich_text_section",
        "elements": [
          {
            "type": "emoji",
            "name": "package"
          },
          {
            "type": "text",
            "text": " "
          },
          {
            "type": "text",
            "text": "A new package standardization report is available.",
            "style": {
              "bold": true
            }
          },
          {
            "type": "text",
            "text": "\n\nGreat work! Your team has "
          },
          {
            "type": "text",
            "text": "5 repositories",
            "style": {
              "bold": true
            }
          },
          {
            "type": "text",
            "text": " that fully align with the module template.\n\n"
          },
          {
            "type": "text",
            "text": "Open this thread to view more details:"
          },
          {
            "type": "emoji",
            "name": "point_right"
          }
        ]
      }
    ]
  }
] :
  [
    {
      "type": "rich_text",
      "elements": [
        {
          "type": "rich_text_section",
          "elements": [
            {
              "type": "emoji",
              "name": "package"
            },
            {
              "type": "text",
              "text": " "
            },
            {
              "type": "text",
              "text": "A new package standardization report is available.",
              "style": {
                "bold": true
              }
            },
            {
              "type": "text",
              "text": "\n\nYour team has "
            },
            {
              "type": "text",
              "text": "4 repositories",
              "style": {
                "bold": true
              }
            },
            {
              "type": "text",
              "text": " that require maintenance in order to align with the module template. This is important for maintaining conventions across MetaMask and adhering to our security principles.\n\n"
            },
            {
              "type": "link",
              "url": "https://example.com/",
              "text": "Read more about this alert"
            },
            {
              "type": "text",
              "text": ", or open this thread to view more details and take action on it. "
            },
            {
              "type": "emoji",
              "name": "point_right"
            }
          ]
        }
      ]
    }
  ];

const slackPayload = {
  text,
  blocks,
  icon_url: "https://raw.githubusercontent.com/MetaMask/action-npm-publish/main/robo.png",
  username: "MetaMask Bot",
  channel: channelId,
};

core.setOutput('SLACK_PAYLOAD', JSON.stringify(slackPayload));
