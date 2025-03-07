/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Check, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchData } from "@/hooks/fetch/useFetchData";
import { usePostData } from "@/hooks/fetch/usePostData ";
import { ApiEndPoint } from "@/types/api/api-types";
import CacheKeys from "@/types/enums/cache-keys-enum";

type SearchType = "steps" | "topics" | "subtopics";

type CommonSearchProps = {
  type: SearchType;
  onSelect: (items: any[]) => void;
  onClose: () => void;
  stepId?: string;
  topicId?: string;
};

export function SearchAndSelect({ type, onSelect, onClose, stepId, topicId }: CommonSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchQuery]);

  const endPointAndQueryKey = {
    steps: {
      endpoint: ApiEndPoint.GET_INTERVIEW_STEPS_SEARCH,
      queryKey: CacheKeys.GET_INTERVIEW_STEPS_SEARCH,
      ids: []
    },
    topics: {
      endpoint: ApiEndPoint.GET_INTERVIEW_TOPICS_SEARCH,
      queryKey: CacheKeys.GET_INTERVIEW_TOPICS_SEARCH,
      ids: [stepId!]
    },
    subtopics: {
      endpoint: ApiEndPoint.GET_INTERVIEW_SUBTOPICS_SEARCH,
      queryKey: CacheKeys.GET_INTERVIEW_SUBTOPICS_SEARCH,
      ids: [stepId!, topicId!]
    }
  };

  const endpoint = endPointAndQueryKey[type].endpoint;
  const queryKey = endPointAndQueryKey[type].queryKey;
  const ids = endPointAndQueryKey[type].ids;

  const {
    data: filteredItems,
    isLoading,
    refetch
  } = useFetchData<any[]>(
    endpoint,
    queryKey,
    ids,
    { query: debouncedQuery }, // always pass the query
    type === "subtopics" ? !!stepId && !!topicId : type === "steps" || !!stepId
  );
  console.log(!!debouncedQuery && !!stepId && !!topicId);

  console.log(stepId);

  const { mutate: addTopic, isLoading: isAdding } = usePostData<any, any>(`/interview-topics/${stepId}`);

  const handleToggle = (itemId: string) => {
    setSelectedItems((prev) => {
      const updatedSelection = new Set(prev);

      if (updatedSelection.has(itemId)) {
        updatedSelection.delete(itemId);
      } else {
        updatedSelection.add(itemId);
      }

      return new Set(updatedSelection); // Return a new Set to trigger state update
    });
  };

  const handleDone = () => {
    const selectedList = (filteredItems || []).filter((item) => selectedItems.has(item.id));
    onSelect(
      type === "topics"
        ? selectedList.map((item) => ({ ...item, addImprovisations: false, subTopics: [], questions: [], isSelected: true }))
        : selectedList
    );
    onClose();
  };

  const handleAddNew = () => {
    if (searchQuery.trim() && type === "topics") {
      const newTopic = {
        id: `topic-${Date.now()}`,
        title: searchQuery.trim(),
        addImprovisations: false,
        subTopics: [],
        questions: []
      };
      addTopic(newTopic, {
        onSuccess: () => {
          refetch();
          onClose();
        }
      });
    }
  };

  return (
    <div className="space-y-2 relative">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={`Search ${type}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      <div className="w-full absolute bg-white z-10 border rounded">
        <div className="relative  w-full min-h-[80px] space-y-2 max-h-[200px] overflow-y-auto">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : filteredItems?.length ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-2 rounded-lg p-2 hover:bg-accent cursor-pointer"
                onClick={() => handleToggle(item.id)}
              >
                <Checkbox checked={selectedItems.has(item.id)} />
                <span className="flex-1">{item.title}</span>
              </div>
            ))
          ) : searchQuery && !isLoading ? (
            <div className="space-y-4">
              <div className="text-center text-muted-foreground py-2">No results found</div>
              {type === "topics" && (
                <Button className="w-full justify-between" variant="outline" onClick={handleAddNew} disabled={isAdding}>
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add New"}
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ) : null}
        </div>

        <div className="relative flex justify-end p-2 space-x-2">
          <Button size="sm" variant={"outline"} onClick={handleDone}>
            <X className="h-4 w-4" /> Close
          </Button>
          {selectedItems.size > 0 && (
            <Button size="sm" onClick={handleDone}>
              <Check className="mr-2 h-4 w-4" /> Done
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
