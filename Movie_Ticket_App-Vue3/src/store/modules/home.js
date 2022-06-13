import { initializeApollo } from '../apollo';
import {
	useQuery,
	useMutation,
	useSubscription,
	useResult,
} from '@vue/apollo-composable';
import { gql } from 'graphql-tag';
import { computed, watch } from 'vue';
initializeApollo();
// Create a new store instance.
const home = {
	namespaced: true,
	state: {
		num: 0,
		movieDetails: [],
		loading: false,
		error: '',
		isSearchOpen: false,
		bookLoading: false,
		bookError: '',
		bookSuccess: false,
		viewMovie: [],
		comments: [],

		commentData: {
			schedule_id: '',
			content: '',
		},
		reservationData: {
			name: '',
			email: '',
			phone_number: '',
			number_of_ticket: 1,
			cinima_id: '',
			scheduled_movie_id: '',
			booking_date: '',
			payment_varified: false,
		},
	},
	getters: {
		getNum: (state) => {
			return state.num;
		},
	},
	// we cant use async code ---commit
	mutations: {
		setMovies: (state, movies) => (state.movieDetails = movies),
		setLoading: (state, data) => (state.loading = data),
		setError: (state, error) => (state.error = error),
		setBookLoading: (state, loading) => (state.bookLoading = loading),
		setBookError: (state, error) => (state.bookError = error),
		setBookSuccess: (state, success) => (state.bookSuccess = success),
		setViewMovie: (state, movieDetailPage) =>
			(state.viewMovie = movieDetailPage),
		setComments: (state, comments) => (state.comments = comments),

		setCommentData: (state, commentData) =>
			(state.commentData = commentData),

		setReservationData: (state, reservationData) =>
			(state.reservationData = reservationData),
		setSearchValue: (state) =>
			(state.isSearchOpen = !state.isSearchOpen),
	},

	// actions
	actions: {
		async getAllMovies({ commit, state }) {
			const getScheduledMovie = gql`
				query {
					schedule_movies {
						id
						price
						cinima {
						    id
							cinima_name
						}
						schedule_dates {
							schedule_date
						}
						movie {
							movie_name
							movie_thumbnail
							movie_type
							published_year
							rating
							movie_description
							director_name
							actor_name
						}
					}
				}
			`;

			// executes getScheduledMovies query to the db and store its result on result object
			const { result, loading, error } =
				useQuery(getScheduledMovie);
			const scheduledMovies = useResult(
				result,
				null,
				(data) => data.schedule_movies
			);

			commit('setMovies', scheduledMovies);
			commit('setLoading', loading);
			commit('setError', error);

			return { result };
		},
		async getMovieDetail({ state, commit, dispatch }, id) {
			const data = computed(() =>
				state.movieDetails.find((movie) => movie.id === id)
			);

			commit('setViewMovie', data);
		},

		// getting all comments using http request

		// 		async getAllComments({ commit }, id) {
		// 			const { result: commentResult } = useQuery(
		// 				gql`
		// 					query getComments($schedule_id: Int!) {
		// 						comments(
		// 							where: {
		// 								schedule_id: {
		// 									_eq: $schedule_id
		// 								}
		// 							}
		// 						) {
		// 							id
		// 							content
		// 							created_at
		// 							user {
		// 								name
		// 								picture
		// 							}
		// 						}
		// 					}
		// 				`,
		// 				{
		// 					schedule_id: id,
		// 				}
		// 			);
		//
		// 			const commentQueryResult = useResult(
		// 				commentResult,
		// 				null,
		// 				(data) => data.comments
		// 			);
		//
		// 			commit('setComments', commentQueryResult);
		// 		},

		// getting all comments using ws request

		async getAllComments({ commit }, id) {
			const { result: commentResult } = useSubscription(
				gql`
					subscription getAllComments($schedule_id: Int!) {
						comments(
							where: {
								schedule_id: {
									_eq: $schedule_id
								}
							}
						) {
							id
							content
							created_at
							user {
								name
								picture
							}
						}
					}
				`,
				{
					schedule_id: id,
				}
			);
			const commentQueryResult = useResult(
				commentResult,
				null,
				(data) => data.comments
			);

			watch(
				commentQueryResult,
				(newValue) => {
					console.log('New message received:', newValue);
				},
				{
					lazy: true,
				}
			);

			commit('setComments', commentQueryResult);
		},

		// add comments
		async addComment({ state }) {
			// excute addComment mutation to the db
			const { mutate: addComment } = useMutation(
				gql`
					mutation insert_comments_one(
						$schedule_id: Int!
						$content: String!
					) {
						insert_comments_one(
							object: {
								schedule_id: $schedule_id
								content: $content
							}
						) {
							id
						}
					}
				`
			);

			addComment({
				schedule_id: state.commentData.schedule_id,
				content: state.commentData.content,
			});
		},

		async addReservation({ state, commit }) {
			// excute addComment mutation to the db
			const {
				mutate: addReservation,
				loading: book_loading,
				error: book_error,
			} = useMutation(
				gql`
					mutation addReservation(
						$name: String!
						$email: String!
						$phone_number: String!
						$number_of_ticket: Int!
						$cinima_id: String!
						$scheduled_movie_id: Int!
						$booking_date: timestamp!
						$payment_varified: Boolean!
					) {
						insert_ticket_reservation(
							objects: {
								name: $name
								email: $email
								phone_number: $phone_number
								number_of_ticket: $number_of_ticket
								cinima_id: $cinima_id
								scheduled_movie_id: $scheduled_movie_id
								booking_date: $booking_date
								payment_varified: $payment_varified
							}
						) {
							affected_rows
						}
					}
				`
			);

			addReservation({
				name: state.reservationData.name,
				email: state.reservationData.email,
				phone_number: state.reservationData.phone_number,
				number_of_ticket:
					state.reservationData.number_of_ticket,
				cinima_id: state.reservationData.cinima_id,
				scheduled_movie_id:
					state.reservationData.scheduled_movie_id,
				booking_date: state.reservationData.booking_date,
				payment_varified:
					state.reservationData.payment_varified,
			});

			commit('setBookLoading', book_loading);
			commit('setBookError', book_error);

			//console.log(book_error);
		},
	},
};

// const app = createApp({ /* your root component */ })

export default home;
