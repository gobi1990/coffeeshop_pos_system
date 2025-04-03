import { useState, useMemo, useCallback } from "react";
import { Calendar as CalendarIcon, Download, Filter, SortAsc } from "lucide-react";
import { employeeList } from "../data/mockData";
import CustomButton from "./customButton";


const EmployeesSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  
 
  const formattedSelectedDate = useMemo(() => {
    return selectedDate.toISOString().split("T")[0];
  }, [selectedDate]);

  const filteredEmployees = useMemo(() => {
    return employeeList.filter((emp) => emp.date === formattedSelectedDate);
  }, [formattedSelectedDate]);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
  }, []);

  const tableHeaders = useMemo(() => [
    "ID",
    "Name",
    "Department",
    "Start Time",
    "End Time",
    "Duration",
    "Shift Type",
    "Role"
  ], []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Employees Overview</h2>
      <div className="bg-white rounded-lg shadow p-3 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-gray-600" />
            <input
            type="date"
            value={formattedSelectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-md p-3 text-m focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          </div>
          <div className="flex items-center space-x-6">
          <SortAsc className="h-6 w-6 text-gray-600"/>
          <Filter className="h-6 w-6 text-gray-600"/>
          <div className="w-30 space-x-2">
          <CustomButton onClick={() => {}} label="Export" icon={<Download className="h-5 w-5" />} />
          </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    className="p-3 text-left text-sm font-semibold text-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="bg-gray h-12 shadow mb-10 hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-700">{employee.id}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.name}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.role}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.department}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.startTime}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.endTime}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.duration}</td>
                    <td className="p-3 text-sm text-gray-700">{employee.shiftType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-500">
                    No employees scheduled for this date
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeesSection;