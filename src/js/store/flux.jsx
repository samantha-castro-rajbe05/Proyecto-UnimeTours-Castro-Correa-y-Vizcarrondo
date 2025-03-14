const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // Aquí puedes definir el estado inicial de tu tienda
        },
        actions: {
            changeTheme: theme => {
                setStore({ theme });
            },
            // Asegúrate de cerrar correctamente el objeto actions
        }
    };
};

export default getState;