<template>

    <div class="content">
        <h1 class="title">Tous les Utilisateurs de Groupomania.fr</h1>
        <div class="table-wrapper">
            <table class="fl-table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>name</th>
                        <th>lastname</th>
                        <th>picture</th>
                        <th>bio</th>
                        <th>password</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in user" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.lastname }}</td>
                        <td><img v-if="item.picture" :src="item.picture" alt="ilustration picture" class="picture" width="50px" /></td>
                        <td>{{ item.bio }}</td>
                        <td><form><input type="password" class="password" :id="'password' + item.id" /><button @click="password(item.id)">changer</button></form></td>
                        <td><button @click="deleteUser(item.id)">supprimer</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: [],
        };
    },

    methods: {
        async getUsers() {
            const token = localStorage.getItem("token")
            try {
                const response = await axios.get(
                    `http://localhost:3066/api/admin//Users`,
                    {
                        headers: {
                            'authorization': token
                        }   
                    }
                );
                this.user = response.data;
                console.log(this.user)
            } catch (error) {
                console.log(error);
            }
        }, 

        deleteUser(id) {
            addEventListener('click', (e) => {
                e.preventDefault();
                const token = localStorage.getItem('token');
                try {
                    axios
                        .delete(`http://localhost:3066/api/auth/profil/${id}`, {
                            headers: {
                                authorization: token
                            }
                        })
                        .then(function(response) {
                            console.log(response.status);
                            window.location.href = "/Admin/User"
                        })
                        .catch(function(error) {
                            console.log(error)
                        })
                } catch (error) {
                    console.log(error)
                }
            })
        }, 
        
        async password(id) {
            addEventListener('click', (e) => {
                e.preventDefault();
                const newPassword = document.getElementById(`password${id}`).value; 
                console.log(newPassword)
                const token = localStorage.getItem("token")
                try {
                    axios.put(
                        `http://localhost:3066/api/admin/password/${id}`,
                        {
                            password: newPassword
                        },
                        {
                            headers: {
                                'authorization': token
                            }   
                        }
                    )
                    .then(function(response) {
                        console.log(response.status);
                        window.location.href = '/Admin/User';
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
                } catch (error) {
                    console.log(error);
                }
            })
        }
    },

    async created() {
        await this.getUsers();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.content {
    width: 100%;
}

.title {
    color: red;
    font-style: italic;
}

.table-wrapper{
    margin: 10px 70px 70px;
    box-shadow: 0px 35px 50px #ffd6d8;
}

.fl-table {
    border-radius: 5px;
    font-size: 1,5rem;
    font-weight: normal;
    border: none;
    border-collapse: collapse;
    width: 100%;
    max-width: 100%;
    white-space: nowrap;
    background-color: white;
}

.fl-table td, .fl-table th {
    text-align: center;
    padding: 8px;
    white-space: pre-wrap;
}

.fl-table td {
    border-right: 1px solid #f8f8f8;
    font-size: 1rem;
}

.fl-table thead th {
    color: #FFF;
    background: #F53008;
}


.fl-table thead th:nth-child(odd) {
    color: #FFF;
    background: #F53008;
}

.fl-table tr:nth-child(even) {
    background: #ffd6d8;
}
/* Responsive */

@media (max-width: 767px) {
    .fl-table {
        display: block;
        width: 100%;
    }
    .table-wrapper:before{
        content: "Scroll horizontally >";
        display: block;
        text-align: right;
        font-size: 11px;
        color: white;
        padding: 0 0 10px;
    }
    .fl-table thead, .fl-table tbody, .fl-table thead th {
        display: block;
    }
    .fl-table thead th:last-child{
        border-bottom: none;
    }
    .fl-table thead {
        float: left;
    }
    .fl-table tbody {
        width: auto;
        position: relative;
        overflow-x: auto;
    }
    .fl-table td, .fl-table th {
        padding: 20px .625em .625em .625em;
        height: 100px;
        vertical-align: middle;
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: auto;
        width: 120px;
        font-size: 13px;
        text-overflow: ellipsis;
    }
    .fl-table thead th {
        text-align: left;
        border-bottom: 1px solid #f7f7f9;
    }
    .fl-table tbody tr {
        display: table-cell;
    }
    .fl-table tbody tr:nth-child(odd) {
        background: none;
    }
    .fl-table tr:nth-child(even) {
        background: transparent;
    }
    .fl-table tr td:nth-child(odd) {
        background: #F8F8F8;
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tr td:nth-child(even) {
        border-right: 1px solid #E6E4E4;
    }
    .fl-table tbody td {
        display: block;
        text-align: center;
    }
}
</style>