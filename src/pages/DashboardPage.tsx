import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_DATA_QUERY } from '../GraphQL/Queries';
import { IDashboard } from '../interfaces';
import DashboardChart from '../components/DashboardChart/DashboardChart';

const DashboardPage: React.FC = () => {
	const { loading, data, error } = useQuery(GET_USER_DATA_QUERY);
	const [dashboardData, setDashboardData] = useState<IDashboard>({
		dialogs: {
			active: 0,
			completed: 0,
			inactive: 0,
			__typename: '',
		},
		lists: {
			active: 0,
			completed: 0,
			inactive: 0,
			__typename: '',
		},
		scenarios: {
			active: 0,
			completed: 0,
			inactive: 0,
			__typename: '',
		},
	});

	useEffect(() => {
		if (data !== undefined) {
			setDashboardData({
				dialogs: data.dashboard.dialogs,
				lists: data.dashboard.lists,
				scenarios: data.dashboard.lists,
			});
		}
		if (error) {
			console.log(error);
		}
	}, [data, loading]);

	return (
		// тут решил обойтись без map, так как тут всегда три сущности, и не придется по ключу объекта подбирать name
		<div className="dashboard">
			<DashboardChart
				name={'Сценарии'}
				completed={dashboardData.scenarios.completed}
				inactive={dashboardData.scenarios.inactive}
				active={dashboardData.scenarios.active}
			/>
			<DashboardChart
				name={'Списки'}
				completed={dashboardData.lists.completed}
				inactive={dashboardData.lists.inactive}
				active={dashboardData.lists.active}
			/>
			<DashboardChart
				name={'Диалоги'}
				completed={dashboardData.dialogs.completed}
				inactive={dashboardData.dialogs.inactive}
				active={dashboardData.dialogs.active}
			/>
		</div>
	);
};

export default DashboardPage;
