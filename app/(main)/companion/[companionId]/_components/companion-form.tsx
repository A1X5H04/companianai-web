"use client";

import ImageUpload from "@/components/image-upload";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Category, Companion } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const PREAMBLE =
  "You are Cristiano Ronaldo. You are a world-famous footballer, known for your dedication, agility, and countless accolades in the football world. Your dedication to training and fitness is unmatched, and you have played for some of the world's top football clubs. Off the field, you're known for your charm, sharp fashion sense, and charitable work. Your passion for the sport is evident every time you step onto the pitch. You cherish the support of your fans and are driven by a relentless ambition to be the best.";

function CompanionForm({ initialData, categories }: CompanionFormProps) {
  const router = useRouter();
  const { register, formState, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      instruction: initialData?.instruction || "",
      imageSrc: initialData?.imageSrc || "",
      seed: initialData?.seed || "",
      categoryId: initialData?.categoryId || undefined,
    },
  });

  const isSubmitting = formState.isSubmitting;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (initialData) {
        await axios.patch(`/api/companion/${initialData.id}`, data);
        toast.success("Companion created successfully!");
      } else {
        await axios.post("/api/companion", data);
        toast.success("Companion updated successfully!");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="h-full p-4 space-y-2 max-w-4xl mx-auto">
      <form className="space-y-12" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="pb-4">
            <h2 className="text-xl font-bold">Basic Information</h2>
            <p className="text-content1-foreground/50 text-sm">
              Basic Information about your companion
            </p>
          </div>
          <Divider className="mb-6" />
          <div className="mb-10">
            <ImageUpload
              disabled={isSubmitting}
              onChange={(value) => setValue("imageSrc", value)}
              value={initialData?.imageSrc}
            />
          </div>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("name", {
                  required: "Name is a required field!",
                  value: initialData?.name,
                })}
                label="Name"
                placeholder="Name of the companion"
                name="name"
                isInvalid={formState.errors.name ? true : false}
                errorMessage={formState.errors.name?.message}
                size="sm"
              />
              <Select
                placeholder="Select a Category"
                size="sm"
                {...register("categoryId", {
                  required: "Category is a required field!",
                })}
                isInvalid={formState.errors.categoryId ? true : false}
                errorMessage={formState.errors.categoryId?.message}
                name="categoryId"
              >
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Textarea
              label="Description"
              required
              placeholder="This is a description of the companion"
              {...register("description", {
                required: "Description is a required field!",
              })}
              isInvalid={formState.errors.description ? true : false}
              errorMessage={formState.errors.description?.message}
              name="description"
              size="sm"
            />
          </div>
        </div>
        <div>
          <div className="pb-4">
            <h2 className="text-xl font-bold">Configuration</h2>
            <p className="text-content1-foreground/50 text-sm">
              Detailed information for AI Behaviour
            </p>
          </div>
          <Divider className="mb-6" />
          <div className="space-y-5">
            <Textarea
              label="Instructions"
              description="Instructions for the companion - The more the better"
              placeholder={PREAMBLE}
              {...register("instruction", {
                required: "You cannot leave this blank!",
                minLength: {
                  value: 200,
                  message: "Please add at least 200 characters",
                },
              })}
              isInvalid={formState.errors.instruction ? true : false}
              errorMessage={formState.errors.instruction?.message}
              name="instruction"
              size="sm"
            />
            <Textarea
              label="Example Conversation"
              description="Conversation starter for the companion"
              placeholder={PREAMBLE}
              {...register("seed", {
                required: "You cannot leave this blank either!",
                minLength: {
                  value: 200,
                  message: "Please add at least 200 characters",
                },
              })}
              isInvalid={formState.errors.seed ? true : false}
              errorMessage={formState.errors.seed?.message}
              name="seed"
              size="sm"
            />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <Button type="submit" color="primary" className="font-bold">
            {initialData ? "Update Companion" : "Create Companion!"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CompanionForm;
