import React, { useState, useEffect } from 'react';
import { useField, useFormikContext } from 'formik';
import styled, { css } from 'styled-components';
import { FormError } from '../../../components/form';
import { FootballChampionship } from './api-types/football-championship';
import { createBetApi } from './bet.api';

export function ChampionshipSelector() {
    const betApi = createBetApi();
    const formikContext = useFormikContext();
    const [ championships, setChampionships ] = useState<FootballChampionship[]>([]);
    const [ field ] = useField('footballChampionshipID');

    useEffect(() => {
        loadChampionships();
    }, []);

    async function loadChampionships() {
        const championships = await betApi.getAllChampionships();

        setChampionships(championships);
    }

    function setChampionship(championshipID: number) {
        formikContext.setFieldValue('footballChampionshipID', championshipID);
    }

    return (
        <React.Fragment>
            <ChampionshipLabel>
                Selecione um Campeonato
            </ChampionshipLabel>
            <ChampionshipGrid>
                {
                    championships.map(championship => (
                        <Championship
                            key={championship.id}
                            onClick={() => setChampionship(championship.id)}
                            selected={field.value === championship.id}
                        >
                            <ChampionshipLogo src={championship.logoURL} />
                            <Championshiptitle>
                                { championship.name }
                            </Championshiptitle>
                        </Championship>
                    ))
                }
            </ChampionshipGrid>
            <FormError field="footballChampionshipID" />
        </React.Fragment>
    )
}

const ChampionshipLabel = styled.p`
    font-weight: 700;
    font-size: 16px;
    color: #32325d;
    margin-bottom: 25px;
`;

const ChampionshipGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 25%);
    column-gap: 20px;
    row-gap: 20px;
`;

const Championship = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 30px 0;
    cursor: pointer;
    background: #dddddd7a;
    position: relative;

    &:hover {
        background: #00b09b;
        background: -webkit-linear-gradient(to right, #00b09b, #96c93d);
        background: linear-gradient(to right, #00b09b, #96c93d);

        p {
            color: white;
        }
    }

    ${ (props: { selected?: boolean }) => props.selected && css`
        background: #00b09b;
        background: -webkit-linear-gradient(to right, #00b09b, #96c93d);
        background: linear-gradient(to right, #00b09b, #96c93d);

        p {
            color: white;
        }

        &::after {
            content: "\f058";
            font-weight: 900;
            font-family: "Font Awesome 5 Free";
            color: white;
            font-size: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
        }
    `}
`;

const ChampionshipLogo = styled.img`
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 15px;
`;

const Championshiptitle = styled.p`
    color: #3e3e3e;
    font-weight: 800;
    font-size: 1.2em;
    text-align: center;
`;