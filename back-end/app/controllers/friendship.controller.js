const db = require("../models");
const { Op } = require("sequelize");
const Friendship = db.Friendships;

async function doesRowExist(id1, id2) {
  try {
    const existingFriendship = await Friendship.findOne({
      where: {
        user_id: id1,
        target_id: id2
      }
    });

    return existingFriendship !== null;
  } catch (error) {
    console.error('Error checking for existing row:', error);
    throw error;
  }
}

async function updateFriendshipStatus(user_id, target_id, newStatus) {
  try {
    const existingFriendship = await Friendship.findOne({
      where: {
        user_id,
        target_id
      }
    });

    if (!existingFriendship) {
      console.log('Friendship not found. Cannot update status.');
      return;
    }

    if (existingFriendship.status !== newStatus) {
      const [rowsAffected] = await Friendship.update(
        { status: newStatus },
        { where: { user_id, target_id } }
      );

      if (rowsAffected > 0) {
        console.log('Friendship status updated successfully.');
      } else {
        console.log('Friendship status not updated.');
      }
    } else {
      console.log('Friendship status is already set to', newStatus);
    }
  } catch (error) {
    console.error('Error updating friendship status:', error);
    throw error;
  }
}

exports.createFriendship = async (req, res) => {
    const user_id = req.body.user_id;
    const target_id = req.body.target_id;
  
    if (!user_id || !target_id) {
      return res.status(400).send({
        message: "Both user_id and target_id are required fields."
      });
    }

    if(await doesRowExist(target_id, user_id)){
      await updateFriendshipStatus(target_id, user_id, "known");
    } else {
      try {
        const friendship = await Friendship.create({
          status: "pending",
          user_id: user_id,
          target_id: target_id,
        });
    
        res.send(friendship);
      } catch (error) {
        res.status(500).send({
          message: "Error creating the Friendship.",
          error: error.message
        });
      }
    }
};

exports.findFriendships = async (req, res) => {
  try {
    const requestedId = req.params.user_id;

    const friendships = await Friendship.findAll({
      attributes: ['status', 'user_id', 'target_id'],
      where: {
        [Op.or]: [
          { user_id: requestedId },
          { target_id: requestedId }
        ]
      }
    });

    if (friendships.length === 0) {
      res.status(404).send({
        message: "No friendships found for the provided ID."
      });
    } else {
      res.send({ data: friendships });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving friendships."
    });
  }
};
  
exports.removeFriendship = async (req, res) => {
    const user_id = req.body.user_id;
    const target_id = req.body.target_id;
  
    if (!user_id || !target_id) {
      return res.status(400).send({
        message: "Both user_id and target_id are required fields."
      });
    }
  
    try {
      const deletedRows = await Friendship.destroy({
        where: {
          user_id: user_id,
          target_id: target_id,
        },
      });
  
      if (deletedRows > 0) {
        res.send({
          message: "Friendship removed successfully."
        });
      } else {
        res.send({
          message: "Cannot remove friendship. Maybe friendship was not found!"
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error removing friendship: " + error.message
      });
    }
};