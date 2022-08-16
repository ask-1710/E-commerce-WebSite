
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as admin from 'firebase-admin' ;

admin.initializeApp() ;
// type Text = {original: string,} ;
// type Query = {text: Text,} ;
// type Request = {query: Query,} ;


exports.addMessage = functions.https.onRequest(async (req,res) => {
  const original = req.query.text ;
  const writeResult = await admin.firestore().collection('messages').add({original: original}) ;
  res.json({result: `Message with ID ${writeResult} was written to DB`})
})

exports.makeUpperCase = functions.firestore.document(`/messages/{documentId}`)
                            .onCreate((snap, context) => {
                                const original:string = snap.data().original ;

                                functions.logger.log('Uppercasting', context.params.documentId, original) ;

                                const uppercase:string = original.toUpperCase() ;

                                return snap.ref.set({uppercase}, {merge: true}) ;
                            })