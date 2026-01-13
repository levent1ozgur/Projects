# Github Selective Download

A lightweight web tool for selectively downloading files and folders from GitHub repositories without cloning the entire repo.

---

## Features

- **Selective Downloads**: Choose specific files and folders instead of downloading entire repositories
- **No Installation Required**: Runs entirely in your browser
- **GitHub Token Support**: Optional token authentication for higher rate limits (5,000 requests/hour vs 60/hour)
- **Visual File Tree**: Browse repository structure with expandable folders
- **Batch Operations**: Select all, select none, or pick individual files
- **ZIP Archive**: Downloads selected files in a convenient ZIP format
- **Rate Limit Monitoring**: Real-time display of GitHub API rate limit status
- **Privacy Focused**: Token stored only in browser memory, never logged or transmitted elsewhere

---

## Usage

1. Navigate to a GitHub folder in your browser
2. Copy the URL (format: `https://github.com/user/repo/tree/branch/path/to/folder`)
3. Paste the URL into the tool
4. (Optional) Add a GitHub personal access token for higher rate limits
5. Click "Fetch Files" to load the file tree
6. Select the files/folders you want
7. Click "Download Selected" to create and download a ZIP archive

---

## GitHub Token (Optional)

To increase your rate limit from 60 to 5,000 requests per hour:

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token (no special scopes required for public repos)
3. Paste the token into the "Optional GitHub Token" field

**Note**: The token is used only in your browser and sent exclusively to `api.github.com`.

---

## Technical Details

- Pure HTML/CSS/JavaScript implementation
- Uses GitHub API v3 for file tree retrieval
- Uses `raw.githubusercontent.com` for file content
- ZIP generation via [zip.js](https://gildas-lormeau.github.io/zip.js/)
- Content Security Policy enforced for security

---

## Browser Compatibility

Works in all modern browsers that support ES6+ JavaScript and the Fetch API.

---

*By Levent Özgür | [GitHub](https://github.com/levent1ozgur) | Visit [Github Selective Download](https://githubselectivedownload.netlify.app/)*  
