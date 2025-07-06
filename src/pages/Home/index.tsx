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
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

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
    return: z.date().optional().nullable(),
    passengers: z.number().min(1, "Required!"),
  })
  .superRefine((val, ctx) => {
    if (val.type === "round-trip" && !val.return) {
      ctx.addIssue({
        path: ["return"],
        code: z.ZodIssueCode.custom,
        message: "Return date is required for a round‑trip",
      });
    }

    // Extra guard: if both dates exist, return must be after departure
    if (val.departure && val.return && val.return <= val.departure) {
      ctx.addIssue({
        path: ["return"],
        code: z.ZodIssueCode.custom,
        message: "Return date must be after departure",
      });
    }
  });

export type FormSchema = z.infer<typeof formSchema>;

const Home = () => {
  const navigate = useNavigate();

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
    const formData = {
      originSkyId: data.from?.skyId,
      destinationSkyId: data.to?.skyId,
      departureDate: dayjs(data.departure).format("YYYY-MM-DD"),
      returnDate: data.return ? dayjs(data.return).format("YYYY-MM-DD") : null,
      adults: data.passengers,
      originEntityId: data.from?.entityId,
      destinationEntityId: data.to?.entityId,
    };

    // Filtering out null values for URLSearchParams
    const searchParams = Object.fromEntries(
      Object.entries(formData).filter(([, value]) => value !== null)
    );

    console.log(searchParams, data);

    navigate(`/search-results?${new URLSearchParams(searchParams).toString()}`);
  };

  const departure = watch("departure");
  const returnDate = watch("return");

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
            onSelect={(value) => {
              setValue("from", value, { shouldDirty: true });
            }}
            value={watch("from")}
            error={errors.from?.message?.toString() || ""}
          />
          <div className="swap">
            <ArrowLeftRight />
          </div>
          <Input
            label="Where To?"
            onSelect={(value) => {
              setValue("to", value, { shouldDirty: true });
            }}
            value={watch("to")}
            error={errors.to?.message?.toString() || ""}
          />
        </Flex>

        <DatePicker
          control={control}
          name="departure"
          label="Departure"
          error={errors.departure?.message || ""}
          maxDate={returnDate ? dayjs(returnDate) : undefined}
        />
        {watch("type") === "round-trip" && (
          <DatePicker
            control={control}
            name="return"
            label="Return"
            minDate={departure ? dayjs(departure) : dayjs().startOf("day")}
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

  @media (max-width: 575px) {
    flex-direction: column;
    gap: 2rem;

    & > .input-wrapper {
      width: 100%;
    }
  }
`;

const Wrapper = styled.div`
  margin: 0 2rem;
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

  @media (max-width: 575px) {
    & > button {
      min-width: 100%;
      margin-top: 1rem;
    }
  }
`;
