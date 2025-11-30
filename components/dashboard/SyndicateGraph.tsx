"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Maximize2, Minimize2, RefreshCw, Share2, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA (Constant) ---
const DATA_NODES = [
  { id: "PIF", group: 1, radius: 45, label: "PIF" },
  { id: "Sanabil", group: 1, radius: 30, label: "Sanabil" },
  { id: "Aramco", group: 1, radius: 32, label: "Aramco" },
  { id: "STV", group: 2, radius: 25, label: "STV" },
  { id: "Raed", group: 2, radius: 20, label: "Raed" },
  { id: "Sequoia", group: 2, radius: 20, label: "Sequoia" },
  { id: "Nana", group: 3, radius: 12, label: "Nana" },
  { id: "Salla", group: 3, radius: 14, label: "Salla" },
  { id: "Tamara", group: 3, radius: 16, label: "Tamara" },
  { id: "Foodics", group: 3, radius: 12, label: "Foodics" },
  { id: "Noor", group: 3, radius: 10, label: "Noor" },
  { id: "Mozn", group: 3, radius: 10, label: "Mozn" },
  { id: "Unifonic", group: 3, radius: 14, label: "Unifonic" },
  { id: "Lean", group: 3, radius: 10, label: "Lean" },
];

const DATA_LINKS = [
  { source: "PIF", target: "Sanabil" },
  { source: "PIF", target: "Aramco" },
  { source: "PIF", target: "STV" },
  { source: "Sanabil", target: "Foodics" },
  { source: "Sanabil", target: "Nana" },
  { source: "Sanabil", target: "Tamara" },
  { source: "STV", target: "Nana" },
  { source: "STV", target: "Salla" },
  { source: "STV", target: "Unifonic" },
  { source: "Aramco", target: "Mozn" },
  { source: "Raed", target: "Lean" },
  { source: "Raed", target: "Unifonic" },
  { source: "Sequoia", target: "Tamara" },
];

