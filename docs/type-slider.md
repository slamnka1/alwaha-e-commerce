# Type Slider Component

A responsive carousel component built with Embla Carousel for displaying product categories with images, Arabic text, and call-to-action buttons.

## Features

- **Responsive Design**: Adapts to different screen sizes with appropriate card layouts
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Internationalization**: Supports Arabic and English translations
- **API Integration**: Ready for real API data integration
- **Loading States**: Shows loading indicator while fetching data

## Usage

### Basic Usage

```tsx
import TypeSlider from '@/app/[locale]/_components/type'

export default function MyPage() {
  return (
    <div>
      <TypeSlider />
    </div>
  )
}
```

### Demo Page

Visit `/demo/type-slider` to see the component in action.

## Component Structure

### TypeSlider (Main Component)

- **Location**: `app/[locale]/_components/type.tsx`
- **Purpose**: Main carousel container with API integration
- **Features**:
  - Fetches data from API service
  - Handles loading states
  - Responsive carousel configuration
  - Navigation arrows

### TypeCard (Card Component)

- **Location**: `app/[locale]/_components/type-card.tsx`
- **Purpose**: Individual card display for each category
- **Features**:
  - Background image with overlay
  - Arabic category name
  - "View More" button
  - Hover animations

## API Integration

### API Service

- **Location**: `lib/api/types.ts`
- **Functions**:
  - `getTypeCategories()`: Fetches all categories
  - `getTypeCategory(id)`: Fetches single category by ID

### Data Structure

```typescript
interface TypeCategory {
  id: number
  imageUrl: string
  categoryName: string
  buttonText: string
  link: string
}
```

### Example API Response

```json
[
  {
    "id": 1,
    "imageUrl": "/girls.jpg",
    "categoryName": "حجابات",
    "buttonText": "رؤية المزيد",
    "link": "/category/hijabat"
  }
]
```

## Responsive Behavior

- **Mobile (< 768px)**: 1 card per view
- **Tablet (768px - 1024px)**: 2 cards per view
- **Desktop (1024px - 1280px)**: 3 cards per view
- **Large Desktop (> 1280px)**: 4 cards per view

## Styling

### Colors

- **Background**: Light gray (`bg-gray-50`)
- **Navigation Arrows**: Orange (`bg-orange-400`)
- **Text**: Dark gray for headings, medium gray for descriptions
- **Cards**: White background with shadow

### Animations

- **Hover Effects**: Scale transform on images and buttons
- **Transitions**: Smooth 300ms transitions
- **Loading**: Simple text-based loading indicator

## Internationalization

The component uses `next-intl` for translations:

```json
{
  "categories": {
    "title": "Product Categories",
    "subtitle": "Discover a diverse collection of distinctive products"
  }
}
```

## Customization

### Modifying Card Appearance

Edit `app/[locale]/_components/type-card.tsx` to change:

- Card dimensions
- Image overlay gradient
- Button styling
- Text sizes and colors

### Changing Carousel Behavior

Edit the carousel options in `app/[locale]/_components/type.tsx`:

```tsx
<Carousel
  opts={{
    align: 'start',
    loop: true,
    slidesToScroll: 1,
    // Add more options here
  }}
>
```

### Adding New Categories

Update the dummy data in `lib/api/types.ts` or connect to a real API endpoint.

## Dependencies

- `embla-carousel-react`: Carousel functionality
- `next-intl`: Internationalization
- `lucide-react`: Icons for navigation arrows
- `@/components/ui/button`: Button component
- `@/components/ui/carousel`: Carousel components

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Mobile browsers with touch gesture support
- Keyboard navigation for accessibility
