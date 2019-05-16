let id = 0;

export const flagsTable = {
    flags: [],
    create: function(obj) {
        id++;
        obj.id = id;
        this.flags.push(obj);

        return obj;
    },
    getFlagById: function(id) {
        let flag = {};
        this.flags.forEach(value => {
            if (value.id === id)
                flag = value;
        });

        return flag;
    },
    getFlags: function() {
        return this.flags;
    }
}