export default function SyndicateGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // 1. Get Dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 2. CRITICAL FIX: Deep Clone Data so React Strict Mode doesn't break D3
    const nodes = DATA_NODES.map(d => ({ ...d }));
    const links = DATA_LINKS.map(d => ({ ...d }));

    // 3. Clear Previous
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .style("cursor", "grab");

    // 4. Glow Filters
    const defs = svg.append("defs");
    const createGlow = (id: string, color: string) => {
      const filter = defs.append("filter").attr("id", id);
      filter.append("feGaussianBlur").attr("stdDeviation", "4.5").attr("result", "coloredBlur");
      const merge = filter.append("feMerge");
      merge.append("feMergeNode").attr("in", "coloredBlur");
      merge.append("feMergeNode").attr("in", "SourceGraphic");
    };
    createGlow("glow-1", "#fbbf24");
    createGlow("glow-2", "#3b82f6");
    createGlow("glow-3", "#34d399");

    // 5. Physics Simulation
    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius((d: any) => d.radius + 15));

    // 6. Draw Elements
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#52525b")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.radius)
      .attr("fill", "#09090b")
      .attr("stroke", (d: any) => {
        if (selectedNode === d.id) return "#34d399";
        return d.group === 1 ? "#fbbf24" : d.group === 2 ? "#3b82f6" : "#34d399";
      })
      .attr("stroke-width", (d: any) => selectedNode === d.id ? 3 : 2)
      .style("filter", (d: any) => selectedNode === d.id ? "drop-shadow(0px 0px 8px rgba(0, 255, 148, 0.6))" : `url(#glow-${d.group})`)
      .style("cursor", "pointer")
      .on("click", function(event, d: any) {
        event.stopPropagation();
        setSelectedNode(selectedNode === d.id ? null : d.id);
      });

    const labels = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d: any) => d.label)
      .attr("font-size", (d: any) => d.group === 1 ? "12px" : "10px")
      .attr("fill", "#fff")
      .attr("text-anchor", "middle")
      .attr("dy", (d: any) => d.radius + 15)
      .style("font-family", "monospace")
      .style("pointer-events", "none");

    // 7. Tick Function
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    // 8. Drag Interaction
    const drag = d3.drag()
      .on("start", (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        svg.style("cursor", "grabbing");
      })
      .on("drag", (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d: any) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        svg.style("cursor", "grab");
      });

    node.call(drag as any);

    return () => { simulation.stop(); };
  }, [isExpanded, selectedNode]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "bg-zinc-950 border border-zinc-800 rounded-xl relative overflow-hidden transition-all duration-500 flex flex-col",
        isExpanded ? "fixed inset-4 z-50 h-auto" : "w-full h-full min-h-[450px]"
      )}
    >
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
        <div>
          <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
            <Share2 size={14} className="text-emerald-400" />
            Syndicate Web
          </h3>
          <p className="text-xs text-zinc-600">Force-Directed Relationship Map</p>
        </div>
        <div className="flex gap-2 pointer-events-auto">
          <button onClick={() => window.location.reload()} className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 border border-zinc-800">
            <RefreshCw size={16} />
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 bg-zinc-900 hover:bg-zinc-800 rounded-full text-zinc-400 border border-zinc-800">
            {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>
      
      {/* D3 Canvas */}
      <svg ref={svgRef} className="w-full h-full block touch-none" onClick={() => setSelectedNode(null)} />
      
      {/* Node Info Panel */}
      {selectedNode && (() => {
        const nodeData = DATA_NODES.find(n => n.id === selectedNode);
        if (!nodeData) return null;
        
        const connections = DATA_LINKS.filter(l => l.source === selectedNode || l.target === selectedNode);
        const connectedNodes = connections.map(c => 
          c.source === selectedNode ? c.target : c.source
        );
        const groupLabel = nodeData.group === 1 ? "Sovereign" : nodeData.group === 2 ? "VC Firm" : "Startup";
        const groupColor = nodeData.group === 1 ? "#fbbf24" : nodeData.group === 2 ? "#3b82f6" : "#10b981";
        
        return (
          <div className="absolute top-20 left-4 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-lg p-4 shadow-2xl z-20 min-w-[250px] pointer-events-auto">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                style={{ 
                  backgroundColor: groupColor + "20",
                  border: `2px solid ${groupColor}`,
                  color: groupColor
                }}
              >
                {nodeData.label.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="text-sm font-mono text-white font-semibold">{nodeData.label}</h4>
                <p className="text-[10px] text-zinc-500 uppercase">{groupLabel}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <p className="text-[9px] text-zinc-500 uppercase mb-1">Connections</p>
                <p className="text-xs text-zinc-300 font-mono">{connections.length} links</p>
              </div>
              
              {connectedNodes.length > 0 && (
                <div>
                  <p className="text-[9px] text-zinc-500 uppercase mb-1">Connected To</p>
                  <div className="flex flex-wrap gap-1">
                    {connectedNodes.slice(0, 5).map((id, i) => {
                      const connectedNode = DATA_NODES.find(n => n.id === id);
                      if (!connectedNode) return null;
                      return (
                        <span
                          key={i}
                          className="text-[9px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 font-mono"
                        >
                          {connectedNode.label}
                        </span>
                      );
                    })}
                    {connectedNodes.length > 5 && (
                      <span className="text-[9px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 font-mono">
                        +{connectedNodes.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-zinc-300"
            >
              <X size={14} />
            </button>
          </div>
        );
      })()}
      
      {/* Footer Legend */}
      <div className="absolute bottom-4 left-4 flex gap-4 pointer-events-none z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
          <span className="text-[10px] text-zinc-500 uppercase">Sovereign</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
          <span className="text-[10px] text-zinc-500 uppercase">VC Firm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-[10px] text-zinc-500 uppercase">Startup</span>
        </div>
      </div>
    </div>
  );
}
