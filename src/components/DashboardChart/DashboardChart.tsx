import React, { useState } from 'react';
import { IDashboardChart } from '../../interfaces';

import './dashboardChart.scss';
const DashboardChart: React.FC<IDashboardChart> = ({ active, completed, inactive, name }) => {
	const total: number = active + completed + inactive;
	const activePercentage: number = Math.round((active / total) * 100);
	const completedPercentage: number = Math.round((completed / total) * 100);
	const inactivePercentage: number = Math.round((inactive / total) * 100);
	const [focus, setFocus] = useState<string>(''); // Задаются строки 'completed', 'active', 'inactive', 'total'. По ним меняются ховеры

	return (
		<div className="dashboard_chart">
			<div className="dashboard_chart__diagram">
				<svg viewBox="0 0 36 36" className="circular-chart">
					<path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />

					<path
						className="circle"
						strokeDasharray={`${activePercentage + inactivePercentage + completedPercentage}, 100`}
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						style={{ stroke: focus === 'completed' || focus === 'total' ? '#DEDCDC' : '#F2F0F5' }}
						onMouseOver={(): void => setFocus('completed')}
						onMouseLeave={(): void => setFocus('')}
					/>
					<path
						className="circle"
						strokeDasharray={`${activePercentage + inactivePercentage}, 100`}
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						style={{ stroke: focus === 'inactive' || focus === 'total' ? '#FCCF82' : '#D2CDD8' }}
						onMouseOver={(): void => setFocus('inactive')}
						onMouseLeave={(): void => setFocus('')}
					/>
					<path
						className="circle"
						strokeDasharray={`${activePercentage}, 100`}
						d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
						style={{ stroke: focus === 'active' || focus === 'total' ? '#F9A752' : '#B9B1C0' }}
						onMouseOver={(): void => setFocus('active')}
						onMouseLeave={(): void => setFocus('')}
					/>

					<g onMouseOver={(): void => setFocus('total')}>
						<text x="12" y="15.35" className="label">
							{name}
						</text>
						<text x="18" y="25.35" className="percentage">
							{focus === 'completed' ? completed : focus === 'active' ? active : focus === 'inactive' ? inactive : total}
						</text>
					</g>
				</svg>
			</div>
			<div className="dashboard_chart__legend">
				<div
					className="dashboard_chart__legend__all"
					style={focus === 'total' ? { color: 'rgb(168, 189, 247)', textDecoration: 'underline' } : { color: '#000', textDecoration: 'none' }}
					onMouseOver={(): void => setFocus('total')}
					onMouseLeave={(): void => setFocus('')}
				>
					<span>Всего: </span>
					<span>{total}</span>
				</div>
				<div
					className="dashboard_chart__legend__active"
					style={focus === 'active' ? { color: 'rgb(168, 189, 247)', textDecoration: 'underline' } : { color: '#000', textDecoration: 'none' }}
					onMouseOver={(): void => setFocus('active')}
					onMouseLeave={(): void => setFocus('')}
				>
					<span>Активных: </span> <span>{active}</span>
				</div>
				<div
					className="dashboard_chart__legend__inactive"
					style={focus === 'inactive' ? { color: 'rgb(168, 189, 247)', textDecoration: 'underline' } : { color: '#000', textDecoration: 'none' }}
					onMouseOver={(): void => setFocus('inactive')}
					onMouseLeave={(): void => setFocus('')}
				>
					<span>Неактивных:</span>
					<span>{inactive}</span>
				</div>
				<div
					className="dashboard_chart__legend__completed"
					style={focus === 'completed' ? { color: 'rgb(168, 189, 247)', textDecoration: 'underline' } : { color: '#000', textDecoration: 'none' }}
					onMouseOver={(): void => setFocus('completed')}
					onMouseLeave={(): void => setFocus('')}
				>
					<span>Завершенных:</span>
					<span>{completed}</span>
				</div>
			</div>
		</div>
	);
};

export default DashboardChart;
