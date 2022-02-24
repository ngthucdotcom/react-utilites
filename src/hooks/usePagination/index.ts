// @ts-ignore
export const usePagination = ({ page, limitPages, totalRecords, rowsPerPage, onPageChange }) => {

	const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
	const genPageArray = new Array(totalPages).fill(0);
	const startPage = Math.max(Math.min(totalPages - limitPages, page), 0);
	const endPage = Math.min(page + limitPages, totalPages);

	const handleFirstPageButtonClick = (event: any) => {
		if (page <= 0) return;
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event: any) => {
		if (page <= 0) return;
		onPageChange(event, page - 1);
	};

	const handlePageChange = (event: any, numberOfPage: number) => {
		if (page === numberOfPage) return;
		onPageChange(event, numberOfPage);
	};

	const handleNextButtonClick = (event: any) => {
		if (page + 1 >= totalPages) return;
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: any) => {
		if (page + 1 >= totalPages) return;
		onPageChange(event, totalPages - 1);
	};

	return {
		totalPages,
		startPage,
		pages: genPageArray.slice(startPage, endPage),
		handleFirstPageButtonClick,
		handleBackButtonClick,
		handlePageChange,
		handleNextButtonClick,
		handleLastPageButtonClick
	}
}
