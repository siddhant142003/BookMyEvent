import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import {AttendeeDashboard} from "./pages/attendee/AttendeeDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";
import NotFound from "./pages/NotFound";
import CreateEvent from "./pages/organizer/CreateEvent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          {/* Organizer Routes */}
          <Route path="/organizer" element={<OrganizerDashboard />} />
          <Route path="/organizer/events" element={<OrganizerDashboard />} />
          <Route path="/organizer/analytics" element={<OrganizerDashboard />} />
          <Route path="/organizer/create" element={<CreateEvent />} />
          {/* Attendee Routes */}
          <Route path="/attendee" element={<AttendeeDashboard />} />
          <Route path="/attendee/tickets" element={<AttendeeDashboard />} />
          {/* Staff Routes */}
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/history" element={<StaffDashboard />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
