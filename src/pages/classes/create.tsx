import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { classSchema } from "@/lib/schema";
import { useForm } from "@refinedev/react-hook-form";
import { useBack } from "@refinedev/core";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import UploadWidget from "@/components/upload-widget";
import { UploadWidgetValue } from "@/types";

const teachers = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Brown" },
];

const subjects = [
  { id: 1, name: "Mathematics", code: "MATH" },
  { id: 2, name: "English Literature", code: "ENLIT" },
  { id: 3, name: "Physics", code: "PHYS" },
  { id: 4, name: "History", code: "HIST" },
];

const CLASS_STATUS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;

type ClassForm = z.infer<typeof classSchema>;

const CreateClasses = () => {
  const back = useBack();

  const form = useForm<ClassForm>({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      resource: "classes",
      action: "create",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    control,
  } = form;

  const bannerPublicId = form.watch("bannerCldPubId");

  async function onSubmit(values: ClassForm) {
    try {
      console.log(values);
    } catch (e) {
      console.error("Error creating classes", e);
    }
  }

  return (
    <CreateView className="class-view">
      <Breadcrumb />

      <h1 className="page-title">Create a Class</h1>

      <div className="intro-row">
        <p>Provide the required information below to add a class.</p>

        <Button onClick={back}>Go Back</Button>
      </div>

      <Separator />

      <div className="my-4 flex justify-center">
        <Card className="class-form-card w-full max-w-4xl">
          <CardHeader className="relative z-10">
            <CardTitle>Fill out the form </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  name="bannerUrl"
                  control={control}
                  render={({ field }) => {
                    const handleBannerUpload = (
                      file: UploadWidgetValue | null,
                    ) => {
                      if (file) {
                        field.onChange(file.url);
                        form.setValue("bannerCldPubId", file.publicId, {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      } else {
                        field.onChange("");
                        form.setValue("bannerCldPubId", "", {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>
                          Banner Image{" "}
                          <span className="text-orange-600">*</span>
                        </FormLabel>{" "}
                        <FormControl>
                          <UploadWidget
                            value={
                              field.value
                                ? {
                                    url: field.value,
                                    publicId: bannerPublicId ?? "",
                                  }
                                : null
                            }
                            onChange={handleBannerUpload}
                          />
                        </FormControl>
                        <FormMessage />
                        {errors.bannerCldPubId && !errors.bannerUrl && (
                          <p>{errors.bannerCldPubId.message?.toString()}</p>
                        )}
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Introduction to Biology - section A"
                      />
                      {errors ? (
                        <p>{errors.name?.message?.toString()}</p>
                      ) : null}
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="subjectId"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString() ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem
                                value={subject.id.toString()}
                                key={subject.id}
                              >
                                {subject.name} ({subject.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors ? (
                          <p>{errors?.subjectId?.message?.toString()}</p>
                        ) : null}
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="teacherId"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="select a teacher" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem
                                value={teacher.id.toString()}
                                key={teacher.id}
                              >
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors ? (
                          <p>{errors.teacherId?.message?.toString()}</p>
                        ) : null}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    name="capacity"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Capacity <span className="text-orange-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            placeholder="30"
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(
                                value === ""
                                  ? undefined
                                  : (Number(value) as unknown as number),
                              );
                            }}
                            value={field.value ?? ""}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        {errors ? (
                          <p>{errors.capacity?.message?.toString()}</p>
                        ) : null}
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CLASS_STATUS.map((status) => (
                              <SelectItem
                                value={status.value}
                                key={status.value}
                              >
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors ? (
                          <p>{errors.status?.message?.toString()}</p>
                        ) : null}
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <FormField
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Description <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief description about the class"
                          {...field}
                        />
                      </FormControl>
                      {errors ? (
                        <p>{errors.description?.message?.toString()}</p>
                      ) : null}
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Creating..." : "Create Class"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default CreateClasses;
