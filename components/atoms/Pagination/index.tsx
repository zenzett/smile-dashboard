import {FC} from "react";
import ReactPaginate, {ReactPaginateProps} from "react-paginate";

import PaginationContainer from "../PaginationContainer";

type PaginationsProps = ReactPaginateProps & {
	page: number;
	forward?: () => void;
	backward?: () => void;
};

const Pagination: FC<PaginationsProps> = ({
	className,
	pageCount,
	page,
	forward,
	backward,
	...attrs
}) => {
	return (
		<PaginationContainer>
			<button
				className={"backward page-navigation-label "
					.concat(
						page === 1
							? "outline-light-30 text-light-30 "
							: "outline-blue-80 text-blue-80 ",
					)
					.concat(pageCount ? " " : " hidden")}
				onClick={backward}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
				>
					<path
						d="M11.7 9.89L7.82 6L11.71 2.11C12.1 1.72 12.1 1.09 11.71 0.7C11.32 0.31 10.69 0.31 10.3 0.7L5.71 5.29C5.32 5.68 5.32 6.31 5.71 6.7L10.3 11.29C10.69 11.68 11.32 11.68 11.71 11.29C12.09 10.91 12.09 10.27 11.7 9.89ZM1 0C1.55 0 2 0.45 2 1V11C2 11.55 1.55 12 1 12C0.45 12 0 11.55 0 11V1C0 0.45 0.45 0 1 0Z"
						fill={page === 1 ? "#D3D4D4" : "#1078CA"}
					/>
				</svg>
			</button>
			<ReactPaginate
				className={"container-pagination".concat(
					className ? " " + className : "",
				)}
				pageCount={pageCount}
				pageLinkClassName="page-link"
				activeClassName="page-active"
				breakLabel="..."
				previousLabel={
					<i
						className={"previous page-navigation-label "
							.concat("fa-solid fa-chevron-left ")
							.concat(
								page === 1
									? "outline-light-30 text-light-30 "
									: "outline-blue-80 text-blue-80 ",
							)}
					></i>
				}
				nextLabel={
					<i
						className={"next page-navigation-label "
							.concat("fa-solid fa-chevron-right ")
							.concat(
								page === pageCount
									? "outline-light-30 text-light-30 "
									: "outline-blue-80 text-blue-80 ",
							)}
					></i>
				}
				pageRangeDisplayed={5}
				renderOnZeroPageCount={null}
				forcePage={page - 1}
				{...attrs}
			/>
			<button
				className={"forward page-navigation-label "
					.concat(
						page === pageCount
							? "outline-light-30 text-light-30 "
							: "outline-blue-80 text-blue-80 ",
					)
					.concat(pageCount ? " " : " hidden")}
				onClick={forward}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
				>
					<g clipPath="url(#clip0_1467_14197)">
						<path
							d="M6.29006 8.11L10.1801 12L6.29006 15.89C5.90006 16.28 5.90006 16.91 6.29006 17.3C6.68006 17.69 7.31006 17.69 7.70006 17.3L12.2901 12.71C12.6801 12.32 12.6801 11.69 12.2901 11.3L7.70006 6.7C7.31006 6.31 6.68006 6.31 6.29006 6.7C5.91006 7.09 5.91006 7.73 6.29006 8.11ZM17.0001 6C17.5501 6 18.0001 6.45 18.0001 7V17C18.0001 17.55 17.5501 18 17.0001 18C16.4501 18 16.0001 17.55 16.0001 17V7C16.0001 6.45 16.4501 6 17.0001 6Z"
							fill={page === pageCount ? "#D3D4D4" : "#1078CA"}
						/>
					</g>
					<defs>
						<clipPath id="clip0_1467_14197">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</PaginationContainer>
	);
};

export default Pagination;
