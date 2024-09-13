const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');
const connectingStringIrl = 'mongodb://localhost:27017';
const app = express();
const client = new MongoClient(connectingStringIrl,{family:4});
const dbName = 'HostelManagement';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const generateRoomId = async () => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('RoomManagement');

  const lastRoom = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
  let newId = 1;
  if (lastRoom.length > 0) {
      const lastId = parseInt(lastRoom[0].roomId.split('R')[1], 10);
      newId = lastId + 1;
  }
  return `R${newId.toString().padStart(3, '0')}`;
};

app.post('/roommanagement',async(req,res)=>{
    try {

      await client.connect();
      const db = client.db(dbName)
      const collection = db.collection('RoomManagement')
      const roomId = await generateRoomId();
        const roomData = {
          roomId,
          roomNumber : req.body.roomNumber,
          sharing : req.body.sharing,
          vacancy : req.body.vacancy,
          isActive : (req.body.isActive == true) ? true : false
        }
        await collection.insertOne(roomData)
        res.send('room is added')
    } catch (error) {
        res.send(error)
    }
})


app.put('/updateroom/:id', async (req, res) => {
  const roomId = req.params.id;
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('RoomManagement');
    const updateRoomData = {
      roomNumber: req.body.roomNumber,
      sharing: req.body.sharing,
      isActive: req.body.isActive === true ? true : false
    };

    const result = await collection.updateOne({ roomId }, { $set: updateRoomData });

    if (result.modifiedCount === 1) {
      res.send('Room is updated');
    } else {
      res.status(404).send('Room not found');
    }

  } catch (error) {
    res.status(500).send('Error updating room: ' + error);
  }
});


app.delete('/deleteroom/:id', async (req, res) => {
  const roomId = req.params.id;
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('RoomManagement');
    const result = await collection.deleteOne({ roomId });
    if (result.deletedCount === 1) {
      res.send('Room is deleted');
    } else {
      res.status(404).send('Room not found');
    }
  } catch (error) {
    res.status(500).send('Error deleting room: ' + error);
  }
});

app.get('/getrooms',async(req,res)=>{
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('RoomManagement');
    const result = await collection.find({}).toArray();
    if(result.length == 0){
      res.send('no content found')
    }
    else{
      res.send(result)
    }
  } catch (error) {
    res.send('internal server error' + error);
  }
})

app.post('/addnewhosteler',async(req,res)=>{
    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Hostelers');
        const hosteler = {
            name : req.body.name,
            fathername : req.body.fathername,
            mobileno : req.body.mobileno,
            altmobileno : req.body.altmobileno,
            email : req.body.email,
            workingname : req.body.workingname,
            houseno : req.body.houseno,
            street : req.body.street,
            city : req.body.city,
            state : req.body.state,
            pincode : req.body.pincode,
            roomno : req.body.roomno
        }
        await collection.insertOne(hosteler);
        res.send('hosteler is added')
    } catch (error) {
        res.send('error at adding new hosteler' + error)
    }
})

app.post('/edithosteler', async (req, res) => {
    const { mobileNumber } = req.body;
    try {
      console.log('Received mobile number:', mobileNumber);
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('Hostelers');
      const user = await collection.findOne({ mobileno: mobileNumber });
      if (user) {
        console.log('Hosteler found:', user);
        res.json(user);
      } else {
        console.log('Hosteler not found with mobile number:', mobileNumber);
        res.status(404).json({ message: 'Hosteler not found' });
      }
    } catch (error) {
      console.error('Error in /edithosteler:', error);
      res.status(500).send('Error at edit hosteler: ' + error);
    }
  });

  app.get('/gethostelers',async(req,res)=>{
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('Hostelers');
      const result = await collection.find({}).toArray();
      if(result.length == 0){
        res.send('no records found');
      }
      else{
        res.send(result)
      }
    } catch (error) {
        res.send('internal server error' + error);
    }
  })

  app.post('/addstaff',async(req,res)=>{
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('Staff');
      const staff = {
        name : req.body.name,
        fathername : req.body.fathername,
        mobileno : req.body.mobileno,
        email : req.body.email,
        address : req.body.address,
        designation : req.body.designation
      }
      result = collection.insertOne(staff);
      res.send('staff is added');
    } catch (error) {
      res.send('error at adding staff')
    }
  })

  app.get('/getstaff',async(req,res)=>{
    try {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection('Staff');
      const result = await collection.find({}).toArray();
      if(result.length == 0){
        res.send('no data found');
      }else{
        res.send(result);
      }
    } catch (error) {
      res.send('error occured at get staff' + error);
    }
  })

app.listen(4000);
console.log('Server is running at port 4000');

// const express = require('express');
// const { MongoClient } = require('mongodb');
// const cors = require('cors');
// const connectingStringIrl = 'mongodb://localhost:27017';
// const app = express();
// const client = new MongoClient(connectingStringIrl, { family: 4 });
// const dbName = 'HostelManagement';

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// let db;
// let collection;

// client.connect().then(() => {
//   db = client.db(dbName);
//   collection = db.collection('RoomManagement');
//   console.log('Connected to MongoDB');
// }).catch(err => console.error('Error connecting to MongoDB', err));

// const generateRoomId = async () => {
//   const lastRoom = await collection.find({}).sort({ _id: -1 }).limit(1).toArray();
//   let newId = 1;
//   if (lastRoom.length > 0) {
//     const lastId = parseInt(lastRoom[0].roomId.split('R')[1], 10);
//     newId = lastId + 1;
//   }
//   return `R${newId.toString().padStart(3, '0')}`;
// };

// app.post('/roommanagement', async (req, res) => {
//   try {
//     const roomId = await generateRoomId();
//     const roomData = {
//       roomId,
//       roomNumber: req.body.roomNumber,
//       sharing: req.body.sharing,
//       isActive: req.body.isActive === true,
//     };
//     await collection.insertOne(roomData);
//     res.status(201).send('Room is added');
//   } catch (error) {
//     console.error('Error adding room:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// app.put('/updateroom/:id', async (req, res) => {
//   const roomId = req.params.id;
//   try {
//     const updateRoomData = {
//       roomNumber: req.body.roomNumber,
//       sharing: req.body.sharing,
//       isActive: req.body.isActive === true,
//     };

//     const result = await collection.updateOne({ roomId }, { $set: updateRoomData });

//     if (result.modifiedCount === 1) {
//       res.send('Room is updated');
//     } else {
//       res.status(404).send('Room not found');
//     }
//   } catch (error) {
//     console.error('Error updating room:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// app.delete('/deleteroom/:id', async (req, res) => {
//   const roomId = req.params.id;
//   try {
//     const result = await collection.deleteOne({ roomId });
//     if (result.deletedCount === 1) {
//       res.send('Room is deleted');
//     } else {
//       res.status(404).send('Room not found');
//     }
//   } catch (error) {
//     console.error('Error deleting room:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// app.get('/getrooms', async (req, res) => {
//   try {
//     const result = await collection.find({}).toArray();
//     if (result.length === 0) {
//       res.status(204).send('No content found');
//     } else {
//       res.json(result);
//     }
//   } catch (error) {
//     console.error('Error fetching rooms:', error);
//     res.status(500).send('Internal server error');
//   }
// });

// app.listen(4000, () => {
//   console.log('Server is running at port 4000');
// });

