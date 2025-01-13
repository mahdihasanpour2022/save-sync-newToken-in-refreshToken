export interface UserAddresses {
	id: number;
	title?: string;
	country: {
		id: number;
		name: string;
	};
	state: {
		id: number;
		name: string;
	};
	city: {
		id: number;
		name: string;
	};
	address: string;
	simpleAddress: string;
	postalcode: string;
	phoneNumber: string;
	mainStreet: string;
	alley: string;
	floor: string;
	unit: string;
	plaque: string;
	lat: string;
	lng: string;
	defaultAddress: boolean;
}
