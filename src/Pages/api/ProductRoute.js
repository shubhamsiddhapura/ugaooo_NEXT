const express = require("express");
const router = express.Router();

const { authenticateUser, authorizeRoles } = require("../../Middleware/AuthMiddleware");

const { createSection, getAllSections,deleteSection,getAllSectionsWithSubsections,getAllProductsBySection } = require("../../Controller/Section");
const { createSubsection,deleteSubSection,getSubSectionsWithCat} = require("../../Controller/SubSection");
const { createCategory, getAllCategories,deleteCategory,getCatWithproduct } = require("../../Controller/Category");
const { createProduct, getAllProducts ,deleteProduct} = require("../../Controller/Product");


router.get("/getAllSections", getAllSections);
router.get("/getAllCategories", getAllCategories);
router.get("/getAllProducts", getAllProducts);
router.post("/getAllPlantProdutct",getAllProductsBySection)

router.get("/getSectionWithSubSections", getAllSectionsWithSubsections);
router.get("/getSubSectionsWithCat", getSubSectionsWithCat);
router.get("/getCatWithproduct", getCatWithproduct);

router.post("/section",authenticateUser,authorizeRoles("admin"), createSection);
router.post("/category",authenticateUser, authorizeRoles("admin"),createCategory);
router.post("/product",authenticateUser,authorizeRoles("admin"), createProduct);
router.post("/subSection",authenticateUser, authorizeRoles("admin"),createSubsection);

router.delete("/deleteSubSection",authenticateUser,authorizeRoles("admin"),deleteSubSection);
router.delete("/deleteCategory",authenticateUser,authorizeRoles("admin"),deleteCategory);
router.delete("/deleteSection",authenticateUser,authorizeRoles("admin"),deleteSection);
router.delete("/deleteProduct",authenticateUser,authorizeRoles("admin"),deleteProduct);


module.exports = router;
