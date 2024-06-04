import React, {ChangeEventHandler, memo, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {useGetLegalInfo} from './hooks';
import useDebounce from "../../hooks/use-debounce";
import cl from "./main.module.scss";
import {Form, Input, Layout, Typography} from 'antd';
import FormItem from "antd/es/form/FormItem";
import cn from 'classnames';
import {
	CheckCircleOutlined,
	ClearOutlined,
	ExclamationCircleOutlined,
	WarningOutlined
} from "@ant-design/icons";
import toCapitalize from "../../utils/to-capitalize";
import {OkvedType} from "./hooks/use-get-legal-info/types";
import Loader from "../../common/loader";

const MainPage = () => {
  const [inn, setInn] = useState('');
  const [currentOkvedType, setCurrentOkvedType] = useState<OkvedType>();
  const debouncedInn = useDebounce(inn, 500);

  const { legalInfo, isLoading: legalInfoIsLoading } = useGetLegalInfo(debouncedInn);

    useEffect(() => {
        if (!legalInfo?.okvedList) {
            setCurrentOkvedType(undefined);
            return;
        }

        if (legalInfo.okvedList.bad.length) {
            return setCurrentOkvedType(OkvedType.BAD);
        }

        if (legalInfo.okvedList.common.length) {
            return setCurrentOkvedType(OkvedType.COMMON);
        }

        if (legalInfo.okvedList.good.length) {
            return setCurrentOkvedType(OkvedType.GOOD);
        }

        setCurrentOkvedType(undefined);
    }, [legalInfo]);

  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setInn(event.target.value)
  }, [])

	const getInfoByOkvedType = useCallback((okvedType: OkvedType) => {
		const infoMap: Record<OkvedType, string> = {
			[OkvedType.BAD]: 'Пожалуйста, попросите клиента сменить ОКВЭД',
			[OkvedType.COMMON]: 'Есть предпочтительный ОКВЭД',
			[OkvedType.GOOD]: 'Все хорошо, ОКВЭД в стопе нет',
		}

		return infoMap[okvedType];
	}, [])

	const getTitleByOkvedType = useCallback((okvedType: OkvedType) => {
		const titleMap: Record<OkvedType, string> = {
			[OkvedType.BAD]: 'ОКВЭД в стопах',
			[OkvedType.COMMON]: 'Рекомендованные к удалению ОКВЭД',
			[OkvedType.GOOD]: 'Положительные ОКВЭД',
		}

		return titleMap[okvedType];
	}, [])

  const getIconByOkvedType = useCallback((okvedType: OkvedType) => {
    const iconsMap: Record<OkvedType, ReactNode> = {
      [OkvedType.BAD]: <ExclamationCircleOutlined />,
      [OkvedType.COMMON]: <WarningOutlined />,
      [OkvedType.GOOD]: <CheckCircleOutlined />,
    }

    return iconsMap[okvedType];
  }, [])

	const content = useMemo(() => {
		if (legalInfoIsLoading) {
			return <Loader />
		}

		if (!legalInfo) {
			return <div className={cl.emptyWrapper}><ClearOutlined />ПУСТО</div>
		}

		return (
			<div className={cl.content}>
				{
					currentOkvedType && (
						<div className={cn(cl.infoWrapper, cl[`infoWrapper${toCapitalize(currentOkvedType)}`])}>
							<Typography.Title level={4} className={cl.infoTitle}>{getIconByOkvedType(currentOkvedType)}{getInfoByOkvedType(currentOkvedType)}</Typography.Title>
						</div>
					)
				}
				<ul className={cl.okvedWrapper}>
					{
						Object.entries(legalInfo.okvedList).reverse().map(([okvedType, okvedList]) => (
							<li key={okvedType} className={cn(cl.okvedRow, cl[`okvedRow${toCapitalize(okvedType)}`])}>
								<Typography.Title level={4} className={cl.okvedRowTitle}>{getTitleByOkvedType(okvedType as OkvedType)}{getIconByOkvedType(okvedType as OkvedType)}</Typography.Title>
								{
									okvedList?.length
										? (
											<ul className={cl.okvedList}>
												{
													okvedList.map((okved) => (
														<li key={`${okved.code}. ${okved.name}`} className={cl.okvedItem}>
															<Typography.Text className={cl.okvedItemText}>
																{okved.code}. {okved.name}
															</Typography.Text>
														</li>
													))
												}
											</ul>
										) : (
											<div className={cl.emptyWrapper}><ClearOutlined />ПУСТО</div>
										)
								}
							</li>
						))
					}
				</ul>
			</div>
		)
	}, [getInfoByOkvedType, getTitleByOkvedType, legalInfoIsLoading, legalInfo, getIconByOkvedType, currentOkvedType])

  return (
    <Layout.Content className={cl.wrapper}>
      <div className={cl.container}>
        <Typography.Title level={2} className={cl.title}>Поиск по ИНН</Typography.Title>
        <Form layout='vertical'>
          <FormItem label="ИНН организации">
            <Input value={inn} onChange={changeHandler} placeholder='Введите ИНН организации'/>
          </FormItem>
        </Form>
	      <div className={cl.contentWrapper}>
		      { content }
	      </div>
      </div>
    </Layout.Content>
  );
};

export default memo(MainPage);
