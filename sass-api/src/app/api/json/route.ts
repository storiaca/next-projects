import { NextRequest } from "next/server";
import { z, ZodTypeAny } from "zod";

const determineSchemaType = (schema: any) => {
  // {type: "array"} ili bilo koji tip

  if (!schema.hasOwnProperty("type")) {
    if (Array.isArray(schema)) {
      return "array";
    } else {
      return typeof schema;
    }
  }
};

/**
 *  "format": {
 *    "age": {"type": "number"}
 *  }
 */

const jsonSchemaToZod = (schema: any) => {
  const type = determineSchemaType(schema);

  switch (type) {
    case "string":
      return z.string().nullable();
    case "number":
      return z.number().nullable();
    case "boolean":
      return z.boolean().nullable();
    case "array":
      return z.array(jsonSchemaToZod(schema.items)).nullable();
    case "object":
      const shape: Record<string, ZodTypeAny> = {};

      const object = { name: { type: "string" } };
    //return z.object()
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // step 1: make sure incoming request is valid
  const genericSchema = z.object({
    data: z.string(),
    format: z.object({}).passthrough(),
  });

  const { data, format } = genericSchema.parse(body);

  // step 2:  create a schema from the expected user format
  const dynamicSchema = jsonSchemaToZod(format);

  return new Response("OK");
};
