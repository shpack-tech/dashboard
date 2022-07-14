import { gql } from '@apollo/client';

export const GET_USER_DATA_QUERY = gql`
	query {
		dashboard {
			scenarios {
				active
				inactive
				completed
			}
			lists {
				active
				inactive
				completed
			}
			dialogs {
				active
				inactive
				completed
			}
		}
	}
`;
