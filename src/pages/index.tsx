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
import NoSSR from "react-no-ssr";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import type { Dealership, Kpi, KpiData, Option } from "@/typescript/interfaces";
import type { KpiManagerResponse } from "@pages/api/kpi-manager";
import Select from "react-select";
import {
  getReactSelectOptionsFromDealerships,
  getReactSelectOptionsFromKpis,
} from "@utils/helper";
import { getReactSelectOptionsFromGroupedKpis } from "@utils/helper";
import {
  Chart,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
  BarElement,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { useTableConfig } from "@hooks/useKpiTableConfig";
import { useKpiByFormatBarChart } from "@/hooks/useKpiByFormatBarChart";
import { useKpiByFormatAndFirstWordLineChart } from "@/hooks/useKpiByFormatAndFirstWordLineChart";
import { Link } from "@chakra-ui/next-js";

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

const Home = () => {
  const [dealerships, setDealerships] = useState<Dealership[]>([]);
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [kpiData, setKpiData] = useState<KpiData[]>([]);
  const [groupedByFormat, setGroupedbyFormatKpis] = useState<
    Record<string, Kpi[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [groupedByFormatAndFirstWord, setGroupedbyFormatAndFirstWordKpis] =
    useState<Record<string, Kpi[]>>({});
  const [selectedDealerships, setSelectedDealerships] = useState<Option[]>([]);
  const [selectedKpis, setSelectedKpis] = useState<Option[]>([]);
  const [selectedKpiFormatGroup, setSelectedKpiFormatGroup] =
    useState<Option>();
  const [ selectedKpiFormatAndFirstWordGroup, setSelectedKpiFormatAndFirstWordGroup] = useState<Option>();

  const { isOpen, onToggle } = useDisclosure();

  const kpiManagerApi = "/api/kpi-manager";

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
    <Box display="flex" height="100vh">
      {/* Sidenav */}
      <Box
        width={sidenavWidth}
        transition={sidenavTransition}
        overflow="hidden"
      >
        <Box p="4" bg="gray.100" height="100%">
          <Heading size="md" mb="4">
            Menu
          </Heading>
          <VStack align="start">
            <Link href="/">Dashboard</Link>
          </VStack>
        </Box>
      </Box>

      {/* Main Content */}
      <Box flex="1" p="4">
        <HStack>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
            aria-label="Toggle Sidebar"
          />
          <Heading>Quotus Technical</Heading>
        </HStack>
        <Text as="b">{introductionMessage}</Text>

        {/* Dealership Selector */}

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

        {/* KPI Selector */}
        {selectedDealerships.length > 0 && (
          <>
            <NoSSR>
              <Select
                isMulti
                isClearable
                options={getReactSelectOptionsFromKpis(kpis)}
                onChange={(selectedOptions) => {
                  setSelectedKpis(selectedOptions as Option[]);
                }}
                value={selectedKpis}
                placeholder="Then you can Select KPIs for the table"
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

            {/* Kpi Group by format Selector */}
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

            {/* Bar Chart */}
            <Box
              h="300px"
              w={`calc(100vw - ${sidenavWidth})`}
              transition={sidenavTransition}
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

            {/* Kpi by format and first word selector */}
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
                placeholder="Select Kpi By Format And First Word Group (Its just a way to classify I know its weird) for the line chart"
                value={selectedKpiFormatAndFirstWordGroup}
                id="kpi-by-format-and-first-word-group"
              />
            </NoSSR>

            {/* Line Chart */}
            <Box
              h="300px"
              w={`calc(100vw - ${sidenavWidth})`}
              transition={sidenavTransition}
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
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;

const introductionMessage = `
Welcome to the Quotus Technical test. This landing page is designed to test your creativity and ability to create a visually appealing and user-friendly interface. The current setup includes basic implementations of react-select, react-table, and chartjs (with rechart) to give you an idea of the existing functionality.

Feel free to use these libraries or replace them with any other library or dependency you prefer. The goal is to transform this unstyled page into a modern, aesthetically pleasing UI that demonstrates your design skills and attention to UX.

The graphs, tables, and selectors are provided as examples. You are encouraged to modify, replace, or remove them as you see fit. The data included is mock data, replicating what we actually have in the app, providing a realistic environment for your work.

This is your sandbox—make it your own. Management will focus on the visual style, while I will give a slight emphasis on code organization, as I already assume you have the necessary React knowledge.

Good luck, and have fun!
`;
