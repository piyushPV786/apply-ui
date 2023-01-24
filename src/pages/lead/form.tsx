import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  getLeadApplicationDetails,
  getMasterData,
  register,
} from "../../service/service";

interface IMasterData {
  name: string;
  code: string;
}

const LeadForm = () => {
  const methods = useForm();
  const [masterData, setMasterData] = useState({});

  useEffect(() => {
    (async function () {
      const response = await getMasterData();
      setMasterData(response);

      const leadCode = "RLEAD00000015";
      const appCode = "RAPP00000020";

      const leadData = await getLeadApplicationDetails({
        leadCode,
        applicationCode: appCode,
        isDraft: false,
      });

      methods.reset(leadData);
    })();
  }, []);

  const saveLead = (e: any) => {
    e.preventDefault();
    const data = methods.watch();
    console.log("data", data);
  };
  const saveleadAsDraft = (e: any) => {
    e.preventDefault();
    const data = methods.watch();
    console.log("data", data);
  };
  return (
    <FormProvider {...methods}>
      <form>
        <PersonalInformation masterData={masterData} />
        <Address masterData={masterData} />
        <button onClick={saveLead}>Save</button>
        <button onClick={saveleadAsDraft}>Save As Draft</button>
      </form>
    </FormProvider>
  );
};
export default LeadForm;

const PersonalInformation = (props: any) => {
  const { masterData } = props;
  const { register } = useFormContext();

  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          <input
            placeholder="firstName"
            type={"text"}
            {...register("lead.firstName")}
          />
        </div>
        <div className="col-lg-4">
          <input
            type={"text"}
            placeholder="middlename"
            {...register("lead.middleName")}
          />
        </div>
        <div className="col-lg-4">
          <input
            type={"text"}
            placeholder="lastName"
            {...register("lead.lastName")}
          />
        </div>
        <div className="col-lg-4">
          <select {...register("lead.gender")}>
            <option value="" key={`${0}_gender`}>
              Select Gender
            </option>
            {masterData?.genderData?.length &&
              masterData?.genderData?.map((item: IMasterData) => {
                return (
                  <option value={item?.code} key={`${item?.code}_gender`}>
                    {" "}
                    {item?.name}{" "}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="col-lg-4">
          <input type={"email"} placeholder="email" {...register("email")} />
        </div>
        <div className="col-lg-4">
          <input
            type={"text"}
            placeholder="text"
            {...register("lead.mobileNumber")}
          />
        </div>
        <div className="col-lg-4">
          <input
            type={"text"}
            placeholder="identificationNumber"
            {...register("lead.identificationNumber")}
          />
        </div>
        <div className="col-lg-4">
          <input
            type={"date"}
            placeholder="dateofBirth"
            {...register("lead.dateofBirth")}
          />
        </div>
        <div className="col-lg-4">
          <select {...register("lead.nationality")}>
            <option value="" key={`${0}_nationality`}>
              Select Nationality
            </option>
            {masterData?.nationalityData?.length &&
              masterData?.nationalityData?.map((item: IMasterData) => {
                return (
                  <option value={item?.code} key={`${item?.code}_nationality`}>
                    {" "}
                    {item?.name}{" "}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-lg-4">
          <select {...register("lead.language")}>
            <option value="" key={`${0}_language`}>
              Select Home Language
            </option>
            {masterData?.languageData?.length &&
              masterData?.languageData?.map((item: IMasterData) => {
                return (
                  <option value={item?.code} key={`${item?.code}_language`}>
                    {" "}
                    {item?.name}{" "}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-lg-4">
          <select {...register("lead.race")}>
            <option value="" key={`${0}_race`}>
              Select Race
            </option>
            {masterData?.raceData?.length &&
              masterData?.raceData?.map((item: IMasterData) => {
                return (
                  <option value={item?.code} key={`${item?.code}_race`}>
                    {" "}
                    {item?.name}{" "}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </>
  );
};

const Address = (props: any) => {
  const { register } = useFormContext();
  <div className="row">
    {props?.masterData?.addressTypeData?.length &&
      props?.masterData?.addressTypeData?.map((item, index) => {
        return (
          <>
            <div className="col-lg-4">
              <input type="text" {...register(`address[${index}].street`)} />
            </div>
            <input type="text" {...register(`address[${index}].country`)} />;
            <input type="text" {...register(`address[${index}].zipcode`)} />;
            <input type="text" {...register(`address[${index}].city`)} />;
            <input type="text" {...register(`address[${index}].state`)} />;
          </>
        );
      })}
  </div>;
  return <></>;
};
