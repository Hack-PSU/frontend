export class OrderedSet<T> extends Array<T> {

    private equalsFn: (a: T, b: T) => boolean;
    private itemType: string;
    /** Checks if the passed value has the right type */
    private _checkType = (value: T) => value.constructor.name === this.itemType;
  
    /**
     * @param equalsFn if undefined, strict equality operator "===" will be used
     * @param itemType items class name (because Typescript generics are not powerful enough (it lacks of "T.name"))
     * @param values: values to insert after set creation
     */
    constructor(equalsFn: (a: T, b: T) => boolean, itemType: string, values?: Array<T>) {
      super();
  
      if(equalsFn) {
        this.equalsFn = equalsFn;
      } else {
        this.equalsFn = (a: T, b: T) => a === b;
      }
  
      this.itemType = itemType;
  
      if(values) {
        this.addAll(values);
      }
    }
      
    add(value: T): OrderedSet<T> {
      if(!value || this._checkType(value) === false) {
        return this;
      }
  
      this.push(value);
      return this;
    }
  
    push(value: T): number {
      if(!value || this._checkType(value) === false) {
        return this.size();
      }
  
      if (this.has(value) === false)  {
          return super.push(value);
      } else {
          return this.size();
      }
    }
  
    has(value: T): boolean {
       if(!value || this._checkType(value) === false) {
        return false;
      }
  
      let found = false;
  
      super.forEach(item => {
        if (this.equalsFn(value, item) === true) {
          found = true;
        }
      });
  
      return found;
    }
  
    hasAll(values: Array<T>): boolean {
      if(!values || values.length == 0) {
        return false;
      } 
  
      return values.every((item) => this.has(item));
    }
    
    addAll(values: Array<T>): void {
      if(!values || values.length == 0) {
        return;
      } 
      
      values.forEach((item) => this.push(item));
    }
    
    size(): number {
      return this.length;
    }
  
    delete(value: T): boolean {
       if(!value || this._checkType(value) === false) {
        return false;
      } 
  
      // Find item in the list
      let foundIdx = -1;
      super.forEach( (item, index) => {
         if (this.equalsFn(value, item) === true) {
           foundIdx = index;
        }
      });
      
      // If item has been found => remove it from the list
      if(foundIdx !== -1) {
        super.splice(foundIdx, 1);
        return true;
      } else {
        return false;
      }
    }
  
    deleteAll(values: Array<T>): boolean {
      if(!values || values.length == 0) {
        return false;
      } 
      return values.every((item) => this.delete(item));
    }
  
    clear(): void {
      super.splice(0, this.size());
    }
  
    toArray(): Array<T> {
      let result: Array<T> = [];
      super.forEach(item => result.push(item));
      return result;
    }
  
    equals(other: OrderedSet<T>): boolean {
      if(!other) {
        return false;
      } 
      return other.size() === this.size() 
              && this.every((item) => other.has(item))
              && this.itemType === other.itemType;
    }
  }