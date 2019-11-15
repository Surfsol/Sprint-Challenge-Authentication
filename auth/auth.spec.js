const db = require('../database/dbConfig') //will connect me to testing db
//jest set up tear down

const { add, findBy, findById } = require('./auth-models')

describe('auth-model', function(){
    describe('add()', function(){
        //jest setup teardown
        //async await till done and then call test
        //clean out db before run test
        beforeEach(async () => {
            await db('users').truncate()
        })

        it('should add user', async function(){
            //add person
            await add({
                "username":"Fiona",
              "password":"pass"
            })
            //check to see if added
            const person = await db('users')
            //check if was added
            //run queries directly againt db from api
            expect(person).toHaveLength(1)
            })
            
            it('should add a user', async function(){
                //add person
                await add({
                    "username":"newbuyon",
                  "password":"pass"
                })
                await add({
                    "username":"newbusta",
                  "password":"pass"
                })
                //check to see if added
                const person = await db('users')
                
                expect(person[0].username).toBe("newbuyon")
                expect(person[1].username).toBe("newbusta")
                })
                it('login find user and return user id', async function(){
                    //find person
                    await add({
                        "username":"newpeeps",
                      "password":"pass"
                    })
                    await findBy({
                        "username":"newpeeps",
                      "password":"pass"
                    })
                   
                    //check to see if found
                    const person = await db('users')
                
                    expect(person[0].id).toBe(1)
                    })
                    it('login find user and return username', async function(){
                      //find person
                      await add({
                          "username":"newpeeps",
                        "password":"pass"
                      })
                      await findBy({
                          "username":"newpeeps",
                        "password":"pass"
                      })
                     
                      //check to see if found
                      const person = await db('users')
                  
                      expect(person[0].username).toBe("newpeeps")
                      })
        })
    })
