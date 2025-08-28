import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";
import type { NoteTag } from "../../types/note";
import { createNote } from "../../services/noteService";
import type { CreateNoteProp } from "../../services/noteService";

interface NoteFormProps {
  onClose: () => void;
}

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const schema = Yup.object({
  title: Yup.string()
    .min(3, "Title must be at least 3 symbols")
    .max(50, "Title must be less 50 symbols")
    .required("Title is required"),
  content: Yup.string().max(500, "Content must be less 500 symbols"),
  tag: Yup.mixed<NoteTag>()
    .oneOf(TAGS, "Invalid tag")
    .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateNoteProp) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      onClose();
    },
    onError: (err) => {
      console.error("Failed to create note:", err);
    },
  });

  const initialValues: CreateNoteProp = {
    title: "",
    content: "",
    tag: "Todo",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values, helpers) => {
        const payload: CreateNoteProp = {
          title: values.title.trim(),
          content: values.content.trim(),
          tag: values.tag,
        };
        mutate(payload);
        helpers.resetForm();
      }}
    >
      {() => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" type="text" name="title" className={css.input} />
            <ErrorMessage className={css.error} component="span" name="title" />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
            />
            <ErrorMessage
              className={css.error}
              component="span"
              name="content"
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              <option value="">Select tag…</option>
              {TAGS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" className={css.error} component="span" />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={css.submitButton}
              disabled={isPending}
            >
              {isPending ? "Creating..." : "Create note"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
