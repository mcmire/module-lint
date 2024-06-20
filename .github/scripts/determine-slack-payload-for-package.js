const core = require('@actions/core');
const fs = require('fs');
const path = require('path');

const packageName = process.env.PACKAGE_NAME;
const moduleLintRunDirectory = process.env.MODULE_LINT_RUN_DIRECTORY;
const channelId = process.env.SLACK_CHANNEL_ID;
const threadTs = process.env.SLACK_THREAD_TS;

if (packageName === undefined) {
  throw new Error('Missing environment variable PACKAGE_NAME.');
}

if (moduleLintRunDirectory === undefined) {
  throw new Error('Missing environment variable MODULE_LINT_RUN_DIRECTORY.');
}

if (channelId === undefined) {
  throw new Error('Missing environment variable SLACK_CHANNEL_ID.');
}

if (threadTs === undefined) {
  throw new Error('Missing environment variable SLACK_THREAD_TS.');
}

const moduleLintOutput = fs.readFileSync(
  path.join(moduleLintRunDirectory, `${packageName}--output.txt`),
  'utf8',
);

const text = `Report for MetaMask/${packageName}`;

const blocks = {
  type: 'rich_text',
  elements: [
    {
      type: 'rich_text_section',
      elements: [
        {
          type: 'text',
          text: ' ',
        },
        {
          type: 'text',
          text: 'Report for ',
          style: {
            bold: true,
          },
        },
        {
          type: 'link',
          url: `https://github.com/MetaMask/${packageName}`,
          text: `MetaMask/${packageName}`,
          style: {
            bold: true,
          },
        },
        {
          type: 'text',
          text: ':\n\n',
        },
        {
          type: 'text',
          text: moduleLintOutput,
        },
      ],
    },
  ],
};

const slackPayload = {
  text,
  blocks,
  channel: channelId,
  thread_ts: threadTs,
};

core.setOutput('SLACK_PAYLOAD', JSON.stringify(slackPayload));
