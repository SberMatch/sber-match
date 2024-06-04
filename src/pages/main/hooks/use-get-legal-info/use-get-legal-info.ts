import {useEffect, useState} from "react";
import {LegalInfo, Okved, OkvedType, SortedOkvedLists} from './types';
import { getAESDecryptedValue } from "../../../../utils/crypto";
import { CRYPTO_TOKEN } from '../../../../constants';
import okvedListDictionaries from "./dictionaries";

const useGetLegalInfo = (inn: string) => {
    const [legalInfo, setLegalInfo] = useState<LegalInfo>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getLegalInfo = async () => {
            if (!inn) {
                return;
            }

            setIsLoading(true);

            try {
                const response = await fetch('http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Token ${getAESDecryptedValue(CRYPTO_TOKEN)}`
                    },
                    body: JSON.stringify({ query: inn })
                })

                const data = await response.json();

                return data?.suggestions?.at(0);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        }

        getLegalInfo().then((legalInfo) => {
            if (!legalInfo) {
                return setLegalInfo(undefined);
            }

            const defaultSortedOkvedLists: SortedOkvedLists = { [OkvedType.BAD]: [], [OkvedType.COMMON]: [], [OkvedType.GOOD]: [] };

            const sortedOkvedLists = legalInfo.data?.okveds?.reduce((sortedOkvedLists: SortedOkvedLists, okved: Okved) => {
                if (okvedListDictionaries.bad.includes(okved.code)) {
                    return {...sortedOkvedLists, bad: [...sortedOkvedLists.bad, okved]};
                }
                if (okvedListDictionaries.common.includes(okved.code)) {
                    return {...sortedOkvedLists, common: [...sortedOkvedLists.common, okved]};
                }
                if (okvedListDictionaries.good.includes(okved.code)) {
                    return {...sortedOkvedLists, good: [...sortedOkvedLists.good, okved]}
                }

                return sortedOkvedLists;
            }, defaultSortedOkvedLists)

            setLegalInfo({
                name: legalInfo.value,
                okvedList: sortedOkvedLists ?? defaultSortedOkvedLists
            })
        });
    }, [inn]);

    return { legalInfo, isLoading };
};

export default useGetLegalInfo;
