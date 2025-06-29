import React from 'react';
import { Calendar, Tag, Globe, Filter } from 'lucide-react';
import { FilterOptions } from '../types';
import { categories, sources } from "../types";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFiltersChange
}) => {
  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <Filter className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>

        <div className="space-y-6">
          {/* Date Range Filter */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'all', label: 'All Time' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' }
              ].map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={option.value}
                    checked={filters.dateRange === option.value}
                    onChange={(e) => onFiltersChange({ 
                      ...filters, 
                      dateRange: e.target.value as FilterOptions['dateRange'] 
                    })}
                    className="text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Tag className="w-4 h-4" />
              <span>Categories</span>
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
                    className="text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Source Filter */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <Globe className="w-4 h-4" />
              <span>Sources</span>
            </label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {sources.map(source => (
                <label key={source} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="source"
                    value={source}
                    checked={filters.source === source}
                    onChange={(e) => onFiltersChange({ ...filters, source: e.target.value })}
                    className="text-indigo-600 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {source}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onFiltersChange({
                keyword: '',
                dateRange: 'all',
                category: 'All Categories',
                source: 'All Sources'
              })}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;