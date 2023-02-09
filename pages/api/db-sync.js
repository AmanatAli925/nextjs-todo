import models from "../../db/models";

export default async (req, res) => {
  const modelNames = Object.keys(models);
  console.log(modelNames)
  for (let i = 0; i < modelNames.length; i++) {
    const modelName = modelNames[i];
    const model = await models[modelName];
    await model.sync();
  }
  res.status(200).json({});
};
