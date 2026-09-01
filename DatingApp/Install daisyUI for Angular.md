### Install daisyUI for Angular

How to install Tailwind CSS and daisyUI in a Angular project

### **1. Create a new Angular project**

Install Angular CLI globally

Terminal
```bash
npm install -g @angular/cli@latest
```

Create a new Angular project called my-project and navigate to it

Terminal
```bash
ng new my-project --style css
cd my-project
```

### **2. Install Tailwind CSS, PostCSS, and daisyUI***

Terminal
```bash
npm install daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest --force
```

Add Tailwind CSS plugin for PostCSS to a new .postcssrc.json file at root

.postcssrc.json
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

Put Tailwind CSS and daisyUI in your CSS file (and remove old styles)

src/styles.css
```css
@import "tailwindcss";
@plugin "daisyui";
```

Run the Angular development server

Terminal
```bash
ng serve
```

Now you can use daisyUI class names!

### **Note about modern CSS support**

Angular builds CSS for an old list of browsers by default, so modern CSS features like color-mix() (used by some daisyUI colors) can render differently than on daisyui.com.

To fix this, tell the build to target modern browsers by adding a browserslist to your package.json:

Terminal
```bash
npm pkg set browserslist="> 1%"
```

This tells Angular's CSS optimizer (Lightning CSS) to keep modern CSS instead of polyfilling it for outdated browsers — the same fix used in the Next.js guide. daisyUI and Tailwind CSS target modern browsers, so this doesn't drop any supported browser.

Alternatively, you can run Tailwind's own optimization step in .postcssrc.json:

.postcssrc.json
```json
{
  "plugins": {
    "@tailwindcss/postcss": {
      "optimize": true
    }
  }
}
```

Use "optimize": { "minify": false } if you'd rather keep the development CSS unminified.