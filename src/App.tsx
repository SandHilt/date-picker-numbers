import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import Input from "./components/Input";

interface DateProps {
  day: number;
  month: number;

  year: number;
}

function App() {
  const formRef = useRef<FormHandles>(null);
  const [myDate, setMyDate] = useState(new Date());
  const [initialData, setInitialData] = useState<DateProps>();
  const handleSubmit: SubmitHandler<DateProps> = (date) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      day: Yup.number().integer(),
      month: Yup.number().integer(),
      year: Yup.number().integer(),
    });

    schema
      .validate(date, { abortEarly: false })
      .then(() => {
        console.log("foi");

        setMyDate(new Date(date.year, date.month, date.day));
      })
      .catch((e) => {
        if (e instanceof Yup.ValidationError) {
          const errors: Record<string, string> = {};
          e.inner.forEach((x) => {
            errors[x.path ?? ""] = x.message;
          });
          formRef.current?.setErrors({});
        } else if (e instanceof Error) {
          console.error(e.message);
        }
      });
  };

  useEffect(() => {
    setInitialData({
      day: myDate.getDate(),
      month: myDate.getMonth() + 1,
      year: myDate.getFullYear(),
    });
  }, [myDate]);

  return (
    <Form ref={formRef} {...{ initialData }} onSubmit={handleSubmit}>
      <p>Segunda</p>
      <Input name="day" type="number" />
      <Input name="month" type="number" />
      <Input name="year" type="number" />
      <button type="submit">Enviar</button>
    </Form>
  );
}

export default App;
