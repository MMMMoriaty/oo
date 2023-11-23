import { getFactorType, getFactorList } from '@/services/factor';
import {
  ActionType,
  PageContainer,
  ProTable,
  ProCard,
  ProForm,
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormGroup,
  ProFormDigit,
  FooterToolbar,
} from '@ant-design/pro-components';
import { Button, message, Space, Select, Form } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import { FACTOR_QUOTAS, OPERATORS} from '@/constants'
import moment from 'moment'

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

  const [types, setTypes] = useState([])
  const [selectedRows, setSelectedRows] = useState([])

  // params
  const [keyword, setKeyword] = useState('')
  const [conditions, setConditions] = useState([])
  const [filters, setFilters] = useState([])

  useEffect(() => {
    fetchTypes()
  }, [])

  const fetchTypes = async () => {
    const { data, code } = await getFactorType()
    if (code == 0) {
      setTypes(data?.list || [])
    }
  }

  const getColumns = () => {
    let columns = [
      {
        title: '因子名',
        dataIndex: 'name',
        fixed: 'left',
        sorter: true,
      },
      {
        title: '因子id',
        dataIndex: 'factor_id',
        sorter: true,
      },
      {
        title: '因子描述',
        dataIndex: 'desc',
        width: 180,
        ellipsis: true,
        sorter: true,
        render: (text) => (
          <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', maxWidth: 240 }}>
            {text}
          </div>
        ),
      },
      {
        title: '起始时间',
        dataIndex: 'created_at',
        sorter: true,
        render: (_) => moment(_).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '更新时间',
        dataIndex: 'updated_at',
        sorter: true,
        render: (_) => moment(_).format('YYYY-MM-DD HH:mm:ss')
      }
    ]
    columns.push(...FACTOR_QUOTAS.map((quota) => ({
      title: quota,
      dataIndex: quota,
      sorter: true,
    })))
    columns.push({
      title: '操作',
      dataIndex: '',
      width: 80,
      render: (text, record) => {
        return <a onClick={() => {
          message.success(`已对"${record.name}因子发出告警通知"`)
        }}>告警</a>
      },
      fixed: 'right',
    })
    return columns
  }

  const renderFilter = () => {
    return <ProForm
      layout={'horizontal'}
      submitter={{
        submitButtonProps: {
          style: {
            display: 'none'
          }
        },
        resetButtonProps: {
          style: {
            display: 'none'
          }
        }
      }}
    >
      <ProCard
        style={{ marginBottom: 16 }}
        collapsible={true}
        defaultCollapsed={true}
        title={'筛选'}
        extra={types?.length !== 0 && <ProFormSelect
          label={"因子分类"}
          name={'types'}
          style={{ width: 240 }}
          mode="multiple"
          options={types.map((v) => ({ label: v?.name, value: v?.id }))}
          initialValue={types.map((v) => v?.id)}
          fieldProps={{ maxTagCount: 'responsive' }}
          placeholder={"请选择因子分类"}
        />}
      >
        <ProFormList
          name={"filters"}
          creatorButtonProps={{
            type: 'link',
            block: false,
            creatorButtonText: '添加筛选条件',
          }}
          copyIconProps={false}
        >
          <ProFormGroup>
            <ProFormText
              name="field"
              placeholder="筛选项"
              style={{ width: 240 }}
            />
            <ProFormSelect
              name="operator"
              placeholder="筛选方式"
              style={{ width: 120 }}
              options={OPERATORS}
            />
            <ProFormDigit
              name="value"
              placeholder="数值"
              style={{ width: 240 }}
            />
          </ProFormGroup>
        </ProFormList>
      </ProCard>
    </ProForm>
  }

  return (
    <PageContainer
      header={{
        title: '因子看板',
      }}
    >
      {renderFilter()}
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        search={false}
        scroll={{x: 'max-content'}}
        options={{
          search: {
            onSearch: (v) => {
              actionRef.current.reload()
            },
            onChange: (e) => {
              setKeyword(e?.target?.value)
            },
            value: keyword,
            placeholder: '因子名、因子描述'
          }
        }}
        request={async (params, sorter, filter) => {
          const { data, code } = await getFactorList({
            keyword,
            page: params.current,
            page_size: params.pageSize,
            sorter,
            conditions,
          });
          if (code == 0) {
            return {
              data: data?.list || [],
              success: true,
              total: data?.total,
            };
          }
        }}
        columns={getColumns()}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
        tableAlertOptionRender={() => {
          return (
            <Space size={16}>
              <a onClick={() => message.success(`已对${selectedRows?.length}条因子发出告警`)}>批量告警</a>
              <a onClick={() => actionRef.current.clearSelected()}>取消选择</a>
            </Space>
          );
        }}
      />
    </PageContainer>
  );
};

export default TableList;
