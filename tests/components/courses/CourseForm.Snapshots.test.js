import React from "react";
import renderer from "react-test-renderer";
import { courses, authors } from "../../../tools/mockData";
import CourseForm from "../../../src/components/courses/CourseForm";

it("sets submit button label to 'Saving...' when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );

  expect(tree).toMatchSnapshot();
});

it("sets submit button label to 'Save' when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );

  expect(tree).toMatchSnapshot();
});
