;
export class CalenderEvent {
    constructor() {
        this.position = 0;
        this.start_x = 0;
        this.start_y = 0;
        this.end_x = 0;
        this.end_y = 0;
        this.height = 0;
        this.width = 0;
        this.segments = 0;
    }
}
export class CollisionGroup {
    constructor() {
        this.group = [];
    }
    addToGroup(event) {
        this.group.push(event);
    }
}
//# sourceMappingURL=models.js.map