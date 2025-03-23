# EcoMeet

![EcoMeet Logo](./generated-icon.png)

A sustainable solution for planning group gatherings that minimizes environmental impact through optimized transit options and intelligent location selection.

## Inspiration

The inspiration for EcoMeet came from observing how much carbon emission is generated when organizing meetings, events, and gatherings. Traditional approaches often lead to:

- Everyone driving separately to a location
- Meeting at venues that are inconvenient for most attendees
- No consideration for public transportation accessibility
- Lack of awareness about the environmental impact of travel choices

We wanted to create a tool that makes it easy for groups to make environmentally conscious decisions when planning gatherings, without sacrificing convenience.

## What it does

EcoMeet helps users find the most sustainable meeting locations and transportation options for group gatherings based on attendee locations. Key features include:

- **Sustainable Venue Finder**: Input potential meeting venues and attendee locations to find the optimal meeting spot that minimizes overall travel distance and carbon emissions.
- **Eco-friendly Transportation Options**: For each attendee, EcoMeet suggests the most sustainable transportation methods to reach the venue (public transit, cycling, walking).
- **Carbon Impact Analysis**: Visual metrics showing how much CO₂ is saved compared to everyone driving individually.
- **Interactive Map**: Visualizes attendee locations, potential venues, and transportation routes.
- **Transportation Details**: Provides specific information on transit routes, timing, and environmental impact.

## How we built it

EcoMeet is built using modern web technologies:

- **Frontend**: React.js with TypeScript for type safety
- **UI Components**: Custom components built with Tailwind CSS and shadcn/ui
- **State Management**: React hooks for local state management and TanStack Query for data fetching
- **Routing**: wouter for lightweight client-side routing
- **Backend**: Node.js with Express for API endpoints
- **Database Schema**: Drizzle ORM with PostgreSQL schema definitions
- **Algorithm**: Custom-built algorithm that:
  - Calculates distances between attendee locations and potential venues
  - Generates transportation options based on distance thresholds
  - Computes carbon metrics for each venue and transportation combination
  - Ranks venues by environmental impact and travel convenience

## Challenges we ran into

Building EcoMeet presented several interesting challenges:

1. **Balancing Factors**: Creating an algorithm that properly balances carbon impact, travel time, and convenience was complex. We had to determine which factors to prioritize and how to weight them.

2. **Data Accuracy**: Without integration with real transit APIs, we needed to create realistic mock data that would reasonably approximate real-world transportation options and carbon impacts.

3. **UX Design**: Presenting complex transportation and carbon data in a user-friendly way required multiple design iterations to ensure clarity without overwhelming users.

4. **Geographic Calculations**: Implementing distance calculations between coordinates using the Haversine formula to accurately measure travel distances.

5. **Transport Mode Selection**: Building logic to determine when walking, cycling, or public transit is appropriate based on distance thresholds.

## Accomplishments that we're proud of

1. **Intuitive UI/UX**: We created a clean, intuitive interface that makes it easy to understand complex transit and environmental information.

2. **Flexible Algorithm**: Our algorithm intelligently adapts to different city layouts and transportation scenarios, making it applicable across various urban environments.

3. **Visual Impact**: The carbon impact visualization effectively communicates the environmental benefits of optimized meeting planning.

4. **Practical Utility**: Even in its current iteration, EcoMeet provides actionable insights that can lead to meaningful carbon reduction for group gatherings.

5. **Modular Architecture**: The application is built with a clear separation of concerns, making it easy to extend with additional features and real-world data sources.

## What we learned

Through building EcoMeet, we learned:

- The significant environmental impact of meeting location and transportation choices
- How to effectively visualize carbon data in a way that's meaningful to users
- Techniques for optimizing transit routing based on carbon impact
- Strategies for balancing multiple factors (time, convenience, environmental impact) in recommendation algorithms
- The importance of user-centered design when building environmental impact tools

## What's next for EcoMeet

We have ambitious plans to evolve EcoMeet:

1. **Real Transit API Integration**: Connect with public transportation APIs (like Google Maps Transit, Transitland, etc.) to provide real-time transit options.

2. **User Accounts**: Allow users to save their common locations, preferred transit modes, and view their carbon impact over time.

3. **Calendar Integration**: Connect with calendar services to automatically suggest meeting locations based on attendees' schedules and locations.

4. **Carpool Matching**: Add functionality to match attendees for carpooling when public transit isn't viable.

5. **Weather-Aware Recommendations**: Incorporate weather forecasts to adjust recommendations (e.g., suggesting indoor venues during poor weather).

6. **Mobile App**: Develop a mobile application for on-the-go planning and transit navigation.

7. **Carbon Offset Integration**: Partner with carbon offset providers to allow users to offset unavoidable travel emissions.

8. **Company Dashboard**: Create organizational views to track carbon savings across all company meetings.

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecomeet.git
cd ecomeet
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Contributing

We welcome contributions to EcoMeet! Please feel free to submit a pull request or open an issue to discuss potential improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.