import styled from "styled-components";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Input,
  InputNumber,
  Radios,
} from "../../components";
import { ArrowLeftRight } from "lucide-react";
import { theme } from "../../utils";

type IType = "one-way" | "round-trip";

const formSchema = z.object({
  type: z.string().min(1, "Required!"),
  from: z.string().min(1, "Required!"),
  to: z.string().min(1, "Required!"),
  departure: z.string().min(1, "Required!"),
  return: z.string().min(1, "Required!"),
  passengers: z.number().min(1, "Required!"),
});

export type FormSchema = z.infer<typeof formSchema>;

const Home = () => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "one-way" as IType,
      from: "",
      to: "",
      passengers: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    console.log(data);
  };

  return (
    <Wrapper>
      <h1>Flights</h1>
      <p>Book your flights to anywhere</p>
      <Card className="shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <Radios
          control={control}
          name="type"
          items={[
            { label: "One-way", value: "one-way" },
            { label: "Round-trip", value: "round-trip" },
          ]}
        />

        <Flex>
          <Input
            label="Where From?"
            control={control}
            name="from"
            error={errors.from?.message || ""}
          />
          <div className="swap">
            <ArrowLeftRight />
          </div>
          <Input
            label="Where To?"
            control={control}
            name="to"
            error={errors.to?.message || ""}
          />
        </Flex>

        <DatePicker
          control={control}
          name="departure"
          label="Departure"
          error={errors.departure?.message || ""}
        />
        <DatePicker
          control={control}
          name="return"
          label="Return"
          error={errors.return?.message || ""}
        />

        <InputNumber
          value={getValues("passengers")}
          onChange={(value) => setValue("passengers", value)}
          label="Passengers"
          error={errors.passengers?.message || ""}
        />
        <Button>Search</Button>
      </Card>
    </Wrapper>
  );
};

export default Home;

const Flex = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;

  & .swap {
    width: 40px;
    height: 40px;
    background: #215ce51c;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: ${theme.primary};
    display: flex;

    & svg {
      width: 18px;
    }
  }

  & .input-wrapper {
    flex: 1;
  }
`;

const Wrapper = styled.div`
  & > h1 {
    text-align: center;
    margin-top: 30px;
    font-size: 34px;
    font-weight: 400;
    color: #101827;
    margin-bottom: 5px;
  }

  & > p {
    text-align: center;
    margin-bottom: 30px;
    font-size: 14px;
    color: #4b5563;
  }
`;

const Card = styled.form`
  padding: 2rem;
  max-width: 800px;
  margin: 1rem auto;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & .radios {
    justify-content: center;
  }

  & > button {
    min-width: 300px;
    margin: 0px auto;
    min-height: 40px;
  }
`;
