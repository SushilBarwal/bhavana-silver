# Terms & Conditions Page - Now Dynamic ✅

## API Integration Complete

### Endpoint
```
GET /api/v1/terms
```

### Full URL
```
https://admin.bhavnasilverinternational.com/api/v1/terms
```

## API Response Structure

```json
{
  "success": true,
  "data": {
    "id": 1,
    "meta_title": "Terms and Conditions",
    "meta_description": "Terms and Conditions",
    "title": "Terms and Conditions",
    "last_updated": "Last Updated: November 2024",
    "intro_description": null,
    "intro_image": null,
    "sections": {
      "1": {
        "title": "1. Agreement to Terms",
        "description": "By accessing and using the Bhavana Silver Jewellery..."
      },
      "2": {
        "title": "2. Wholesale Business Model",
        "description": "Bhavana Silver Jewellery operates exclusively..."
      }
    }
  }
}
```

## What's Dynamic

### ✅ 1. Page Title
- Loads from `data.title`
- Default: "Terms and Conditions"

### ✅ 2. Last Updated Date
- Loads from `data.last_updated`
- Example: "Last Updated: November 2024"

### ✅ 3. Introduction Description (Optional)
- Loads from `data.intro_description`
- Shows in blue highlighted box if provided
- Currently null in API

### ✅ 4. Introduction Image (Optional)
- Loads from `data.intro_image`
- Full-width responsive image if provided
- Currently null in API

### ✅ 5. Dynamic Sections
- All sections from `data.sections` object
- Each section has:
  - `title` - Section heading
  - `description` - Section content
- Preserves line breaks with `whitespace-pre-line`

## Current API Data (Live)

Based on your API response:

**Title**: Terms and Conditions  
**Last Updated**: Last Updated: November 2024  
**Intro Description**: null (not shown)  
**Intro Image**: null (not shown)

**Sections** (5 sections currently):
1. "1. Agreement to Terms"
2. "2. Wholesale Business Model"
3. "3. Account Registration"
4. "4. Pricing and Payment"
5. "5. Order Processing and Fulfillment"

## Files Created/Modified

### 1. Created `src/api/terms.js`
```javascript
export const fetchTermsData = async () => {
  const response = await apiClient.get("/terms");
  return response.data.data || response.data;
};
```

### 2. Updated `src/pages/TermsPage.jsx`
- Added state management for terms data
- Added loading state with skeleton loader
- Fetches data on component mount
- Renders all content dynamically from API
- Handles errors gracefully

## Implementation Details

### Data Flow
```
1. Component Mounts
   ↓
2. useEffect Triggers
   ↓
3. fetchTermsData() Called
   ↓
4. API Request to /terms
   ↓
5. Response Received
   ↓
6. State Updated
   ↓
7. Component Renders with Dynamic Content
```

### Loading States
- Shows skeleton loader while fetching
- Smooth fade-in animation with GSAP
- Error handling with fallback message

### Content Rendering
```jsx
{/* Title */}
<h1>{termsData.title}</h1>

{/* Last Updated */}
{termsData.last_updated && (
  <p>{termsData.last_updated}</p>
)}

{/* Intro Description (Optional) */}
{termsData.intro_description && (
  <div className="bg-blue-50 border-l-4 border-primary">
    <p>{termsData.intro_description}</p>
  </div>
)}

{/* Intro Image (Optional) */}
{termsData.intro_image && (
  <img src={termsData.intro_image} alt={termsData.title} />
)}

{/* Dynamic Sections */}
{Object.values(termsData.sections).map(section => (
  <section>
    <h2>{section.title}</h2>
    <div className="whitespace-pre-line">
      {section.description}
    </div>
  </section>
))}
```

## Features

### ✅ SEO Friendly
- Meta title from `meta_title`
- Meta description from `meta_description`
- Proper heading hierarchy

### ✅ Responsive Design
- Mobile-friendly layout
- Responsive images (if provided)
- Touch-optimized

### ✅ Performance
- Single API call on mount
- Skeleton loader for better UX
- GSAP animations

### ✅ Error Handling
- Graceful fallback if API fails
- Loading states
- Error messages

### ✅ Content Formatting
- Preserves line breaks (`whitespace-pre-line`)
- Proper spacing between sections
- Clean typography

## Testing

Visit: **http://localhost:5174/terms**

1. Page should load with skeleton
2. Content appears from API
3. Check all sections render
4. Verify responsive design
5. Check breadcrumb navigation

### Browser Console
- No errors
- API call to `/api/v1/terms` returns 200
- Data structure matches expected format

## Benefits

✅ **No Hardcoded Content** - All from API  
✅ **Easy Updates** - Change content without code deployment  
✅ **Flexible Structure** - Add/remove sections via API  
✅ **SEO Optimized** - Meta tags from API  
✅ **Professional Design** - Clean, readable layout  
✅ **Production Ready** - Error handling and loading states  

## Comparison with Privacy Page

Both pages now use the same dynamic pattern:
- Same API structure
- Same loading states
- Same error handling
- Same content rendering logic
- Consistent user experience

## Next Steps (Optional)

1. **Add More Sections** - Backend can add unlimited sections
2. **Rich Text Support** - HTML formatting in descriptions
3. **Table of Contents** - Auto-generate from sections
4. **Print Styles** - Optimize for printing
5. **PDF Export** - Download as PDF option
6. **Version History** - Track changes over time

## Status: ✅ Complete

Terms & Conditions page is now fully dynamic and loading all content from the API!

**Last Updated**: December 29, 2025  
**Version**: 1.0  
**Status**: Production Ready ✅
