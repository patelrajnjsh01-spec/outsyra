export class JitsiMeetingProvider {
    domain;
    constructor() {
        this.domain = process.env.NEXT_PUBLIC_JITSI_DOMAIN || "meet.jit.si";
    }
    generateMeetingUrl(config) {
        const cleanRoom = config.roomName.toLowerCase().replace(/[^a-z0-9]/g, "-");
        return `https://${this.domain}/outsyra-${cleanRoom}-${Math.random().toString(36).substring(7)}`;
    }
}
export class VideoService {
    static instance;
    jitsiProvider = new JitsiMeetingProvider();
    static getInstance() {
        if (!VideoService.instance) {
            VideoService.instance = new VideoService();
        }
        return VideoService.instance;
    }
    createMeeting(roomName) {
        return this.jitsiProvider.generateMeetingUrl({ roomName });
    }
}
