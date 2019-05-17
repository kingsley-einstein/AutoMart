let id = 0;

export const flagsTable = {
    flags: [],
    create(obj) {
        id++;
        obj.id = id;
        this.flags.push(obj);

        return obj;
    },
    getFlagById(id) {
        let flag = {};
        this.flags.forEach(value => {
            if (value.id === id)
                flag = value;
        });

        return flag;
    },
    getFlags() {
        return this.flags;
    }
}