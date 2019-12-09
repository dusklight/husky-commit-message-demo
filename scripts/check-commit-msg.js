/*
  Assumptions:
  1. Only working with commit messages (tiny commit message files), so no need to worry about large file handling such as using a buffer.
  2. Assumed utf8 format, which is the git default unless changed explicitly (https://git-scm.com/docs/git-commit/#_discussion).
*/

// Used for console color coding.
const colorReset = "\x1b[0m";
const colorBrightRed = "\x1b[1;31m";
const colorGreen = "\x1b[32m";

const fs = require("fs");

// Customize the regex pattern below to match your desired commit message format.  The example pattern below checks
// that commit messages begin with a Jira ID where the Jira Project Key is "JIRA".
const pattern = /^JIRA-[0-9]+: .*/;

// The environment variable is set by Husky.  The value is: .git/COMMIT_EDITMSG
// Refer to https://git-scm.com/docs/githooks#_hooks for information on how git changes the working directory before
// executing hooks.
fs.readFile(process.env.HUSKY_GIT_PARAMS, "utf8", (err, data) => {
  if (err) throw err;

  if (data.match(pattern)) {
    console.log(colorGreen + "check-commit-msg: Passed." + colorReset);
  } else {
    console.log(
      colorBrightRed +
        'check-commit-msg: Failed - please begin your commit message with a Jira ID, followed by ":" and space e.g., "JIRA-123: Added commit message check."' +
        colorReset
    );
    process.exit(1);
  }
});
