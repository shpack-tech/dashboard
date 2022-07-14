/**
 * Список параметров, которые надо передать в DashboardChart
 */
export interface IDashboardChart {
	active: number;
	completed: number;
	inactive: number;
	name: string;
}

/**
 * Используется для получения даннах о дашбордах в useState
 */
export interface IDashboard {
	dialogs: {
		active: number;
		completed: number;
		inactive: number;
		__typename: string;
	};
	lists: {
		active: number;
		completed: number;
		inactive: number;
		__typename: string;
	};
	scenarios: {
		active: number;
		completed: number;
		inactive: number;
		__typename: string;
	};
}
