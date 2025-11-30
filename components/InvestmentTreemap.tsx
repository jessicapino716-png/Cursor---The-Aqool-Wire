"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface InvestmentTreemapProps {
  data: {
    labels: string[];
    parents: string[];
    values: number[];
    text: string[];
  };
  title?: string;
}

export function InvestmentTreemap({ data, title = "Investment Breakdown" }: InvestmentTreemapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const updateTreemap = () => {
      if (!svgRef.current || !containerRef.current) return;

      const width = containerRef.current.clientWidth || 800;
      const height = containerRef.current.clientHeight || 500;

      if (width === 0 || height === 0) return;

      // Clear previous
      d3.select(svgRef.current).selectAll("*").remove();

    // Build nested hierarchy structure
    const dataMap = new Map<string, any>();
    
    // First pass: create all nodes
    data.labels.forEach((label, i) => {
      if (label !== 'Total') { // Skip the Total node itself
        dataMap.set(label, {
          name: label,
          parent: data.parents[i] || null,
          value: data.values[i],
          text: data.text[i],
          children: [],
        });
      }
    });

    // Second pass: build tree structure
    const rootData: any = { name: 'Total', children: [], value: 0 };
    
    // Add top-level children (those with parent 'Total')
    dataMap.forEach((node, label) => {
      if (!node.parent || node.parent === '' || node.parent === 'Total') {
        rootData.children.push(node);
      }
    });

    // Third pass: attach children to their parents
    dataMap.forEach((node, label) => {
      if (node.parent && node.parent !== 'Total' && node.parent !== '') {
        const parent = dataMap.get(node.parent);
        if (parent) {
          parent.children.push(node);
          // Remove from root's children if it was added there
          const rootIndex = rootData.children.indexOf(node);
          if (rootIndex > -1) {
            rootData.children.splice(rootIndex, 1);
          }
        }
      }
    });

    // Build hierarchy
    const root = d3.hierarchy(rootData)
      .sum((d: any) => {
        // Only sum leaf nodes, not intermediate nodes
        if (d.children && d.children.length > 0) {
          return 0; // Let d3.sum calculate from children
        }
        return d.value || 0;
      })
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    // Create treemap layout
    const treemap = d3.treemap()
      .size([width, height])
      .padding(2)
      .round(true);

    treemap(root as any);

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("font-family", "monospace");

    // Color scale
    const colorScale = d3.scaleOrdinal<string>()
      .domain(data.labels)
      .range([
        "#34d399", // Emerald-400 (standardized green)
        "#3b82f6", // Oasis Blue
        "#eab308", // Yellow
        "#f97316", // Orange
        "#a855f7", // Purple
        "#06b6d4", // Cyan
        "#34d399", // Emerald-400 (standardized green)
        "#f43f5e", // Rose
        "#78716c", // Stone
        "#a8a29e", // Sand
      ]);

    // Draw cells
    const cells = svg.selectAll("g")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    cells.append("rect")
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("fill", (d: any) => {
        if (d.depth === 0) return "#1c1917";
        if (d.depth === 1) return colorScale(d.data.name) + "40";
        return colorScale(d.data.name) + "60";
      })
      .attr("stroke", "#44403c")
      .attr("stroke-width", 1)
      .style("cursor", "pointer")
      .on("mouseenter", function(event, d: any) {
        d3.select(this)
          .attr("stroke", "#34d399")
          .attr("stroke-width", 2);
      })
      .on("mouseleave", function(event, d: any) {
        d3.select(this)
          .attr("stroke", "#44403c")
          .attr("stroke-width", 1);
      });

    // Add text labels
    cells.filter((d: any) => (d.x1 - d.x0) > 60 && (d.y1 - d.y0) > 30)
      .append("text")
      .attr("x", (d: any) => (d.x1 - d.x0) / 2)
      .attr("y", (d: any) => (d.y1 - d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("fill", "#a8a29e")
      .attr("font-size", (d: any) => {
        const area = (d.x1 - d.x0) * (d.y1 - d.y0);
        if (area > 10000) return "12px";
        if (area > 5000) return "10px";
        return "8px";
      })
      .text((d: any) => {
        if (d.depth === 0) return "";
        const name = d.data.name || "";
        return name.length > 15 ? name.substring(0, 12) + "..." : name;
      });

    // Add value labels for larger cells
    cells.filter((d: any) => (d.x1 - d.x0) > 80 && (d.y1 - d.y0) > 40 && d.depth > 0)
      .append("text")
      .attr("x", (d: any) => (d.x1 - d.x0) / 2)
      .attr("y", (d: any) => (d.y1 - d.y0) / 2 + 15)
      .attr("text-anchor", "middle")
      .attr("fill", "#78716c")
      .attr("font-size", "10px")
      .text((d: any) => {
        const value = d.data.value || 0;
        return value > 0 ? `${(value / 1000).toFixed(0)}B SAR` : "";
      });
    };

    // Initial render
    updateTreemap();

    // Handle resize
    const resizeObserver = new ResizeObserver(() => {
      updateTreemap();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [data, svgRef, containerRef]);

  return (
    <div className="w-full h-full flex flex-col">
      {title && (
        <div className="mb-4 flex-shrink-0">
          <h3 className="text-lg font-semibold text-[#a8a29e] font-serif">{title}</h3>
        </div>
      )}
      <div ref={containerRef} className="flex-1 min-h-0 w-full" style={{ minHeight: '500px' }}>
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </div>
  );
}

