const fs = require("fs");
const path = require("path");

// 1. Folders you want the script to scan (adjust these paths if needed)
const TARGET_DIRS = ["./components", "./app", "./src/components", "./src/app"];

// 2. Your dictionary of Old Classes -> New Classes.
// Add any other old classes you remember using in your project here.
const classMappings = {
  // === BACKGROUNDS ===
  // Core Surfaces
  "bg-background": "bg-background",
  "bg-surface-container-lowest": "bg-background",
  "bg-surface-bright": "bg-background",
  "bg-surface": "bg-surface",
  "bg-surface-dim": "bg-surface",
  "bg-surface-container-low": "bg-surface",
  "bg-surface-container": "bg-surface",
  "bg-surface-container-high": "bg-surface",
  "bg-surface-container-highest": "bg-surface",
  "bg-surface-variant": "bg-surface",
  "bg-inverse-surface": "bg-gray-900", // standard tailwind dark

  // Primary Backgrounds
  "bg-primary": "bg-primary",
  "bg-primary-container": "bg-primary-dark", // Utilizing your new dark variant
  "bg-primary-fixed": "bg-primary",
  "bg-primary-fixed-dim": "bg-primary-dark",
  "bg-inverse-primary": "bg-primary",

  // Secondary Backgrounds
  "bg-secondary": "bg-secondary",
  "bg-secondary-container": "bg-secondary-dark",
  "bg-secondary-fixed": "bg-secondary",
  "bg-secondary-fixed-dim": "bg-secondary-dark",

  // Tertiary/Error (Falling back to standard tailwind or primary/secondary since new theme lacks these)
  "bg-tertiary": "bg-secondary",
  "bg-tertiary-container": "bg-secondary-dark",
  "bg-error": "bg-red-600",
  "bg-error-container": "bg-red-100",

  // === TEXT COLORS ===
  // On-Surfaces
  "text-on-background": "text-text",
  "text-on-surface": "text-text",
  "text-on-surface-variant": "text-text-muted",
  "text-inverse-on-surface": "text-gray-100",
  "text-outline": "text-text-muted",
  "text-outline-variant": "text-gray-400",

  // On-Primary/Secondary (Text inside colored buttons/cards)
  "text-on-primary": "text-white", // M3 on-primary is #ffffff
  "text-on-primary-container": "text-primary-dark",
  "text-primary-fixed-dim": "text-primary",
  "text-on-secondary": "text-white", // M3 on-secondary is #ffffff
  "text-on-secondary-container": "text-secondary-dark",
  "text-on-error": "text-white",

  // === BORDERS ===
  // Explicit opacities first so they don't get partially overridden
  "border-outline-variant/10": "border-gray-200",
  "border-outline-variant/30": "border-gray-200",
  "border-outline/10": "border-gray-300",
  "border-outline/30": "border-gray-300",

  "border-outline-variant": "border-gray-200",
  "border-outline": "border-gray-300",

  // === FONTS ===
  "font-label": "font-body",
  // Note: font-headline and font-body remain the same, so no script change needed
};

// Sort keys by length (longest first) to prevent partial replacements
// e.g., so 'bg-surface-container-low' is replaced before 'bg-surface-container'
const sortedKeys = Object.keys(classMappings).sort(
  (a, b) => b.length - a.length,
);

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(tsx|ts|jsx|js)$/.test(fullPath)) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let originalContent = content;

  // Perform replacements using word boundaries (\b) so we don't accidentally
  // replace "text-on-background-color" if it existed.
  for (const oldClass of sortedKeys) {
    const newClass = classMappings[oldClass];
    // Create a regex that globally replaces the exact old class name
    // Escaping forward slashes in class names like 'border/10'
    const escapedOldClass = oldClass.replace(/\//g, "\\/");
    const regex = new RegExp(`\\b${escapedOldClass}\\b`, "g");

    content = content.replace(regex, newClass);
  }

  // Only write to the file if changes were actually made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅ Updated: ${filePath}`);
  }
}

// 3. Run the script
console.log("Starting theme migration...");
TARGET_DIRS.forEach((dir) => walkDir(dir));
console.log("Migration complete!");
