export type LLMInterface ={
    tool_calls?: ToolCall[];
    invalid_tool_calls?: InvalidToolCall[];
    tool_call_chunks?: ToolCallChunk[];
    usage_metadata?: UsageMetadata;
    lc_aliases: Record<string, string>;
    concat: (chunk: AIMessageChunk) => AIMessageChunk;
    lc_namespace: string[];
    lc_serializable: boolean;
    text: string;
    name?: string;
    response_metadata: Record<string, any>;
    id?: string;
    getType: () => "function" | "remove" | "system" | "human" | "ai" | "generic" | "developer" | "tool";
    toDict: () => StoredMessage;
    lc_kwargs: SerializedFields;
    lc_id: string[];
    lc_attributes: SerializedFields | undefined;
    lc_serializable_keys: string[] | undefined;
    toJSON: () => SerializedConstructor | SerializedSecret | SerializedNotImplemented;
    toJSONNotImplemented: () => SerializedNotImplemented;
}