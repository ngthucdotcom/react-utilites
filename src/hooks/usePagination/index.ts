// @ts-ignore
export const usePagination = ({ count, page, rowsPerPage, onPageChange }) => {

	const handleFirstPageButtonClick = (event: any) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: any) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return {
		handleFirstPageButtonClick,
		handleBackButtonClick,
		handleNextButtonClick,
		handleLastPageButtonClick
	}
}
