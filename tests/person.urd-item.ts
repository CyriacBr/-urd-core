interface Option {
    context?: any;
    param?: string;
  }

  export namespace IPersonItem {
	export interface Inventory {
		readonly type: (option?: Option) => Promise<string>;
		readonly typeValues: Array<(option?: Option) => Promise<string>>;
		
		readonly slots: (option?: Option) => Promise<number>;
		readonly slotsValues: Array<(option?: Option) => Promise<number>>;
		
	}
}

export class PersonItem {
	readonly name: (option?: Option) => string;
	readonly nameValues: Array<(option?: Option) => string>;
	
	readonly age: (option?: Option) => Promise<number>;
	readonly ageValues: Array<(option?: Option) => Promise<number>>;
	
	readonly job: (option?: Option) => Promise<string | 'Developer' | 'UI/UX Designer'>;
	readonly jobValues: Array<(option?: Option) => Promise<string | 'Developer' | 'UI/UX Designer'>>;
	
	readonly hobbies: (option?: Option) => Promise<string[]>;
	readonly hobbiesValues: Array<(option?: Option) => Promise<string[]>>;
	
	readonly diary: (option?: Option) => Promise<string>;
	readonly diaryValues: Array<(option?: Option) => Promise<string>>;
	
	readonly likedFruits: (option?: Option) => Promise<string[]>;
	readonly likedFruitsValues: Array<(option?: Option) => Promise<string[]>>;
	
	readonly greeting: (option?: Option) => Promise<string>;
	readonly greetingValues: Array<(option?: Option) => Promise<string>>;
	
	readonly onWakeUp: (option?: Option) => (context: any) => Promise<any>;
	readonly onWakeUpValues: Array<(option?: Option) => (context: any) => Promise<any>>;
	
	readonly inventory: (option?: Option) => Promise<IPersonItem.Inventory>;
	readonly inventoryValues: Array<(option?: Option) => Promise<IPersonItem.Inventory>>;
	
};