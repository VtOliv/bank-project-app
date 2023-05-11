export class PageResponse {
    constructor(
        public content: any[], 
        public numberOfElements: Number,
        public number: Number,
        public size: Number,
        public totalElements: Number,
        public totalPages: Number
        ) {}
  }
  