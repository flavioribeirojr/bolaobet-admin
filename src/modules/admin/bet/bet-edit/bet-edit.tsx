import React, { useState } from 'react';
import { Formik } from 'formik';
import styled from 'styled-components';
import { Card, CardBody, CardTitle } from '../../../../components/Card';
import { PageNav, PageTitle } from '../../../../components/page-title';
import { AdminTemplate } from '../../../../templates/admin/admin';
import { BetEditValidationSchema, useBetEditForm } from './bet-edit.form';
import { FormError, FormField, FormInput, FormLabel, FormRow, SubmitButton, SubmitButtonSpinner } from '../../../../components/form';
import { MoneyInput } from '../../../../components/inputs/money-input';
import { ChampionshipSelector } from '../championship-selector';
import { ChampionshipMatchesSelector } from '../championship-matches-selector';
import { Checkbox } from '../../../../components/Checkbox';

export function BetEdit() {
    const { betEditForm, updateBet } = useBetEditForm();
    const [ hasPlayerLimit, setHasPlayerLimit ] = useState(betEditForm.playerLimit !== undefined);

    return (
        <AdminTemplate>
            <PageNav>
                <PageTitle>
                    Editar Aposta
                </PageTitle>
            </PageNav>
            <Card>
                <CardTitle>
                    Edição de Aposta
                </CardTitle>
                <CardBody>
                    <Formik
                        initialValues={betEditForm}
                        validationSchema={BetEditValidationSchema}
                        onSubmit={updateBet}
                        enableReinitialize
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