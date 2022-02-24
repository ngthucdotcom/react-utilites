import React, { useState } from 'react';
import './pagination.css';
import PropTypes from 'prop-types';
import {usePagination} from "../../../dist";

const Pagination = (props: any) => {

	const {
		page,
		totalRecords,
		limitPages,
		rowsPerPage,
		onPageChange,
		rowsPerPageOptions,
		onRowsPerPageChange,
	} = props;
	const paginator = usePagination({ totalRecords, limitPages, rowsPerPage, page, onPageChange });

	const [rowsPerPageSelected, setRowsPerPageSelected] = useState(rowsPerPage);
	const totalPages = paginator.totalPages;

	const handleChangeRowsPerPageOptions = (event: any) => {
		setRowsPerPageSelected(event.target.value);
		if (!onRowsPerPageChange) return;
		onRowsPerPageChange(event);
	};

	const RowPerPageOptions = () => {
		return (
			<select
				id="row-per-page"
				value={rowsPerPageSelected}
				name="row-per-page-options"
				className="row-per-page-options"
				onChange={handleChangeRowsPerPageOptions}
			>
				{
					rowsPerPageOptions.map((option: any, index: number) => {
						const value = !option.value ? option : option.value;
						return (
							<option
								value={value}
								defaultValue={rowsPerPageSelected}
								key={`option-${index}`}
							>
								{option.label || option}
							</option>
						);
					})
				}
			</select>
		);
	};

	return (
		<div className="table-pagination">
			<div className="left-bar">
				<div className="total-rows">
					Tổng cộng: <span className="std-text-font-large-bold">{totalRecords} dòng</span>
				</div>

				<div className="divider">|</div>

				<div className="row-per-page">Hiển thị: <RowPerPageOptions /> dòng/trang</div>
			</div>
			<div className="right-bar">
				<ul>
					<li className={page <= 0 ? 'page-disabled' : 'default'}
						onClick={paginator.handleFirstPageButtonClick}>Trang đầu
					</li>

					<li className={page <= 0 ? 'page-disabled' : 'default'} style={{fontWeight: 600}}
						onClick={paginator.handleBackButtonClick}>&lt;</li>

					{
						paginator.pages.map((_value, index) => (
							<li
								key={`page-${index}`}
								className={page === paginator.startPage + index ? 'page-active' : 'default'}
								onClick={(event) => {
									paginator.handlePageChange(event, paginator.startPage + index);
								}}
							>
								{paginator.startPage + index + 1}
							</li>
						))
					}

					<li className={page + 1 >= totalPages ? 'page-disabled' : 'default'} style={{fontWeight: 600}}
						onClick={paginator.handleNextButtonClick}>&gt;</li>

					<li className={page + 1 >= totalPages ? 'page-disabled' : 'default'}
						onClick={paginator.handleLastPageButtonClick}>Trang cuối</li>
				</ul>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	page: PropTypes.number,
	totalRecords: PropTypes.number,
	limitPages: PropTypes.number,
	rowsPerPage: PropTypes.number,
	onPageChange: PropTypes.func,
	rowsPerPageOptions: PropTypes.array,
	onRowsPerPageChange: PropTypes.func,
};

Pagination.defaultProps = {
	page: 1,
	totalRecords: 1,
	limitPages: 5,
	rowsPerPage: 5,
	onPageChange: null,
	rowsPerPageOptions: [{ label: 'Tất cả', value: -1 }],
	onRowsPerPageChange: null,
};

export default Pagination;
