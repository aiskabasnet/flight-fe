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

const formSchema = z
  .object({
    type: z.string().min(1, "Required!"),
    from: z
      .any()
      .refine((val) => val && val.skyId, "Please select departure airport"),
    to: z
      .any()
      .refine((val) => val && val.skyId, "Please select destination airport"),
    departure: z.date().min(new Date(), "Departure date must be in the future"),
    return: z.date().optional(),
    passengers: z.number().min(1, "Required!"),
  })
  .refine(
    (data) => {
      if (data.type === "round-trip" && data.return) {
        return data.return > data.departure;
      }
      return true;
    },
    {
      message: "Return date must be after departure date",
      path: ["return"],
    }
  );

export type FormSchema = z.infer<typeof formSchema>;

const Home = () => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "round-trip" as IType,
      from: "",
      to: "",
      passengers: 1,
    },
  });

  const onSubmit = (data: FormSchema) => {
    // Convert dates to ISO strings for API calls if needed
    const formData = {
      ...data,
      departure: data.departure.toISOString(),
      return: data.return?.toISOString(),
    };
    console.log("Form data:", formData);
    console.log("Original dates:", data.departure, data.return);
  };

  console.log(getValues());
  return (
    <Wrapper>
      <h1>Flights</h1>
      <p>Book your flights to anywhere</p>
      <Card className="styled-card" onSubmit={handleSubmit(onSubmit)}>
        <Radios
          control={control}
          name="type"
          items={[
            { label: "Round-trip", value: "round-trip" },
            { label: "One-way", value: "one-way" },
          ]}
        />

        <Flex>
          <Input
            label="Where From?"
            onSelect={(value) => setValue("from", value)}
            value={getValues("from")}
            error={errors.from?.message?.toString() || ""}
          />
          <div className="swap">
            <ArrowLeftRight />
          </div>
          <Input
            label="Where To?"
            onSelect={(value) => setValue("to", value)}
            value={getValues("to")}
            error={errors.to?.message?.toString() || ""}
          />
        </Flex>

        <DatePicker
          control={control}
          name="departure"
          label="Departure"
          error={errors.departure?.message || ""}
        />
        {watch("type") === "round-trip" && (
          <DatePicker
            control={control}
            name="return"
            label="Return"
            error={errors.return?.message || ""}
          />
        )}

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
  max-width: 800px;
  margin: 1rem auto;
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
