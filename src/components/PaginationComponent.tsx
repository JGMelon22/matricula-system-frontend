import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({
    currentPage,
    totalPages,
    onPageChange
}: PaginationComponentProps) => {
    if (totalPages <= 1)
        return null;

    return (
        <Pagination>
            {/* Botão firt */}
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink first onClick={() => onPageChange(1)}></PaginationLink>
            </PaginationItem>

            {/* Botão Previous */}
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink first onClick={() => onPageChange(currentPage - 1)}></PaginationLink>
            </PaginationItem>

            {/* Numero das paginas */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page} active={currentPage === page}>
                    <PaginationLink onClick={() => onPageChange(page)}>
                        {page}
                    </PaginationLink>
                </PaginationItem>
            ))}

            {/* Botao Next */}
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                    next
                    onClick={() => onPageChange(currentPage + 1)}
                ></PaginationLink>
            </PaginationItem>


            {/* Botao Last */}
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                    last
                    onClick={() => onPageChange(totalPages)}
                ></PaginationLink>
            </PaginationItem>


        </Pagination>
    )
};

export default PaginationComponent;