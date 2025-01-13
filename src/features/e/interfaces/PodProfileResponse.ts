import { GenderEnum } from "@/interfaces/UserLoginData";

export interface PodProfileResponse {
	version: number | null;
	firstName: string | null;
	lastName: string | null;
	name: string | null;
	email?: string | null;
	nationalCode?: string | null;
	nationalCode_verified?: string | null;
	gender: GenderEnum | null;
	addressSrv: {
		id: number | null;
		address: string | null;
		city: string | null;
		state: string | null;
		country: string | null;
		phoneNumber: string | null;
		postalcode: string | null;
		latitude: number | null;
		longitude: number | null;
		simpleAddress: string | null;
		title: string | null;
	} | null;
	nickName: string | null;
	birthDate: number | null;
	profileImage: string | null;
	cellphoneNumber: string | null;
	userId: number | null;
	guest: boolean | null;
	chatSendEnable: boolean | null;
	chatReceiveEnable: boolean | null;
	username: string | null;
	ssoId: string | null;
	ssoIssuerCode: number | null;
	client_metadata: string | object | null;
	legalInfo: object | null;
	financialLevelSrv: {
		level: string | null;
		levelName: string | null;
		value: number | null;
	} | null;
	readOnlyFields: string | null;
	jobs: [] | null;
	registeredInSayyah: boolean | null;
}