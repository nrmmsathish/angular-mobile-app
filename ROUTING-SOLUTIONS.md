# Angular Routing Solutions for Direct File Access

## Problem
When you build an Angular app and try to open `index.html` directly in a browser, the router changes the URL from `file:///path/to/index.html` to routes like `file:///path/to/citi-home`, which doesn't work properly.

## Solutions

### Solution 1: Hash-Based Routing (✅ IMPLEMENTED)
This solution uses hash-based routing (`#/route`) which works with file:// URLs.

**What was changed:**
- Updated `src/main.ts` to use `withHashLocation()`
- URLs will now look like: `index.html#/citi-home`

**Pros:**
- Works with direct file access
- No server required
- URLs look like: `file:///path/to/index.html#/citi-home`

**Cons:**
- URLs contain `#` symbol
- Not as clean as HTML5 routing

### Solution 2: Local HTTP Server (✅ SCRIPTS PROVIDED)
Use the provided scripts to serve your dist folder via HTTP.

**Usage:**
```powershell
# Option 1: PowerShell script
.\serve-dist.ps1

# Option 2: Batch file
.\serve-dist.bat

# Option 3: Manual commands
cd dist\angular-mobile-app
python -m http.server 8080
# OR
npx http-server . -p 8080 -o
```

**Access your app at:** `http://localhost:8080`

**Pros:**
- Clean URLs without hash
- Proper HTTP environment
- Supports all Angular features

**Cons:**
- Requires running a server
- Need Python or Node.js

### Solution 3: Build with Base Href (Alternative)
For deployment to subfolders, you can also build with:
```bash
ng build --base-href ./
```

## Recommended Approach

1. **For Development/Testing:** Use Solution 2 (HTTP Server)
2. **For Distribution without server:** Use Solution 1 (Hash Routing)
3. **For Production:** Deploy to a proper web server

## Testing Hash Routing
After building with the updated configuration:
1. Build: `ng build`
2. Open `dist/angular-mobile-app/index.html` in browser
3. URLs will automatically include `#` for routing

## Notes
- Hash routing is already implemented in your main.ts
- The serve scripts are ready to use
- Hash routing maintains all functionality while allowing file:// access