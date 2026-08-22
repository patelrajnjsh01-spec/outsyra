export class GoogleMeetProvider {
    generateMeetingUrl(config) {
        if (config?.customUrl) return config.customUrl;
        // Direct Google Meet instant room generator or Google Calendar meet link
        const roomCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
        return `https://meet.google.com/${roomCode}`;
    }
}

export class JitsiMeetingProvider {
    domain;
    constructor() {
        this.domain = process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.jit.si";
    }
    generateMeetingUrl(config) {
        const cleanRoom = (config?.roomName || "coaching").toLowerCase().replace(/[^a-z0-9]/g, "-");
        return `https://${this.domain}/outsyra-${cleanRoom}-${Math.random().toString(36).substring(7)}`;
    }
}

export class VideoService {
    static instance;
    googleMeetProvider = new GoogleMeetProvider();
    jitsiProvider = new JitsiMeetingProvider();

    static getInstance() {
        if (!VideoService.instance) {
            VideoService.instance = new VideoService();
        }
        return VideoService.instance;
    }

    createMeeting(roomName, provider = "google_meet") {
        if (provider === "google_meet" || provider === "meet") {
            return this.googleMeetProvider.generateMeetingUrl({ roomName });
        }
        return this.jitsiProvider.generateMeetingUrl({ roomName });
    }
}
