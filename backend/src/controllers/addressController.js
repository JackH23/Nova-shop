const UserAddress = require("../models/UserAddress");

// Get all addresses for logged-in user
const getAddresses = async (req, res) => {
  try {
    const userId = req.user.id;

    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 4, 1);

    const offset = (page - 1) * limit;

    const { count, rows } = await UserAddress.findAndCountAll({
      where: {
        user_id: userId,
      },

      order: [
        ["is_default", "DESC"],
        ["created_at", "DESC"],
      ],

      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      message: "Addresses fetched successfully",
      addresses: rows,
      total: count,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("Get addresses error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get default address for logged-in user
const getDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const address = await UserAddress.findOne({
      where: {
        user_id: userId,
        is_default: true,
      },
    });

    return res.status(200).json({
      message: "Default address fetched successfully",
      address,
    });
  } catch (error) {
    console.error("Get default address error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Create new address
const createAddress = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      address_line2,
      city,
      state_province,
      postal_code,
      country,
      is_default,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !country
    ) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    const addressCount = await UserAddress.count({
      where: {
        user_id: userId,
      },
    });

    // First address automatically becomes default
    const shouldBeDefault = addressCount === 0 || is_default === true;

    // Remove old default if new address will be default
    if (shouldBeDefault && addressCount > 0) {
      await UserAddress.update(
        {
          is_default: false,
        },
        {
          where: {
            user_id: userId,
          },
        },
      );
    }

    const newAddress = await UserAddress.create({
      user_id: userId,
      first_name,
      last_name,
      email,
      phone,
      address,
      address_line2: address_line2 || null,
      city,
      state_province: state_province || null,
      postal_code: postal_code || null,
      country,
      is_default: shouldBeDefault,
    });

    return res.status(201).json({
      message: "Address created successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Create address error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update address
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    const userAddress = await UserAddress.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!userAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const {
      first_name,
      last_name,
      email,
      phone,
      address,
      address_line2,
      city,
      state_province,
      postal_code,
      country,
    } = req.body;

    await userAddress.update({
      first_name: first_name ?? userAddress.first_name,
      last_name: last_name ?? userAddress.last_name,
      email: email ?? userAddress.email,
      phone: phone ?? userAddress.phone,
      address: address ?? userAddress.address,
      address_line2:
        address_line2 !== undefined ? address_line2 : userAddress.address_line2,
      city: city ?? userAddress.city,
      state_province:
        state_province !== undefined
          ? state_province
          : userAddress.state_province,
      postal_code:
        postal_code !== undefined ? postal_code : userAddress.postal_code,
      country: country ?? userAddress.country,
    });

    return res.status(200).json({
      message: "Address updated successfully",
      address: userAddress,
    });
  } catch (error) {
    console.error("Update address error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Remove address
const removeAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    const userAddress = await UserAddress.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!userAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    const wasDefault = userAddress.is_default;

    await userAddress.destroy();

    // If default address was removed,
    // automatically make another address default
    if (wasDefault) {
      const nextAddress = await UserAddress.findOne({
        where: {
          user_id: userId,
        },
        order: [["created_at", "DESC"]],
      });

      if (nextAddress) {
        await nextAddress.update({
          is_default: true,
        });
      }
    }

    return res.status(200).json({
      message: "Address removed successfully",
    });
  } catch (error) {
    console.error("Remove address error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Set address as default
// Set address as default
const setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { addressId } = req.params;

    // Check address exists and belongs to logged-in user
    const userAddress = await UserAddress.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    if (!userAddress) {
      return res.status(404).json({
        message: "Address not found",
      });
    }

    // Set all user's addresses to not default
    await UserAddress.update(
      {
        is_default: 0,
      },
      {
        where: {
          user_id: userId,
        },
      },
    );

    // Set selected address as default
    const [updatedRows] = await UserAddress.update(
      {
        is_default: 1,
      },
      {
        where: {
          id: addressId,
          user_id: userId,
        },
      },
    );

    console.log("Default address updated rows:", updatedRows);

    // Fetch fresh address from database
    const updatedAddress = await UserAddress.findOne({
      where: {
        id: addressId,
        user_id: userId,
      },
    });

    console.log("Default address after update:", updatedAddress?.toJSON());

    return res.status(200).json({
      message: "Default address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    console.error("Set default address error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAddresses,
  getDefaultAddress,
  createAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
};
