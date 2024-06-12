#!/usr/bin/env node

const executableName = process.argv[1];
const moduleLintResult = process.env.MODULE_LINT_RESULT;

if (moduleLintResult === undefined) {
  console.log("Missing environment variable MODULE_LINT_RESULT.");
  process.exit(1);
}

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
  blocks,
  icon_url: "https://raw.githubusercontent.com/MetaMask/action-npm-publish/main/robo.png",
  username: "MetaMask Bot",
  channel: "#temp-test-module-lint",
};

console.log(`SLACK_PAYLOAD=${JSON.stringify(slackPayload, " ", 2)}`);
