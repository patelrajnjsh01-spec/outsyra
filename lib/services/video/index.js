export class GoogleMeetProvider {
    generateMeetingUrl(config) {
        if (config?.customUrl) return config.customUrl;
        // Direct Google Meet instant room generator
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
        const uniqueId = Math.random().toString(36).substring(7);
        const displayName = encodeURIComponent(config?.displayName || "Creator");
        
        // Jitsi config parameters to bypass prejoin lobby, disable forced login prompts, and enter directly
        const configParams = [
            "config.prejoinPageEnabled=false",
            "config.prejoinConfig.enabled=false",
            "config.requireDisplayName=false",
            "config.disableDeepLinking=true",
            "config.startWithAudioMuted=false",
            "config.startWithVideoMuted=false",
            `userInfo.displayName="${displayName}"`,
        ].join("&");

        return `https://${this.domain}/outsyra-${cleanRoom}-${uniqueId}#${configParams}`;
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

    createMeeting(roomName, provider = "google_meet", displayName = "Creator") {
        if (provider === "google_meet" || provider === "meet") {
            return this.googleMeetProvider.generateMeetingUrl({ roomName });
        }
        return this.jitsiProvider.generateMeetingUrl({ roomName, displayName });
    }
}
