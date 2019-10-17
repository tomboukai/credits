const neo4jClient = require('neo4j-driver').v1
const mysqlClient = require('mysql');
const sqlFormatter = require('sql-formatter');

const mysql = mysqlClient.createConnection({
    host: "localhost",
    user: "root",
    password: "gvt123",
});
const neo4jDriver = neo4jClient.driver(
    'bolt://localhost',
    neo4jClient.auth.basic('neo4j', 'neo4j123')
)
const neo4j = neo4jDriver.session()
const p = p => `'${p}'`;
const uuidv1 = require('uuid/v1');
const COUNT = {
    country: 1,
    city: 3,
    mall: 6,
    user: 7,
    credit: 10,
}
const types = ['Clothing', 'Gem', 'Sports', 'Food', 'Clinic']

neo4j.run("MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r")

const mall = 'CREATE (n:Mall{title:{title},x:{x}, y:{y}, ref:{ref}})'
const credit = 'CREATE (n:Credit{title:{title}, value:{value}, sellingPrice:{sellingPrice}, validity:{validity}, type:{type}, ref:{ref}})'
const city = 'CREATE (n:City{title:{title}, x:{x}, y:{y}, ref:{ref}})'
const country = 'CREATE (n:Country{title:{title}, x:{x}, y:{y}, ref:{ref}})'
const user = 'CREATE (n:User{title:{title}, age:{age}, ph:{ph}, email:{email}, creditcard:{creditcard}, ref:{ref}})'

const userRefs = [];
for (let index = 0; index < COUNT.user; index++) {
    const ref = uuidv1();
    userRefs.push(ref);
    const age = Math.floor((Math.random() * 30) + 10);
    neo4j.run(user, {
        title: ref,
        age,
        ph: '',
        email: '',
        creditcard: '',
        ref
    })
    mysql.query(sqlFormatter.format("INSERT INTO credits.user VALUES (?,?,?,?,?,?)", {
        params: [p(ref), p(ref), age, p(''), p(''), p('')]
    }), err => err && console.log(err));
}
console.log('NEO: Added users: ', COUNT.user);
console.log('SQL: Added users: ', COUNT.user);
const friendRefs = [];
userRefs.map(ref => {
    const times = Math.floor((Math.random() * 2) + 1)
    for (var i = 0; i < times; i++) {
        const linkRef = userRefs[Math.floor((Math.random() * userRefs.length))];
        if (linkRef !== ref) {
            const friendRef = linkRef < ref ? linkRef + ref : ref + linkRef;
            if (!friendRefs.includes(friendRef)) {
                friendRefs.push(friendRef);
                neo4j.run("MATCH (a:User),(b:User) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:FRIEND_OF]->(b)", {
                    a: linkRef, b: ref
                })
                mysql.query(sqlFormatter.format("INSERT INTO credits.friend (userId1, userId2) VALUES (?,?)", {
                    params: [p(linkRef), p(ref)]
                }), err => err && console.log(err));
            }
        }
    }
});
console.log('NEO: Assigned friends: ', COUNT.credit);
console.log('SQL: Assigned friends: ', COUNT.credit);

const creditRefs = [];
for (let index = 0; index < COUNT.credit; index++) {
    const ref = uuidv1();
    creditRefs.push(ref);
    const value = Math.floor((Math.random() * 100)) * 10;
    neo4j.run(credit, {
        title: ref,
        value,
        sellingPrice: value - Math.floor((Math.random() * 10)) * 10,
        validity: '',
        type: types[Math.floor((Math.random() * types.length))],
        ref
    })
}
console.log('NEO: Added credits: ', COUNT.credit);

neo4j.run(country, {
    title: 'Isreal',
    x: 0,
    y: 0,
    ref: 'Isreal'
})

const cityRefs = [];
for (let index = 0; index < COUNT.city; index++) {
    const ref = uuidv1();
    cityRefs.push(ref);
    neo4j.run(city, {
        title: ref,
        x: 0,
        y: 0,
        ref
    })
    neo4j.run("MATCH (a:Country),(b:City) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:CITY_OF]->(b)", {
        a: 'Isreal', b: ref
    })
}
console.log('NEO: Added cities: ', COUNT.city);

const mallRefs = [];
for (let index = 0; index < COUNT.mall; index++) {
    const ref = uuidv1();
    mallRefs.push(ref);
    neo4j.run(mall, {
        title: ref,
        x: 0,
        y: 0,
        ref
    })
    const cityRef = cityRefs[Math.floor((Math.random() * cityRefs.length))];
    neo4j.run("MATCH (a:City),(b:Mall) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:MALL_OF]->(b)", {
        a: cityRef, b: ref
    })
}
console.log('NEO: Added malls: ', COUNT.mall);

creditRefs.map(ref => {
    const userRef = userRefs[Math.floor((Math.random() * userRefs.length))];
    neo4j.run("MATCH (a:User),(b:Credit) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:SELLS_CREDIT]->(b)", {
        a: userRef, b: ref
    })
    const mallRef = mallRefs[Math.floor((Math.random() * mallRefs.length))];
    neo4j.run("MATCH (a:Mall),(b:Credit) WHERE a.ref = {a} AND b.ref = {b} CREATE (a)-[r:HAS_CREDIT_TO]->(b)", {
        a: mallRef, b: ref
    })
})
console.log('NEO: Assigned credits: ', COUNT.credit);
