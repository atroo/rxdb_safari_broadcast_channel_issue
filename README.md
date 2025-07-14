# RxDB Leader Election Safari Redirection Bug

This project demonstrates an issue with RxDB leader election when using Safari on iOS and performing redirections between different applications. The specific bug occurs when a tab that might be elected as a leader is redirected to another application and then back.

## Issue Description

When using RxDB with leader election in Safari on iOS, if a leader tab (or the only tab) is redirected to another application and then back to the original application, none of the tabs will become the leader. This issue specifically affects Safari on iOS and doesn't occur in other browsers like Chrome or Firefox or Safari on macOS.

## Project Structure

- `app`: Main application with RxDB leader election at port 5173
- `auth-app`: Authentication simulation app at port 5174

## How to Reproduce the Issue

1. Start both applications in separate terminal windows:

### Terminal 1 (Main App):

```bash
cd app
npm install
npm run dev
```

### Terminal 2 (Auth App):

```bash
cd auth-app
npm install
npm run dev
```

2. **In Safari on iOS** (important!), open the main application at http://localhost:5173
3. You should see the RxDB leader election status showing that the tab is a leader (with a crown icon)
4. (Optional) Open a second Safari tab with the same URL - notice only one tab should be the leader
5. In the first (leader) tab, click the "Login" button, which redirects to the auth-app
6. The auth-app will show a 3-second countdown and automatically redirect back
7. **Expected behavior**: One tab should remain or become the leader
8. **Actual behavior in Safari**: After the redirect completes, no tab becomes the leader

## Additional Testing Steps

1. You can manually check leadership status by clicking the "Refresh Status" button
2. Reloading the tab or opening more tabs doesn't resolve the issue
3. Closing the tab that was redirected does resolve the issue
4. Closing and re-opening the browser does resolve the issue

## Technical Details

- Tested on Safari on iOS 18.3 and 18.5
- The main app uses RxDB v16.15.0 with the leader-election plugin
- The bug appears related to how Safari handles BroadcastChannel

This issue can cause problems in real applications where leader election is used to prevent duplicate operations or to manage resources efficiently.
