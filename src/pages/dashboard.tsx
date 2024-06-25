import React, { useEffect, useState } from 'react'
import {
  Box,
  Heading,
  Text,
  TableContainer,
  Table,
  Th,
  Td,
  Thead,
  Tbody,
  Tr,
  VStack,
  useDisclosure,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import {
  Chart, LineElement, Title, Tooltip, Legend, LinearScale, CategoryScale, PointElement, BarElement, Filler,
} from "chart.js";
import style from '../styles/dashboard.module.css';
import Image from 'next/image';
import IconLink from '@/components/utils/IconLink/IconLink';
import { dataIconsLink } from '@/data/dataIconsLink';
import { MdOutlineAnalytics } from "react-icons/md";
import { IoExitOutline } from "react-icons/io5";
import { Dealership, Kpi, KpiData, Option } from '@/typescript/interfaces';
import { KpiManagerResponse } from './api/kpi-manager';
import { useTableConfig } from '@/hooks/useKpiTableConfig';
import { useKpiByFormatBarChart } from '@/hooks/useKpiByFormatBarChart';
import { useKpiByFormatAndFirstWordLineChart } from '@/hooks/useKpiByFormatAndFirstWordLineChart';
import NoSSR from 'react-no-ssr';
import Select from "react-select";
import { Line, Bar } from "react-chartjs-2";
import { getReactSelectOptionsFromDealerships, getReactSelectOptionsFromGroupedKpis, getReactSelectOptionsFromKpis } from '@/utils/helper';


Chart.register(
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
);

const Dashboard = () => {

  const kpiManagerApi = "/api/kpi-manager";

  const [dealerships, setDealerships] = useState<Dealership[]>([]);
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const [groupedByFormat, setGroupedbyFormatKpis] = useState<Record<string, Kpi[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedByFormatAndFirstWord, setGroupedbyFormatAndFirstWordKpis] =
    useState<Record<string, Kpi[]>>({});
  const [selectedDealerships, setSelectedDealerships] = useState<Option[]>([]);
  const [selectedKpis, setSelectedKpis] = useState<Option[]>([]);
  const [selectedKpiFormatGroup, setSelectedKpiFormatGroup] =
    useState<Option>();
  const [
    selectedKpiFormatAndFirstWordGroup,
    setSelectedKpiFormatAndFirstWordGroup,
  ] = useState<Option>();


  const { isOpen, onToggle } = useDisclosure();


  // FETCHES
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(kpiManagerApi);
      const data: KpiManagerResponse = await response.json();

      const {
        dealerships,
        groupedByFormatKpis: groupedKpis,
        kpiData,
        allKpis,
        groupedByFormatAndFirstWordKpis,
      } = data;

      setDealerships(dealerships);
      setKpis(allKpis);
      setKpiData(kpiData);
      setGroupedbyFormatKpis(groupedKpis);
      setGroupedbyFormatAndFirstWordKpis(groupedByFormatAndFirstWordKpis);
      setLoading(false);
    };

    fetchData();
  }, []);


  // CUSTOM HOOKS
  // custom hook getting the react-table config
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTableConfig({ selectedDealerships, selectedKpis, kpiData });

  // custom hook getting the data chartjs charts
  const barChartData = useKpiByFormatBarChart({
    groupedByFormat,
    kpiData,
    selectedKpiFormatGroup,
    selectedDealerships,
  });

  const lineChartData = useKpiByFormatAndFirstWordLineChart({
    groupedByFormatAndFirstWord,
    kpiData,
    selectedKpiFormatAndFirstWordGroup,
    selectedDealerships,
  });


  const sidenavWidth = isOpen ? "250px" : "0";
  const sidenavTransition = "width 0.3s";

  return (
    <section className={style.container}>
      <div className={style.sidebar}>
        <Image src="/images/quotus-logo.png" alt='logo quotus' width={200} height={200} loading="lazy" />
        <div className={style.sidebarIcons}>
          {dataIconsLink.map((item, key) => (
            <IconLink text={item.text} Icon={item.icon} key={key} />
          ))}

        </div>
      </div>
      <div className={style.mainContent}>
        <div className={style.titleContainer}>
          <MdOutlineAnalytics />
          <h2 >Analytics</h2>
        </div>
        <div className={style.chartContainer}>
          <div className={style.dealershipSelect}>
            <h3>Dealership</h3>
            <p>you can select multiple dealerships</p>
            <NoSSR>
              <Select
                isMulti
                isClearable
                options={getReactSelectOptionsFromDealerships(dealerships)}
                onChange={(selectedOptions) => {
                  setSelectedDealerships(selectedOptions as Option[]);
                }}
                value={selectedDealerships}
                placeholder="First select at least one dealership"
                id="dealership-selector"
              />
            </NoSSR>
          </div>

          {/* KPI Selector */}
          {selectedDealerships.length > 0 && (
            <>
              {/* Kpi Group by format Selector */}
              <div className={style.kpiByformat}>
                <h3>Kpi by format</h3>
                <NoSSR>
                  <Select
                    options={getReactSelectOptionsFromGroupedKpis(groupedByFormat)}
                    onChange={(selectedOption) => {
                      setSelectedKpiFormatGroup(selectedOption as Option);
                    }}
                    placeholder="Select Kpi By Format Group for the Bar Chart"
                    value={selectedKpiFormatGroup}
                    id="kpi-by-format-group"
                  />
                </NoSSR>
              </div>

              {/* Bar Chart */}
              <div className={style.dealershipTable}>
                <h4>Dealership KPI </h4>
                <p>Information about each dealership&apos;s key performance indicators</p>

                <Box
                  h="300px"
                  w='100%'
                >
                  <Bar
                    data={barChartData}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </Box>
              </div>

              <div className={style.dealershipsKPI}>
                <h4>Key Performance Indicators with Individual Values</h4>
                <NoSSR>
                  <Select
                    isMulti
                    isClearable
                    options={getReactSelectOptionsFromKpis(kpis)}
                    onChange={(selectedOptions) => {
                      setSelectedKpis(selectedOptions as Option[]);
                    }}
                    value={selectedKpis}
                    placeholder="Select Key Performance Indicators"
                  />
                </NoSSR>

                {/* Kpi Table */}

                <TableContainer>
                  <Table {...getTableProps()}>
                    <Thead>
                      {headerGroups.map((headerGroup, index) => (
                        <Tr
                          {...headerGroup.getHeaderGroupProps()}
                          key={`${headerGroup.id}-${index}`}
                        >
                          {headerGroup.headers.map((column) => (
                            <Th {...column.getHeaderProps()} key={column.id}>
                              {column.render("Header")}
                            </Th>
                          ))}
                        </Tr>
                      ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                      {rows.map((row) => {
                        prepareRow(row);
                        return (
                          <Tr {...row.getRowProps()} key={row.id}>
                            {row.cells.map((cell) => (
                              <Td {...cell.getCellProps()} key={cell.column.id}>
                                {cell.render("Cell")}
                              </Td>
                            ))}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>

              {/* Kpi by format and first word selector */}
              <h3>KPI for Line Chart Analysis</h3>
              <NoSSR>
                <Select
                  options={getReactSelectOptionsFromGroupedKpis(
                    groupedByFormatAndFirstWord,
                  )}
                  onChange={(selectedOption) => {
                    setSelectedKpiFormatAndFirstWordGroup(
                      selectedOption as Option,
                    );
                  }}
                  placeholder="Select KPI for the line chart by format and primary group"
                  value={selectedKpiFormatAndFirstWordGroup}
                  id="kpi-by-format-and-first-word-group"
                />
              </NoSSR>

              {/* Line Chart */}
              <div className={style.metrics}>
                <h4>Financial Metrics</h4>
                <p>Key financial performance metrics</p>
                <Box
                  h="300px"
                  w='100%'
                >
                  <Line
                    data={lineChartData}
                    options={{
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </Box>
              </div>
            </>
          )}


        </div>
      </div>
    </section>
  )
}

export default Dashboard