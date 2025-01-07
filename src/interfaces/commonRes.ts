export interface CommonRes<Result = unknown, SingleResult = unknown> {
	hasError: boolean;
	message: string;
	count: number;
	result: Result;
	singleResult: SingleResult;
}