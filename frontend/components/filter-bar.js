import { useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "./ui/dropdown-menu";

export function FilterBar({ onFilterChange, salesReps }) {
  const [regions, setRegions] = useState([])
  const [roles, setRoles] = useState([])
  const [dealStatuses, setDealStatuses] = useState([])
  const [selectedRegions, setSelectedRegion] = useState(["all"])
  const [selectedRoles, setSelectedRole] = useState(["all"])
  const [selectedDealStatuses, setSelectedDealStatus] = useState(["all"])

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        regions: selectedRegions,
        roles: selectedRoles,
        dealStatuses: selectedDealStatuses,
      })
    }
  }, [selectedRegions, selectedRoles, selectedDealStatuses])

  useEffect(() => {
    if (salesReps.length > 0) {
      const uniqueRegions = [...new Set(salesReps.map((rep) => rep.region))]
      setRegions(uniqueRegions)

      const uniqueRoles = [...new Set(salesReps.map((rep) => rep.role))]
      setRoles(uniqueRoles)

      const statuses = salesReps.flatMap((rep) => rep.deals.map((deal) => deal.status))
      const uniqueStatuses = [...new Set(statuses)]
      setDealStatuses(uniqueStatuses)
    }
  }, [salesReps])

  const handleRegionChange = (value) => {
    setSelectedRegion((prev) => {
      if (value === "all") {
        return ["all"]
      }

      let updated = prev.includes("all") ? [] : [...prev]
      if (updated.includes(value)) {
        updated = updated.filter((r) => r !== value)
      } else {
        updated.push(value)
      }

      if (updated.length === 0) {
        updated = ["all"]
      }

      return updated
    })
  }

  const handleRoleChange = (value) => {
    setSelectedRole((prev) => {
      if (value === "all") {
        return ["all"]
      }

      let updated = prev.includes("all") ? [] : [...prev]
      if (updated.includes(value)) {
        updated = updated.filter((r) => r !== value)
      } else {
        updated.push(value)
      }

      if (updated.length === 0) {
        updated = ["all"]
      }

      return updated
    })
  }

  const handleDealStatusChange = (value) => {
    setSelectedDealStatus((prev) => {
      if (value === "all") {
        return ["all"]
      }

      let updated = prev.includes("all") ? [] : [...prev]
      if (updated.includes(value)) {
        updated = updated.filter((r) => r !== value)
      } else {
        updated.push(value)
      }

      if (updated.length === 0) {
        updated = ["all"]
      }

      return updated
    })
  }

  const handleReset = () => {
    setSelectedRegion(["all"])
    setSelectedRole(["all"])
    setSelectedDealStatus(["all"])
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (!selectedRegions.includes("all")) count += selectedRegions.length
    if (!selectedRoles.includes("all")) count += selectedRoles.length
    if (!selectedDealStatuses.includes("all")) count += selectedDealStatuses.length
    return count
  }

  const activeFilterCount = getActiveFilterCount()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex items-center gap-2"
        >
          <Filter className="h-4 w-4 text-blue-500" />
          <span>Filter</span>
          {activeFilterCount > 0 && (
            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 max-h-60 overflow-y-auto">
        <DropdownMenuLabel>Filter Sales Representatives</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Region
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={`cursor-pointer ${selectedRegions.includes("all") ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`}
            onClick={() => handleRegionChange("all")}
          >
            All Regions
          </DropdownMenuItem>
          {regions.map((region) => (
            <DropdownMenuCheckboxItem
              key={region}
              checked={selectedRegions.includes(region)}
              className={`cursor-pointer ${selectedRegions.includes(region) ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`}
              onCheckedChange={() => handleRegionChange(region)}
              onSelect={(e) => e.preventDefault()}
            >
              {region}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Role
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={`cursor-pointer ${selectedRoles.includes("all") ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`}
            onClick={() => handleRoleChange("all")}
          >
            All Roles
          </DropdownMenuItem>
          {roles.map((role) => (
            <DropdownMenuCheckboxItem
              key={role}
              checked={selectedRoles.includes(role)}
              className={`cursor-pointer ${selectedRoles.includes(role) ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`}
              onCheckedChange={() => handleRoleChange(role)}
              onSelect={(e) => e.preventDefault()}
            >
              {role}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Deal Status
          </DropdownMenuLabel>
          <DropdownMenuItem
            className={`cursor-pointer ${selectedDealStatuses.includes("all") ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`}
            onClick={() => handleDealStatusChange("all")}
          >
            All Statuses
          </DropdownMenuItem>
          {dealStatuses.map((status) => (
            <DropdownMenuCheckboxItem
              key={status}
              checked={selectedDealStatuses.includes(status)}
              className={`cursor-pointer ${selectedDealStatuses.includes(status) ? "bg-blue-50 dark:bg-blue-900/20 font-medium" : ""}`}
              onCheckedChange={() => handleDealStatusChange(status)}
              onSelect={(e) => e.preventDefault()}
            >
              {status}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {activeFilterCount > 0 && (
          <div className="p-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/50"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}