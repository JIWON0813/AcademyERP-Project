package com.example.demo.database.DTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LecturePagingVO {

    /** 현재 페이지 번호 */
    private int currentPageNo;

    /** 페이지당 출력할 데이터 개수 */
    private int recordsPerPage;

    /** 화면 하단에 출력할 페이지 사이즈 */
    private int pageSize;
    /** 전체 데이터 개수 */
    private int totalRecordCount;

    /** 전체 페이지 개수 */
    private int totalPageCount;

    /** 페이지 리스트의 첫 페이지 번호 */
    private int firstPage;

    /** 페이지 리스트의 마지막 페이지 번호 */
    private int lastPage;

    /** SQL의 조건절에 사용되는 첫 RNUM */
    private int firstRecordIndex;

    /** SQL의 조건절에 사용되는 마지막 RNUM */
    private int lastRecordIndex;

    /** 이전 페이지 존재 여부 */
    private boolean hasPreviousPage;

    /** 다음 페이지 존재 여부 */
    private boolean hasNextPage;

    public LecturePagingVO() {
        if (this.getCurrentPageNo() < 1) {
            this.setCurrentPageNo(1);
        }
        if (this.getRecordsPerPage() < 1 || this.getRecordsPerPage() > 100) {
            this.setRecordsPerPage(10);
        }
        if (this.getPageSize() < 5 || this.getPageSize() > 20) {
            this.setPageSize(10);
        }

    }

    public int getStartPage() {
        return (currentPageNo - 1) * recordsPerPage;
    }

    public void setTotalRecordCount(int totalRecordCount) {
        this.totalRecordCount = totalRecordCount;

        if (totalRecordCount > 0) {
            calculation();
        }
    }

    private void calculation() {
        /* 전체 페이지 수 (현재 페이지 번호가 전체 페이지 수보다 크면 현재 페이지 번호에 전체 페이지 수를 저장) */
        totalPageCount = ((totalRecordCount - 1) / this.getRecordsPerPage()) + 1;
        if (this.getCurrentPageNo() > totalPageCount) {
            this.setCurrentPageNo(totalPageCount);
        }

        /* 페이지 리스트의 첫 페이지 번호 */
        firstPage = ((this.getCurrentPageNo() - 1) / this.getPageSize()) * this.getPageSize() + 1;

        /* 페이지 리스트의 마지막 페이지 번호 (마지막 페이지가 전체 페이지 수보다 크면 마지막 페이지에 전체 페이지 수를 저장) */
        lastPage = firstPage + this.getPageSize() - 1;
        if (lastPage > totalPageCount) {
            lastPage = totalPageCount;
        }

        /* SQL의 조건절에 사용되는 첫 RNUM */
        firstRecordIndex = (this.getCurrentPageNo() - 1) * this.getRecordsPerPage();

        /* SQL의 조건절에 사용되는 마지막 RNUM */
        lastRecordIndex = this.getCurrentPageNo() * this.getRecordsPerPage();

        /* 이전 페이지 존재 여부 */
        hasPreviousPage = firstPage != 1;

        /* 다음 페이지 존재 여부 */
        hasNextPage = (lastPage * this.getRecordsPerPage()) < totalRecordCount;
    }
}