const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

const moduleLintRunsDirectory = process.env.MODULE_LINT_RUNS_DIRECTORY;
const channelId = process.env.SLACK_CHANNEL_ID;

if (moduleLintRunsDirectory === undefined) {
  throw new Error('Missing environment variable MODULE_LINT_RUNS_DIRECTORY');
}

if (channelId === undefined) {
  throw new Error('Missing environment variable SLACK_CHANNEL_ID.');
}

const entryNames = fs
  .readdirSync(moduleLintRunsDirectory)
  .map((entryName) => path.join(moduleLintRunsDirectory, entryName));
const exitCodeFileNames = entryNames.filter((entry) =>
  entry.endsWith('--exitcode.txt'),
);
const exitCodes = exitCodeFileNames.map((exitCodeFileName) => {
  return Number(fs.readFileSync(exitCodeFileName, 'utf8').trim());
});
const allSuccessful = exitCodes.every((exitCode) => exitCode === 0);

const text =
  'A new package standardization report is available. Open this thread to view more details.';

const blocks = allSuccessful
  ? [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'emoji',
                name: 'package',
              },
              {
                type: 'text',
                text: ' ',
              },
              {
                type: 'text',
                text: 'A new package standardization report is available.',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: '\n\nGreat work! Your team has ',
              },
              {
                type: 'text',
                text: '5 repositories',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ' that fully align with the module template.\n\n',
              },
              {
                type: 'text',
                text: 'Open this thread to view more details:',
              },
              {
                type: 'emoji',
                name: 'point_right',
              },
            ],
          },
        ],
      },
    ]
  : [
      {
        type: 'rich_text',
        elements: [
          {
            type: 'rich_text_section',
            elements: [
              {
                type: 'emoji',
                name: 'package',
              },
              {
                type: 'text',
                text: ' ',
              },
              {
                type: 'text',
                text: 'A new package standardization report is available.',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: '\n\nYour team has ',
              },
              {
                type: 'text',
                text: '4 repositories',
                style: {
                  bold: true,
                },
              },
              {
                type: 'text',
                text: ' that require maintenance in order to align with the module template. This is important for maintaining conventions across MetaMask and adhering to our security principles.\n\n',
              },
              {
                type: 'link',
                url: 'https://example.com/',
                text: 'Read more about this alert',
              },
              {
                type: 'text',
                text: ', or open this thread to view more details and take action on it. ',
              },
              {
                type: 'emoji',
                name: 'point_right',
              },
            ],
          },
        ],
      },
    ];

const slackPayload = {
  text,
  blocks,
  icon_url:
    'https://raw.githubusercontent.com/MetaMask/action-npm-publish/main/robo.png',
  username: 'MetaMask Bot',
  channel: channelId,
};

core.setOutput('SLACK_PAYLOAD', JSON.stringify(slackPayload));
