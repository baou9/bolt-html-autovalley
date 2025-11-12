# 📱 Responsive Breakpoints - Quick Reference Card

## 🎯 At-A-Glance Breakpoint Map

```
┌─────────────┬──────────┬─────────────────────────────────┐
│ Breakpoint  │   Width  │ Key Visual Changes              │
├─────────────┼──────────┼─────────────────────────────────┤
│ XS          │ 320-374  │ 2 nav, 24px logo, vertical     │
│ SM          │ 375-479  │ 3 nav, 28px logo                │
│ MD          │ 480-767  │ Horizontal, CTA text, 30px logo │
│ LG          │ 768-1023 │ Desktop bar, 6 nav, 38px logo   │
│ XL          │ 1024-1199│ 42px logo, 32px padding         │
│ 2XL         │ 1200-1439│ 44px logo, 36px padding         │
│ 3XL         │ 1440-1919│ Full design, 40px padding       │
│ 4XL         │ 1920+    │ Max-width 1440px, centered      │
└─────────────┴──────────┴─────────────────────────────────┘
```

## 📊 Visual Layout by Device

### 📱 Mobile (320-767px)
```
┌────────────────────────────────┐
│ ┌──────────────────────────┐  │
│ │ 🚗 Nav Nav Nav           │  │ ← Light Bubble
│ └──────────────────────────┘  │
│                                │
│ ┌──────────────────────────┐  │
│ │ 🌙 🇫🇷 [Prendre RDV]      │  │ ← Dark Bubble
│ └──────────────────────────┘  │
└────────────────────────────────┘
```

### 📟 Tablet (768-1023px)
```
┌────────────────────────────────────────────┐
│ ┌────────────────────────────────────────┐ │
│ │ 🚗 Nav Nav Nav Nav Nav Nav 🇫🇷 🌙 [CTA] │ │
│ └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

### 💻 Desktop (1024px+)
```
┌──────────────────────────────────────────────────────┐
│ ┌──────────────────────────────────────────────────┐ │
│ │ 🚗 Nav Nav Nav Nav Nav Nav    🇫🇷 🌙 [Prendre RDV] │ │
│ └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

## 🎨 Element Sizing Matrix

| Element       | XS    | SM    | MD    | LG    | XL    | 2XL   | 3XL+  |
|---------------|-------|-------|-------|-------|-------|-------|-------|
| **Logo**      | 24px  | 28px  | 30px  | 38px  | 42px  | 44px  | 44px  |
| **Height**    | 48px  | 52px  | 54px  | 70px  | 75px  | 78px  | 80px  |
| **Nav Gap**   | 10px  | 12px  | 12px  | 24px  | 28px  | 32px  | 36px  |
| **Padding**   | 12px  | 16px  | 18px  | 28px  | 32px  | 36px  | 40px  |
| **Nav Items** | 2     | 3     | 3     | 6     | 6     | 6     | 6     |

## 🎭 Layout Transitions

### Mobile → Tablet (768px)
```diff
- Two bubble layout (vertical/horizontal)
+ Single bar layout
- Mobile nav (3 items)
+ Full nav (6 items)
- Mobile actions
+ Desktop actions with hover
```

### Tablet → Desktop (1024px)
```diff
- Compact spacing
+ Comfortable spacing
- 38px logo
+ 42px logo
- 24px nav gap
+ 28px nav gap
```

### Desktop → Large (1200px+)
```diff
- 42px logo
+ 44px logo (final size)
- 28px nav gap
+ 32px → 36px nav gap
- 32px padding
+ 36px → 40px padding
```

## 🎯 Critical Measurements

### Touch Targets (Mobile)
```
Minimum: 44px × 44px (WCAG AAA)
Actual:  48-52px × 44-52px ✅
```

### Text Sizes
```
Mobile Nav:  13-14px
Desktop Nav: 14-16px
CTA Mobile:  13-14px
CTA Desktop: 14-15px
```

### Border Radius
```
Mobile:  40px (more rounded)
Tablet:  22px (transition)
Desktop: 24px (balanced)
```

## 🚀 Performance Targets

| Metric | Mobile | Desktop | Status |
|--------|--------|---------|--------|
| FCP    | <1.5s  | <1.0s   | ✅     |
| LCP    | <2.5s  | <2.0s   | ✅     |
| CLS    | <0.1   | <0.1    | ✅     |
| TBT    | <200ms | <150ms  | ✅     |

## 🧪 Test Checklist

```
[ ] iPhone SE (320px portrait)
[ ] iPhone SE (568px landscape)
[ ] iPhone 12 Pro (390px)
[ ] iPhone 14 Pro Max (428px)
[ ] iPad Mini (768px)
[ ] iPad Pro (1024px)
[ ] MacBook Air (1280px)
[ ] MacBook Pro (1512px)
[ ] iMac 27" (2560px)
[ ] Ultrawide (3440px)
```

## 🎨 Theme Colors Quick Ref

### Light Mode
```css
BG:     rgba(255, 255, 255, 0.08)
Border: rgba(255, 0, 0, 0.22)
Text:   rgba(255, 255, 255, 0.92)
```

### Dark Mode
```css
BG:     rgba(0, 0, 0, 0.45)
Border: rgba(255, 0, 0, 0.3)
Text:   rgba(255, 255, 255, 0.95)
```

## 💡 Debug Mode

Add to test breakpoints:
```css
body::after {
  content: 'Breakpoint: XS (320px)';
  position: fixed;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 99999;
}
```

## 📞 Emergency Fixes

### Nav Overflow on Small Screens
```css
.mobile-nav {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

### Logo Too Large
```css
.logo-img-mobile {
  max-width: 120px; /* Adjust as needed */
}
```

### Touch Targets Too Small
```css
button, a {
  min-width: 44px;
  min-height: 44px;
}
```

---

**Print this card for quick reference during development!** 🖨️
