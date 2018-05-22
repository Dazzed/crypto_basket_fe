import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Col
} from 'reactstrap';

export default class PaginationComponent extends Component {
  render() {
    const {
      totalCount, perPage, activePage
    } = this.props;
    const maxPage = Math.ceil(totalCount / perPage);
    if (!totalCount) return null;
    return (
      <Row>
        <Col sm={{ size: 1, order: 1, offset: 5 }} >
          <Pagination>
            <PaginationItem onClick={activePage === 1 ? () => false : this.props.changePage.bind(this, activePage - 1)}>
              <PaginationLink previous />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={activePage === 1 ? () => false : this.props.changePage.bind(this, 1)} className={activePage === 1 ? 'selected' : ''}>
                1
              </PaginationLink>
            </PaginationItem>
            {activePage > 3 ? (<PaginationItem>
              <PaginationLink>
                ...
              </PaginationLink>
            </PaginationItem>) : null}
            {[1, 2, 3].map((elem, i) => {
              const currentPage = activePage > 3 ? activePage + (elem - 2) : elem + 1;
              return maxPage >= currentPage ?
                (<PaginationItem onClick={this.props.changePage.bind(this, currentPage)} key={`pagination_${i}`}>
                  <PaginationLink className={activePage === currentPage ? 'selected' : ''}>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>) : null;
            })}
            {activePage < maxPage - 2 ? (<PaginationItem>
              <PaginationLink>
                ...
              </PaginationLink>
            </PaginationItem>) : null}
            {maxPage > Math.max(4, activePage + 1) ? (<PaginationItem onClick={this.lastPage}>
              <PaginationLink className={activePage === maxPage ? 'selected' : ''}>
                {maxPage}
              </PaginationLink>
            </PaginationItem>) : null}
            <PaginationItem>
              <PaginationLink next onClick={activePage === maxPage ? () => false : this.props.changePage.bind(this, activePage + 1)} />
            </PaginationItem>
          </Pagination>
        </Col>
      </Row>
    );
  }
}

PaginationComponent.propTypes = {
  totalCount: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};
