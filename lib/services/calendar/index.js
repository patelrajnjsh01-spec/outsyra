export class GoogleCalendarProvider {
    async createEvent(params, accessToken) {
        if (!accessToken) {
            // Fallback to internal calendar
            return {
                success: true,
                eventId: `gcal_sim_${Date.now()}`,
                meetingUrl: params.meetingUrl || `https://meet.jit.si/outsyra-${Date.now()}`,
                provider: "google_calendar",
            };
        }
        try {
            const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    summary: params.summary,
                    description: params.description,
                    start: { dateTime: params.startTime },
                    end: { dateTime: params.endTime },
                    attendees: [{ email: params.attendeeEmail, displayName: params.attendeeName }],
                    conferenceData: {
                        createRequest: {
                            requestId: `req_${Date.now()}`,
                            conferenceSolutionKey: { type: "hangoutsMeet" },
                        },
                    },
                }),
            });
            const data = await response.json();
            return {
                success: response.ok,
                eventId: data.id,
                meetingUrl: data.hangoutLink || params.meetingUrl,
                provider: "google_calendar",
            };
        }
        catch (err) {
            return {
                success: false,
                error: err.message,
                provider: "google_calendar",
            };
        }
    }
    async cancelEvent(eventId, accessToken) {
        if (!accessToken)
            return { success: true };
        try {
            const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            return { success: res.ok };
        }
        catch {
            return { success: false };
        }
    }
}
export class InternalCalendarProvider {
    async createEvent(params) {
        return {
            success: true,
            eventId: `internal_evt_${Date.now()}`,
            meetingUrl: params.meetingUrl || `https://meet.jit.si/outsyra-call-${Date.now()}`,
            provider: "internal",
        };
    }
    async cancelEvent() {
        return { success: true };
    }
}
export class CalendarService {
    static instance;
    googleProvider = new GoogleCalendarProvider();
    internalProvider = new InternalCalendarProvider();
    static getInstance() {
        if (!CalendarService.instance) {
            CalendarService.instance = new CalendarService();
        }
        return CalendarService.instance;
    }
    getProvider(hasGoogleToken) {
        return hasGoogleToken ? this.googleProvider : this.internalProvider;
    }
}
