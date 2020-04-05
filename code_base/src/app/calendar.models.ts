export interface TimeData {
    unit: string;
    value: number;
  }
 
export interface InputEventData{
    start: number;
    end: number; 
};

export class CalenderEvent {
    id: number;
    position: number;
  
    start_x: number;
    end_x: number;

    start_y: number;
    end_y: number;  

    height: number;
    width: number;
  
    segments: number;
    group: CollisionGroup;
  
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
  
  export class CollisionGroup{
    group: CalenderEvent[];
    maxOccupiedRows: number;

    constructor() {
      this.group = [];
    }
    addToGroup(event){
      this.group.push(event);
    }
  }