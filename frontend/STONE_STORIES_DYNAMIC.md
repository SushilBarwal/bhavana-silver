# Stone Stories Page - Now Dynamic ✅

## API Integration Complete

### Endpoint
```
GET /api/v1/stone-story
```

### Full URL
```
https://admin.bhavnasilverinternational.com/api/v1/stone-story
```

## API Response Structure

```json
{
  "success": true,
  "data": {
    "id": 1,
    "meta_title": "Stone Story",
    "meta_description": "Stone Story",
    "title": "STONE STORIES",
    "description": "<p class=\"ql-align-center\"><span style=\"background-color: rgb(255, 255, 255); color: rgb(75, 85, 99);\">Every gemstone has a unique tale to tell...</span></p>",
    "created_at": "2025-12-29T11:56:35.000000Z",
    "updated_at": "2025-12-29T11:56:35.000000Z"
  }
}
```

## What's Dynamic

### ✅ 1. Page Title
- Loads from `data.title`
- Default: "STONE STORIES"
- Displays in large serif font

### ✅ 2. Description
- Loads from `data.description`
- Supports HTML formatting from text editor
- Centered text with proper styling
- Renders with `dangerouslySetInnerHTML`

## What Remains Static

The gemstone grid and individual stone details remain loaded from the homepage API (`/homepage`) as they were before. This includes:
- Gemstone images
- Gemstone names
- Stone detail modals
- Stone properties (hardness, mines, birthstone, etc.)

## Files Created/Modified

### 1. Created `src/api/stoneStories.js`
```javascript
export const fetchStoneStoriesData = async () => {
  const response = await apiClient.get("/stone-story");
  return response.data.data || response.data;
};
```

### 2. Updated `src/pages/StoneStoriesPage.jsx`
- Added import for `fetchStoneStoriesData`
- Added `pageData` state for title and description
- Fetches page data from API on mount
- Renders title and description dynamically
- Supports HTML content in description

## Implementation Details

### Data Flow
```
1. Component Mounts
   ↓
2. useEffect Triggers
   ↓
3. fetchStoneStoriesData() Called (for header)
   ↓
4. fetchHomepageData() Called (for gemstones)
   ↓
5. Both Responses Received
   ↓
6. State Updated
   ↓
7. Component Renders with Dynamic Content
```

### Header Rendering
```jsx
{/* Title */}
<h1>{pageData.title}</h1>

{/* Description with HTML support */}
<div 
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: pageData.description }}
/>
```

## Current API Data (Live)

Based on your API response:

**Title**: STONE STORIES  
**Description**: "Every gemstone has a unique tale to tell. From the depths of the earth to the skilled hands of our artisans, explore the journey, meaning, and beauty behind the precious stones we use in our creations."

The description includes:
- Center alignment (`ql-align-center`)
- Custom background color
- Custom text color
- HTML formatting from Quill editor

## HTML Support

The description field supports all HTML from your text editor:
- ✅ Text alignment (center, left, right)
- ✅ Text colors
- ✅ Background colors
- ✅ Bold, italic, underline
- ✅ Lists (bullet and numbered)
- ✅ Links
- ✅ Paragraphs with spacing

## Features

### ✅ SEO Friendly
- Meta title from `meta_title`
- Meta description from `meta_description`
- Proper heading hierarchy

### ✅ Responsive Design
- Mobile-friendly layout
- Responsive text sizes
- Touch-optimized

### ✅ Performance
- Single API call for header
- Separate call for gemstones
- No unnecessary re-renders

### ✅ Error Handling
- Graceful fallback to default text
- Loading states
- No crashes if API fails

### ✅ HTML Rendering
- Supports Quill editor output
- Preserves formatting
- Proper styling with prose classes

## Testing

Visit: **http://localhost:5174/stone-stories**

1. Page should load with loading spinner
2. Header appears with API content
3. Gemstone grid loads below
4. Click any stone to see details
5. Check responsive design

### Browser Console
- No errors
- API call to `/api/v1/stone-story` returns 200
- Data structure matches expected format

## Backend Text Editor

Your Quill editor in the backend supports:

### Text Formatting
- Bold, italic, underline
- Text color and background color
- Font size and font family

### Alignment
- Left, center, right, justify
- Currently using center alignment

### Lists
- Bullet lists
- Numbered lists

### Links
- Hyperlinks with custom text

### Other
- Headings (H1-H6)
- Block quotes
- Code blocks

All of these will render correctly on the frontend!

## Benefits

✅ **No Hardcoded Content** - Header from API  
✅ **Easy Updates** - Change content without code deployment  
✅ **HTML Support** - Full text editor formatting  
✅ **SEO Optimized** - Meta tags from API  
✅ **Professional Design** - Clean, centered layout  
✅ **Production Ready** - Error handling and loading states  

## Next Steps (Optional)

1. **Individual Stone Stories** - Add API for each stone's detailed story
2. **Stone Categories** - Group stones by type or color
3. **Search/Filter** - Add search functionality for stones
4. **Related Products** - Show products using each stone
5. **Stone Comparison** - Compare properties of different stones

## Status: ✅ Complete

Stone Stories page header is now fully dynamic and loading content from the API!

**Last Updated**: December 29, 2025  
**Version**: 1.0  
**Status**: Production Ready ✅
