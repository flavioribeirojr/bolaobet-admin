import React from 'react';
import styled from 'styled-components';
import { Card, CardTitle } from '../../../../components/Card';
import { PageNav, PageNavOptions, PageTitle, PageNavLink } from '../../../../components/page-title';
import { Pagination } from '../../../../components/pagination';
import { Table } from '../../../../components/table';
import { BetStatusIndicator } from '../../../../domains/bet/components/bet-status-indicator';
import { AdminTemplate } from '../../../../templates/admin/admin';
import { useBetList } from './bet-list.hook';

function BetList() {
  const { betList, totalBets } = useBetList();

  return (
    <AdminTemplate>
      <PageNav>
        <PageTitle>
          Apostas
        </PageTitle>
        <PageNavOptions>
          <PageNavLink
            to="/apostas/nova"
            color="#ff477b"
          >
            Nova Aposta
          </PageNavLink>
        </PageNavOptions>
      </PageNav>
      <Card>
        <CardTitle>
          Lista de Apostas
        </CardTitle>
        <Table selectable>
          <thead>
            <tr>
              <th>
                Campeonato
              </th>
              <th>
                Nome
              </th>
              <th>
                Nº Jogadores
              </th>
              <th>
                Status
              </th>
              <th>
                Prêmio (R$)
              </th>
            </tr>
          </thead>
          <tbody>
            {
              betList.map(bet => (
                <tr key={bet.id}>
                  <td>
                    <ChampionshipCell>
                      <ChampionshipCellImage src={bet.championship.logo} />
                      <ChampionshipCellText>
                        { bet.championship.name }
                      </ChampionshipCellText>
                    </ChampionshipCell>
                  </td>
                  <td>
                    { bet.name }
                  </td>
                  <td>
                    0
                  </td>
                  <td>
                    <BetStatusIndicator status={bet.status} />
                  </td>
                  <td>
                    { bet.prize }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <PaginationWrapper>
          <StyledPagination
            perPage={10}
            count={totalBets}
            onPageChange={(page: number) => {}}
          />
        </PaginationWrapper>
      </Card>
    </AdminTemplate>
  );
}

export default BetList;

const ChampionshipCell = styled.div`
  display: flex;
  align-items: center;
`;

const ChampionshipCellImage = styled.img`
  margin-right: 10px;
  width: 45px;
  height: 45px;
  object-fit: contain;
`;

const ChampionshipCellText = styled.p`
  font-weight: bold;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const StyledPagination = styled(Pagination)`
  margin-left: auto;
`;