import Product from '../models/product.schema';
import formidable from 'formidable';
import fs from 'fs';
import { deleteFile, s3FileUpload } from '../services/imageUpload';
import Mongoose from 'mongoose';
import asyncHandler from '../services/asyncHandler';
import CustomError from '../utils/customError';
import Config from '../config/index';

/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @descriptio Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/

export const addProduct = asyncHandler(async (req, res) => {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async function (err, fields, files) {
    try {
      if (err) {
        throw new CustomError(err.message || 'Something went wrong', 500);
      }
      let productId = new Mongoose.Types.ObjectId().toHexString();
      //   console.log(fields, files);

      //check for field
      if (
        !fields.name ||
        !fields.price ||
        !fields.description ||
        fields.collectionId
      ) {
        throw new CustomError('Fill all the details', 500);
      }

      // hnadling images
      let imgArrayResp = Promise.all(
        Object.keys(files).map(async (filekey, index) => {
          const element = files[filekey];

          const data = fs.readFileSync(element.filepath);

          const upload = await s3FileUpload({
            bucketName: Config.S3_BUCKET_NAME,
            key: `product/${productId}/photo_${index + 1}.png`,
            body: data,
            contentType: element.mimetype,
          });
          return { secure_url: upload.Location };
        })
      );

      let imgArray = await imgArrayResp;

      const product = await product.create({
        _id: productId,
        photos: imgArray,
        ...fields,
      });

      if (!product) {
        throw new CustomError('Product was not created', 400);
      }

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'something went wrong',
      });
    }
  });
});

/**********************************************************
 * @GET_ALL_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for getting all products details
 * @description User and admin can get all the prducts
 * @returns Products Object
 *********************************************************/

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    throw new CustomError('No product was found', 404);
  }
  res.status(200).json({
    success: true,
    products,
  });
});

/**********************************************************
 * @GET_PRODUCT_BY_ID
 * @route https://localhost:5000/api/product
 * @description Controller used for getting single product details
 * @description User and admin can get single product details
 * @returns Product Object
 *********************************************************/

export const getProductById = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new CustomError('No product was found', 404);
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// assignment to read

/*
model.aggregate([{}, {}, {}])
$group
$push
$$ROOT
$lookup
$project
*/
