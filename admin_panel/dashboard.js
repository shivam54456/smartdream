const db = firebase.firestore();

const totalUsersSpan = document.getElementById('totalUsers');
const userList = document.getElementById('userList');
const withdrawalList = document.getElementById('withdrawalList');

// Get total users
db.collection('users').get().then((querySnapshot) => {
    totalUsersSpan.textContent = querySnapshot.size;
});

// Get all users
db.collection('users').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const user = doc.data();
        const li = document.createElement('li');
        li.textContent = `${user.name} - ${user.email}`;
        userList.appendChild(li);
    });
});

// Get withdrawal requests
db.collection('withdrawals').where('status', '==', 'pending').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const request = doc.data();
        const li = document.createElement('li');
        li.innerHTML = `
            ${request.userName} - ${request.upiId} - ₹${request.amount}
            <button onclick="approveWithdrawal('${doc.id}')">Approve</button>
        `;
        withdrawalList.appendChild(li);
    });
});

function approveWithdrawal(docId) {
    db.collection('withdrawals').doc(docId).update({ status: 'approved' });
}
