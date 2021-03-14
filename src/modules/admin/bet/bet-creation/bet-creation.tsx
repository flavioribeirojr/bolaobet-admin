import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardTitle } from '../../../../components/Card';
import { Checkbox } from '../../../../components/Checkbox';
import { PageNav, PageTitle } from '../../../../components/page-title';
import { AdminTemplate } from '../../../../templates/admin/admin';
import { BetCreationPayload, BetCreationValidationSchema, createEmptyBetCreationPayload } from './bet-creation.form';
import { createBetCreationRequest } from './bet-creation.request';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { FormField, FormInput, FormLabel, FormRow, FormError, SubmitButton, SubmitButtonSpinner } from '../../../../components/form';
import { MoneyInput } from '../../../../components/inputs/money-input';
import { ChampionshipSelector } from '../championship-selector';
import { ChampionshipMatchesSelector } from '../championship-matches-selector';

export function BetCreation() {
    const [ hasPlayerLimit, setHasPlayerLimit ] = useState(true);
    const betCreationRequest = createBetCreationRequest();
    const navigationHistory = useHistory();

    async function saveBet(values: BetCreationPayload, formikHelpers: FormikHelpers<BetCreationPayload>) {
        formikHelpers.setSubmitting(true);

        try {
            const betCreated = await betCreationRequest.create({
                ...values,
                playerLimit: hasPlayerLimit ? values.playerLimit : undefined
            });

            navigationHistory.push(`/apostas/${betCreated.id}`);
        } catch (err) {
            console.debug(err);

            toast.error('Algo errado aconteceu. Por favor contate o suporte técnico.');
        } finally {
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <AdminTemplate>
            <PageNav>
                <PageTitle>
                    Nova Aposta
                </PageTitle>
            </PageNav>
            <Card>
                <CardTitle>
                    Cadastro de Aposta
                </CardTitle>
                <CardBody>
                    <Formik
                        initialValues={createEmptyBetCreationPayload()}
                        validationSchema={BetCreationValidationSchema}
                        onSubmit={saveBet}
                        validateOnBlur
                    >
                        {
                            formik => (
                                <form onSubmit={formik.handleSubmit}>
                                    <FormRow templateColumns="repeat(4, 1fr)">
                                        <FormField>
                                            <FormLabel>
                                                Nome da Aposta
                                            </FormLabel>
                                            <FormInput
                                                type="text"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <FormError field="name" />
                                        </FormField>

                                        <FormField>
                                            <FormLabel>
                                                Investimento inicial
                                            </FormLabel>
                                            <MoneyInput
                                                name="initialInvestment"
                                                value={formik.values.initialInvestment}
                                                onValueChange={value => formik.setFieldValue('initialInvestment', value)}
                                                onBlur={formik.handleBlur}
                                                decimalSeparator=","
                                                groupSeparator="."
                                                prefix="R$ "
                                            />
                                            <FormError field="initialInvestment" />
                                        </FormField>

                                        <FormField>
                                            <FormLabel>
                                                Valor do prêmio
                                            </FormLabel>
                                            <MoneyInput
                                                name="prize"
                                                value={formik.values.prize}
                                                onValueChange={value => formik.setFieldValue('prize', value)}
                                                onBlur={formik.handleBlur}
                                                decimalSeparator=","
                                                groupSeparator="."
                                                prefix="R$ "
                                            />
                                            <FormError field="prize" />
                                        </FormField>

                                        <FormField>
                                            <CheckboxLabel
                                                input={
                                                    <input
                                                        type="checkbox"
                                                        name="limitPlayers"
                                                        checked={hasPlayerLimit}
                                                        onChange={() => setHasPlayerLimit(!hasPlayerLimit)}
                                                        tabIndex={-1}
                                                    />
                                                }
                                                color="info"
                                            >
                                                Limitar n/º jogadores
                                            </CheckboxLabel>
                                            <FormInput
                                                type="number"
                                                name="playerLimit"
                                                value={formik.values.playerLimit}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled={!hasPlayerLimit}
                                            />
                                            <FormError field="playerLimit" />
                                        </FormField>
                                    </FormRow>

                                    <ChampionshipSelector />
                                    {
                                        Boolean(formik.values.footballChampionshipID) && (
                                            <ChampionshipMatchesSelector
                                                championshipId={formik.values.footballChampionshipID}
                                            />
                                        )
                                    }
                                    <SubmitButton type="submit">
                                        {
                                            formik.isSubmitting ?
                                                <SubmitButtonSpinner /> :
                                                'Salvar'
                                        }
                                    </SubmitButton>
                                </form>
                            )
                        }
                    </Formik>
                </CardBody>
            </Card>
        </AdminTemplate>
    );
}

const CheckboxLabel = styled(Checkbox)`
    margin-bottom: 10px;

    label {
        color: rgb(73,72,72);
        font-size: .875rem;
        font-weight: 600!important;
    }
`;