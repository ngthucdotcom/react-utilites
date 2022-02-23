// @ts-ignore
export const usePagination = ({ page, totalRecords, rowsPerPage, onPageChange }) => {

	const totalPages = Math.max(0, Math.floor(totalRecords / rowsPerPage));

	const handleFirstPageButtonClick = (event: any) => {
		if (page <= 0) return;
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		if (page <= 0) return;
		onPageChange(event, page - 1);
	};

	const handleNumberOfPageButtonClick = (event: any, numberOfPage: number) => {
		if (page === numberOfPage) return;
		onPageChange(event, numberOfPage);
	}

	const handleNextButtonClick = (event: any) => {
		if (page + 1 > totalPages) return;
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		if (page + 1 > totalPages) return;
		onPageChange(event, totalPages);
	};

	return {
		totalPages,
		handleFirstPageButtonClick,
		handleBackButtonClick,
		handleNumberOfPageButtonClick,
		handleNextButtonClick,
		handleLastPageButtonClick
	}
}
