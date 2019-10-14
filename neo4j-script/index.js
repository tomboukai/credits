var neo4j = require('neo4j-driver').v1
var driver = neo4j.driver(
    'bolt://localhost',
    neo4j.auth.basic('neo4j', 'neo4j123')
)
var session = driver.session()
const uuidv1 = require('uuid/v1');
const COUNT = {
    country: 1,
    city: 3,
    mall: 6,
    user: 7,
    credit: 10,
}
session.run("MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r")

const mall = 'CREATE (n:Mall{title:{title},x:{x}, y:{y}, ref:{ref}})'
const credit = 'CREATE (n:Credit{title:{title}, value:{value}, sellingPrice:{sellingPrice}, validity:{validity}, type:{type}, ref:{ref}})'
const city = 'CREATE (n:City{title:{title}, x:{x}, y:{y}, ref:{ref}})'
const country = 'CREATE (n:Country{title:{title}, x:{x}, y:{y}, ref:{ref}})'
const user = 'CREATE (n:User{title:{title}, age:{age}, ph:{ph}, email:{email}, creditcard:{creditcard}, ref:{ref}})'

const userRefs = [];
for (let index = 0; index < COUNT.user; index++) {
    const ref = uuidv1();
    userRefs.push(ref);
    session.run(user, {
        title: ref,
        age: Math.floor((Math.random() * 30) + 10),
        ph: '',
        email: '',
        creditcard: '',
        ref
    })
}
console.log('Added users: ', COUNT.user);
const friendRefs = [];
userRefs.map(ref => {
    const times = Math.floor((Math.random() * 2) + 1)
    for (var i = 0; i < times; i++) {
        const linkRef = userRefs[Math.floor((Math.random() * userRefs.length))];
        if (linkRef !== ref) {
            const friendRef = linkRef < ref ? linkRef + ref : ref + linkRef;
            if (!friendRefs.includes(friendRef)) {
                friendRefs.push(friendRef);
                session.run("MATCH (a:User),(b:User) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:FRIEND_OF]->(b)", {
                    a: linkRef, b: ref
                })
            }
        }
    }
});
console.log('Assigned friends: ', COUNT.credit);

const creditRefs = [];
for (let index = 0; index < COUNT.credit; index++) {
    const ref = uuidv1();
    creditRefs.push(ref);
    session.run(credit, {
        title: ref,
        value: 0,
        sellingPrice: 0,
        validity: '',
        type: '',
        ref
    })
}
console.log('Added credits: ', COUNT.credit);

session.run(country, {
    title: 'Isreal',
    x: 0,
    y: 0,
    ref: 'Isreal'
})

const cityRefs = [];
for (let index = 0; index < COUNT.city; index++) {
    const ref = uuidv1();
    cityRefs.push(ref);
    session.run(city, {
        title: ref,
        x: 0,
        y: 0,
        ref
    })
    session.run("MATCH (a:Country),(b:City) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:CITY_OF]->(b)", {
        a: 'Isreal', b: ref
    })
}
console.log('Added cities: ', COUNT.city);

const mallRefs = [];
for (let index = 0; index < COUNT.mall; index++) {
    const ref = uuidv1();
    mallRefs.push(ref);
    session.run(mall, {
        title: ref,
        x: 0,
        y: 0,
        ref
    })
    const cityRef = cityRefs[Math.floor((Math.random() * cityRefs.length))];
    session.run("MATCH (a:City),(b:Mall) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:MALL_OF]->(b)", {
        a: cityRef, b: ref
    })
}
console.log('Added malls: ', COUNT.mall);

creditRefs.map(ref => {
    const userRef = userRefs[Math.floor((Math.random() * userRefs.length))];
    session.run("MATCH (a:User),(b:Credit) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:SELLS_CREDIT]->(b)", {
        a: userRef, b: ref
    })
    const mallRef = mallRefs[Math.floor((Math.random() * mallRefs.length))];
    session.run("MATCH (a:Mall),(b:Credit) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:HAS_CREDIT_TO]->(b)", {
        a: mallRef, b: ref
    })
})
console.log('Assigned credits: ', COUNT.credit);
